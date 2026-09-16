import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Envoltorio raiz obligatorio para React Navigation / react-native-screens y los gestos
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationRef } from "./src/Navigation/NavigationRef";

//NativeWind: se importa la hoja de estilos base una sola vez, en la raiz real de la app
import "./global.css";

//Se invoca la funcion para obtener el objeto con los componentes Navigator y Screen del stack
const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Dashboard" component={Login} />
                    <Stack.Screen name="Usuarios" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
};