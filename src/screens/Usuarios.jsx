// Importación de bibliotecas y componentes necesarios
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const Usuarios = ({ navigation }) => {
    const { cargando, Usuario, setUsuario, agregarUsuario } = useAuth();
    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.goBack();
    };

    return (
        <ScrollView
            className="bg-platinum flex-1 p-10" contentContainerClassName="flex-1 items-center justify-center"
        >
            <View className="bg-stormyTeal/30 w-full px-10 h-fit flex rounded-xl flex-col items-center justify-center gap-4">
                <View className="w-fit relative bg-platinum justify-center items-center p-5 flex-row gap-4 rounded-b-full">
                    <UserPlus color={"#000000"} size={30} />
                </View>
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
                <View className="w-full px-4">
                    <Text className="text-base text-[#333]">Email:</Text>
                    <TextInput
                        className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setUsuario({ ...Usuario, email: text })}
                        value={Usuario.email}
                    />
                </View>
                <View className="w-full px-4 mb-5">
                    <Text className="text-base text-[#333]">Contraseña:</Text>
                    <TextInput
                        className="h-10 border rounded-xl border-[#ccc] rounded pl-2 bg-white w-full shadow-sm py-2"
                        secureTextEntry
                        onChangeText={text => setUsuario({ ...Usuario, contraseña: text })}
                        value={Usuario.contraseña}
                    />
                </View>

                <TouchableOpacity
                    className="p-2.5 bg-vibrantCoral rounded-xl w-full items-center flex flex-row gap-3 justify-center"
                    onPress={agregarUsuario}
                    disabled={cargando}>
                    <Text className="text-platinum font-bold text-center">{cargando ? 'Creando...' : 'Agregar Usuario'}</Text>
                </TouchableOpacity>

                {/* Regresa a la pantalla de Login sin crear ninguna cuenta */}
                <TouchableOpacity className="p-2.5 bg-platinum rounded-t-xl w-full items-center flex flex-row gap-3 justify-center" onPress={goToHome}>
                    <Text className="text-vibrantCoral text-center">Volver a Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Usuarios;