import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2';

//Son funciones

export const startLoginEmailPassword = (email, password) => {
    //retorna una función callback por es asíncrona, esto es callback return () =>{}
    return ( dispatch ) => {
        //Para que el loading se ponga en true y se bloquee el botón de loading mientras se está realizando la acción de logueo
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( ( { user } ) =>{
            //Para que el loading se ponga en false y se desbloquee el botón de loading cuando termina la acción de logueo
            dispatch(finishLoading());
            dispatch( login(user.uid, user.displayName) );
        })
        .catch( e => {
            //Hay que dejarlo habilitado si la persona se esquivoca 
            dispatch(finishLoading());
            console.log(e);
            e.code === 'auth/user-not-found' ?
            Swal.fire('Error', 'Mail no encontrado', 'error') :
            e.code === 'auth/wrong-password' ?
            Swal.fire('Error', 'Contraseña incorrecta', 'error') :
            Swal.fire('Error', 'Su usuario o contraseña es incorrecto', 'error')
        })
    }
}

//Esto es para cuando nos registramos con el formulario pero necesito guardar el usuario en el firebase
export const startRegisterWithEmailPasswordName = ( email, password, name ) =>{
    //retorna una función callback por es asíncrona, esto es callback return () =>{}
    return ( dispatch ) =>{
        //Esto nos da una promesa, que la podemos poner con then o con async-await
        //Con esto ya se me guarda el usuario pero sin el displayName
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
                //Con esto le seteamos el displayName
                //Tmb devuelve una promesa, pero en vez de hacerlo con then lo vamos a hacer son async awair
                await user.updateProfile({ displayName:name })
                
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            })
    }
}


//esto es para cuando nos logueamos con google 
export const startGoogleLogin = () =>{
    //como es asíncrona tenemos que hacer el callback al dispatch
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
        //Extraemos el usuarion que nos da el googleProvider
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                console.log(e);
            })
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

export const startLogout = () => {
    return async( dispatch ) =>{
        //Para cerrar sesión
        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () =>({
    type: types.logout
})