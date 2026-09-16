import { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import { database } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import { Calendar, IdCard, LogOut, Pencil } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ navigation }) => {
    const [ edit, setEdit ] = useState(false);
    const { cargando, BuscarUsuario, UsuarioEncontrado, Usuario, setUsuario, actualizarUsuario } = useAuth();

    useEffect(() => {
        BuscarUsuario();
    }, [])

    // Guarda los cambios y cierra el formulario
    const guardarEdicion = async () => {
        await actualizarUsuario();
        setEdit(false);
    };

    return(
        <ScrollView className="bg-platinum px-5 py-10" contentContainerClassName="flex-1 items-center">
            <View className="bg-stormyTeal/60 w-full h-20 rounded-xl p-2 gap-5 flex flex-row mb-5">
                <Image source={{ uri: UsuarioEncontrado.urlImagen }} resizeMode="contain" className="h-15 w-16 rounded-full p-2 bg-platinum" />
                <View className="flex flex-col items-start justify-center gap-1">
                    <Text className="text-lg text-platinum">{UsuarioEncontrado.nombre}</Text>
                    <Text className="text-sm text-stormyTeal">{UsuarioEncontrado.email}</Text>
                </View>
                <View className="flex items-center justify-center w-fit">
                    <TouchableOpacity onPress={() => setEdit(!edit)} className="bg-platinum rounded-full h-10 w-11 p-2 items-center justify-center">
                        <Pencil color={"#000000"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="bg-stormyTeal/60 w-full h-20 rounded-xl gap-5 flex flex-row mb-5">
                <View className="w-20 right-0 h-20 rounded-r-full bg-platinum flex items-center justify-center">
                    <Calendar color={"#000000"} size={30} />
                </View>
                <View className="flex flex-col items-center justify-center gap-1 py-2">
                    <Text className="text-sm text-stormyTeal">Fecha de nacimiento:</Text>
                    <Text className="text-xl text-platinum">{UsuarioEncontrado.fecha}</Text>
                </View>
            </View>
            <View className="bg-stormyTeal/60 w-full h-20 rounded-xl gap-5 flex flex-row mb-5">
                <View className="w-20 right-0 h-20 rounded-r-full bg-platinum flex items-center justify-center">
                    <IdCard color={"#000000"} size={30} />
                </View>
                <View className="flex flex-col items-center justify-center gap-1 py-2">
                    <Text className="text-sm text-stormyTeal">Carnet Institucional:</Text>
                    <Text className="text-xl text-platinum">{UsuarioEncontrado.carnet}</Text>
                </View>
            </View>
            <TouchableOpacity className="bg-vibrantCoral rounded-xl flex flex-row justify-center items-center p-2 gap-4 mb-5" onPress={() => navigation.navigate("Login")}>
                <LogOut color={"#ffffff"} size={30} />
                <Text className="text-platinum text-xl">Cerrar Sesion</Text>
            </TouchableOpacity>

            {edit && (
                <View className="flex flex-col gap-2 w-full">
                    <View className="flex w-full border-b border-separate border-stormyTeal border-dashed mb-5"></View>
                    <Text className="text-2xl text-stormyTeal italic underline">Modificar Datos</Text>
                    <View className="mt-5 flex flex-col w-full gap-4 bg-shadowGrey/20 rounded-xl p-5">
                        <View className="w-full px-4">
                            <Text className="text-base text-[#333]">Nombre completo:</Text>
                            <TextInput
                                className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                                onChangeText={text => setUsuario({ ...Usuario, nombre: text })}
                                value={Usuario.nombre}
                            />
                        </View>
                        <View className="w-full px-4">
                            <Text className="text-base text-[#333]">Carnet Institucional:</Text>
                            <TextInput
                                className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                                onChangeText={text => setUsuario({ ...Usuario, carnet: text })}
                                value={Usuario.carnet}
                            />
                        </View>
                        <View className="w-full px-4">
                            <Text className="text-base text-[#333]">Fecha de nacimiento:</Text>
                            <TextInput
                                className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                                onChangeText={text => setUsuario({ ...Usuario, fecha: text })}
                                value={Usuario.fecha}
                            />
                        </View>
                        <View className="w-full px-4">
                            <Text className="text-base text-[#333]">URL de imagen:</Text>
                            <TextInput
                                className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                                onChangeText={text => setUsuario({ ...Usuario, urlImagen: text })}
                                value={Usuario.urlImagen}
                            />
                        </View>
                        <TouchableOpacity
                            className="p-2.5 bg-stormyTeal rounded-xl w-full items-center flex flex-row gap-3 justify-center"
                            onPress={guardarEdicion}
                            disabled={cargando}>
                            <Text className="text-platinum font-bold text-center">{cargando ? 'Guardando...' : 'Actualizar Usuario'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

export default Dashboard;