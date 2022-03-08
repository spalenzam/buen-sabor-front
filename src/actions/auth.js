//Son funciones las que vamos a colocar en este componente 
import { types } from "../types/types"

export const startLoginEmailPassword = (email, password) => {
    //retorna una función callback
    return ( dispatch ) => {
        setTimeout(() => {
            
            dispatch( login(123, 'María') );

        }, 3500);
    }
}

//Esta función retorna el objeto con un tipo y los datos del payload que necesita recibir el authReducer
/*export const login = ( uid, displayName ) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}*/

//Como la función solo retorna un elemento, podemos enviarlo de esta manera, en ves de la anterior 
export const login = ( uid, displayName ) => ({
    
    type: types.login,
    payload: {
        uid,
        displayName
    }

})