import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { User, UserPlus, LogIn } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const { cargando, iniciarSesion, Usuario, setUsuario } = useAuth();
    
    return(
        <ScrollView className="bg-platinum flex-1 p-10" contentContainerClassName="flex-1 items-center justify-center">
            <View className="bg-stormyTeal/30 w-full p-10 h-100 flex rounded-xl flex-col items-center justify-center gap-4">
                <View className="flex flex-col gap-2 items-center justify-center">
                    <User color={"#000000"} size={30} />
                    <Text className="text-2xl font-bold text-center">Login</Text>
                </View>

                <View className="w-full px-4">
                    <Text className="text-base mb-2 text-[#333]">Email:</Text>
                    <TextInput
                        className="h-13 border border-[#ccc] rounded pl-2 bg-white w-full shadow-sm rounded-xl"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setUsuario({ ...Usuario, email: text })}
                        value={Usuario.email}
                    />
                </View>
                <View className="w-full px-4 mb-5">
                    <Text className="text-base mb-2 text-[#333]">Contraseña:</Text>
                    <TextInput
                        className="h-13 border border-[#ccc] rounded pl-2 bg-white w-full shadow-sm rounded-xl"
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