//Se importa la funcion que crea una referencia al contenedor de navegacion
import { createNavigationContainerRef } from "@react-navigation/native";

//Referencia al contenedor de navegacion. Permite controlar la navegacion desde fuera de los componentes de React (desde cualquier archivo). Debe enlazarse al NavigationContainer, normalmente en el App.jsx
export const navigationRef = createNavigationContainerRef();

//Funcion que realiza la navegacion entre pantallas desde cualquier lugar del proyecto
export const navigate = (name, params) => {
    //Solo navega si el contenedor de navegacion ya esta montado y listo; asi se evitan errores al llamar navigate antes de tiempo
    if(navigationRef.isReady()){
        navigationRef.navigate(name, params);
    }
};