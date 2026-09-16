import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Envoltorio raiz obligatorio para React Navigation / react-native-screens y los gestos
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { navigationRef } from "./src/Navigation/NavigationRef";

//NativeWind: se importa la hoja de estilos base una sola vez, en la raiz real de la app
import "./global.css";
import Login from "./src/screens/Login";
import Usuarios from "./src/screens/Usuarios";
import Dashboard from "./src/screens/Dashboard";
import { AuthProvider } from "./src/context/AuthContext";

//Se invoca la funcion para obtener el objeto con los componentes Navigator y Screen del stack
const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="Usuarios" component={Usuarios} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
        </AuthProvider>
    )
};