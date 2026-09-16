import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { navigate } from "../Navigation/NavigationRef";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

// Traduce los codigos de error de Firebase (Auth) a mensajes legibles para el usuario
const mensajeError = (codigo) => ({
    'auth/invalid-email': 'El email no es válido',
    'auth/invalid-credential': 'Email o contraseña incorrectos',
    'auth/user-not-found': 'No existe una cuenta con ese email',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/configuration-not-found': 'Falta habilitar Email/Password en Firebase Console (Authentication > Sign-in method)',
    'auth/email-already-in-use': 'El email ya está en uso',
    'auth/weak-password': 'La contraseña necesita almenos 6 caracteres',
    'auth/operation-not-allowed': 'El tipo de autenticación no está habilitado',
}[codigo] || 'Ocurrió un error, intenta de nuevo');

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ idUsuario, setIdUsuario ] = useState("");
    const [ UsuarioEncontrado, setUsuarioEncontrado ] = useState({});

    // Estado local con los valores que el usuario escribe en el formulario
    const [Usuario, setUsuario] = useState({
        nombre: '',
        carnet: '',
        fecha: '',
        urlImagen: '',
        email: '',
        contraseña: '',
    });

    // Deshabilita el boton mientras se espera la respuesta de Firebase, para evitar envios duplicados
    const [cargando, setCargando] = useState(false);

    // Verifica las credenciales contra Firebase Authentication
    const iniciarSesion = async () => {
        if (!Usuario.email || !Usuario.contraseña) {
            Alert.alert('Faltan datos', 'Escribe email y contraseña');
            return;
        }
        try {
            setCargando(true);
            const cred = await signInWithEmailAndPassword(auth, Usuario.email.trim(), Usuario.contraseña);
            setIdUsuario(cred.user.uid);
            navigate('Dashboard');
        } catch (error) {
            console.error('Error al iniciar sesion', error.code);
            Alert.alert('No se pudo entrar', mensajeError(error.code));
        } finally {
            setCargando(false);
        }
    };

    // Crea la cuenta en Firebase Authentication y guarda el perfil (nombre) en Firestore
    const agregarUsuario = async () => {
        if (!Usuario.nombre || !Usuario.email || !Usuario.contraseña) {
            Alert.alert('Faltan datos', 'Completa nombre, email y contraseña');
            return;
        }
        try {
            setCargando(true);
            // Crea las credenciales de acceso. Esto tambien inicia sesion automaticamente
            const cred = await createUserWithEmailAndPassword(auth, Usuario.email.trim(), Usuario.contraseña);

            // Guarda el perfil en Firestore, asociado al uid del usuario recien creado
            await setDoc(doc(database, 'usuarios', cred.user.uid), {
                nombre: Usuario.nombre.trim(),
                carnet: Usuario.carnet.trim(),
                fecha: Usuario.fecha.trim(),
                urlImagen: Usuario.urlImagen.trim(),
                email: Usuario.email.trim(),
                creado: new Date(),
            });

            setIdUsuario(cred.user.uid);
            console.log('Perfil creado para', cred.user.uid);
            navigate('Dashboard');
        } catch (error) {
            console.error('Error al crear el usuario', error.code);
            Alert.alert('No se pudo crear el perfil', mensajeError(error.code));
        } finally {
            setCargando(false);
        }
    };

    // Busca en Firestore el perfil del usuario cuyo id esta guardado en idUsuario
    const BuscarUsuario = async () => {
        if (!idUsuario) {
            Alert.alert('Falta el id', 'Especifica un id de usuario para buscar');
            return;
        }
        try {
            setCargando(true);
            const snap = await getDoc(doc(database, 'usuarios', idUsuario));
            if (!snap.exists()) {
                setUsuarioEncontrado({});
                Alert.alert('No encontrado', 'No existe un usuario con ese id');
                return;
            }
            setUsuarioEncontrado({ id: snap.id, ...snap.data() });
        } catch (error) {
            console.error('Error al buscar el usuario', error.code);
            Alert.alert('No se pudo buscar el usuario', mensajeError(error.code));
        } finally {
            setCargando(false);
        }
    }

    //Actualiza los datos del usuario (nombre, Fecha de nacimiento, Carnet, URL de imagen)
    const actualizarUsuario = async () => {
        if (!idUsuario) {
            Alert.alert('Falta el id', 'No hay un usuario para actualizar');
            return;
        }
        try {
            setCargando(true);
            await setDoc(doc(database, 'usuarios', idUsuario), {
                nombre: Usuario.nombre.trim(),
                carnet: Usuario.carnet.trim(),
                fecha: Usuario.fecha.trim(),
                urlImagen: Usuario.urlImagen.trim(),
            }, { merge: true });
            await BuscarUsuario();
        } catch (error) {
            console.error('Error al actualizar el usuario', error.code);
            Alert.alert('No se pudo actualizar', mensajeError(error.code));
        } finally {
            setCargando(false);
        }
    };

    return(
        <AuthContext.Provider value={{
            idUsuario,
            setIdUsuario,
            UsuarioEncontrado,
            cargando,
            Usuario,
            setUsuario,
            iniciarSesion,
            agregarUsuario,
            BuscarUsuario,
            actualizarUsuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);