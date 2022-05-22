import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { finishLoading, startLoading } from "./ui"
import Swal from 'sweetalert2';
import axios from 'axios';

//Son funciones

export const startLoginEmailPassword = (email, password) => {
    //retorna una función callback por es asíncrona, esto es callback return () =>{}
    return (dispatch) => {
        //Para que el loading se ponga en true y se bloquee el botón de loading mientras se está realizando la acción de logueo
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                //Para que el loading se ponga en false y se desbloquee el botón de loading cuando termina la acción de logueo
                dispatch(finishLoading());

                const names = user.displayName.split(" ");
                dispatch(login(user.uid, names[0], names[1], user.email));
            })
            .catch(e => {
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
export const startRegisterWithEmailPasswordName = (name, lastname, email, password, telefono, numeroCalle, calle, localidad) => {
    //retorna una función callback por es asíncrona, esto es callback return () =>{}
    return (dispatch) => {
        //Para que el loading se ponga en true y se bloquee el botón de loading mientras se está realizando la acción de logueo
       
        //Esto nos da una promesa, que la podemos poner con then o con async-await
        //Con esto ya se me guarda el usuario pero sin el displayName
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                
                //Con esto le seteamos el displayName
                //Tmb devuelve una promesa, pero en vez de hacerlo con then lo vamos a hacer son async awair
                const displayName = name + " " + lastname
                console.log(displayName);
                await user.updateProfile({ displayName: displayName })
                //Creamos el domicilio
                const direction = {
                    numero: numeroCalle,
                    calle: calle,
                    localidad: localidad
                }
                
                dispatch(login(user.uid, name, lastname, email));
                dispatch(saveUser(name, lastname, email, telefono, direction));

            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const saveUser = (name, lastname, email, telefono, direction) => async (dispatch) => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    try {
        //Creo el objecto
        const cliente = {
            nombre: name, 
            apellido: lastname, 
            telefono: telefono,
            email: email,
            domicilio: direction
        }
        console.log(cliente);
        await axios.post('/api/buensabor/clientes', cliente)


    }
    catch (e) {
        console.log("No se pudo guardar el usuario");
    }
}



//esto es para cuando nos logueamos con google 
export const startGoogleLogin = () => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            //Extraemos el usuarion que nos da el googleProvider
            .then(({ user }) => {
                //Separamos el display en nombre y apellido
                const names = user.displayName.split(" ");

                dispatch(login(user.uid, names[0], names[1], user.email));
                dispatch(saveUser(names[0], names[1], user.email, user.phoneNumber, null));
            })
            .catch(e => {
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
export const login = (uid, name, lastname, email) => ({

    type: types.login,
    payload: {
        uid,
        name,
        lastname,
        email
    }

})

export const startLogout = () => {
    return async (dispatch) => {
        //Para cerrar sesión
        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})