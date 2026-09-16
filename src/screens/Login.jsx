import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User, UserPlus, LogIn } from 'lucide-react-native';

const Login = ({ navigation }) => {

    // Estado local con los valores que el usuario escribe en el formulario
    const [Usuario, setUsuario] = useState({
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
            await signInWithEmailAndPassword(auth, Usuario.email.trim(), Usuario.contraseña);
            navigation.navigate('Principal');
        } catch (error) {
            console.error('Error al iniciar sesion', error.code);
            Alert.alert('No se pudo entrar', error.code);
        } finally {
            setCargando(false);
        }
    };

    return(
        <ScrollView className="bg-platinum flex-1 p-10" contentContainerClassName="flex-1 items-center justify-center">
            <View className="bg-stormyTeal/30 w-full p-10 h-100 flex border border-shadowGrey rounded-xl flex-col items-center justify-center gap-4">
                <View className="flex flex-col gap-2 items-center justify-center">
                    <User color={"#000000"} size={30} />
                    <Text className="text-2xl font-bold text-center">Login</Text>
                </View>

                <View className="w-full px-4">
                    <Text className="text-base mb-2 text-[#333]">Email:</Text>
                    <TextInput
                        className="h-10 border border-[#ccc] rounded pl-2 bg-white w-full shadow-sm rounded-xl"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setUsuario({ ...Usuario, email: text })}
                        value={Usuario.email}
                    />
                </View>
                <View className="w-full px-4 mb-5">
                    <Text className="text-base mb-2 text-[#333]">Contraseña:</Text>
                    <TextInput
                        className="h-10 border border-[#ccc] rounded pl-2 bg-white w-full shadow-sm rounded-xl"
                        secureTextEntry
                        onChangeText={text => setUsuario({ ...Usuario, contraseña: text })}
                        value={Usuario.contraseña}
                    />
                </View>

                <TouchableOpacity
                    className="p-2.5 bg-vibrantCoral rounded-xl w-full items-center flex flex-row gap-3 justify-center"
                    onPress={iniciarSesion}
                    disabled={cargando}>
                        <LogIn color={"#ffffff"} size={20} />
                    <Text className="text-platinum font-bold text-center">{cargando ? 'Entrando...' : 'Iniciar Sesión'}</Text>
                </TouchableOpacity>

                {/* Lleva al formulario de registro (pantalla Usuarios), no crea la cuenta directamente */}
                <TouchableOpacity className="p-2.5 bg-vibrantCoral rounded-xl flex flex-row w-full items-center justify-center gap-3" onPress={() => navigation.navigate("Usuarios")}>
                    <UserPlus color={"#ffffff"} size={20} />
                    <Text className="text-platinum font-bold text-center">Agregar Usuario</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login;