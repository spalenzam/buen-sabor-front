import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

export const getUsuarios = () => async (dispatch) => {
    try {
        //Obtengo los usuarios
        const res = await axios.get(`/api/buensabor/usuarios/alta`);

        dispatch({
            type: types.getAllUsuarios,
            payload: res.data
        })

        return res.data

    } catch (e) {
        console.log("No puede traer los usuarios");
    }
}

export const getUsuariobyMail = (email) => async (dispatch) => {
    try {
        //Obtengo los usuarios
        const rol = await axios.get(`/api/buensabor/usuarios/usuario/${email}`);
        console.log(rol);
        return rol.data.rol

    } catch (e) {
        console.log("No puede traer los usuarios");
    }
}

export const getUserbyMail = (email) => async (dispatch) => {
    try {
        //Obtengo los usuarios
        const user = await axios.get(`/api/buensabor/usuarios/usuario/${email}`);
        return user.data

    } catch (e) {
        console.log("No puede traer los usuarios");
    }
}

// export const usuariosActivos = (usuariosList) => {
//     return {
//         type: types.getAllUsuarios,
//         payload: usuariosList     
//     }
// }

export const getUsuarioById = (id) => async (dispatch) => {
    try {
        //Obtengo el usuario
        const res = await axios.get(`/api/buensabor/usuarios/${id}`);
        // localStorage.setItem('user', JSON.stringify(res.data))
        return res.data

    } catch (e) {
        console.log("No se encontró el usuario");
    }
}

export const deleteUsuarios = (id) => async (dispatch) => {

    try {
        //Obtengo los usuarios
        await axios.put(`/api/buensabor/usuarios/dar-de-baja/${id}`);
        
        dispatch(deleteUsuarioStore(id))

        Swal.fire('Delete', 'Usuario eliminado con éxito', 'success')

    } catch (e) {
        console.log("No puede eliminar el usuario");
    }
}

export const deleteUsuarioStore = (id) => ({
    type: types.deleteUsuario,
    payload: id
})

export const updateUsuario = (id, usuario, clave, rol, apellido, nombre, email, telefono, calle, numero, localidad) => async (dispatch) => {

    try {
        let domicilio = null

        domicilio = {
            calle: calle,
            numero: numero,
            localidad: localidad
        }

        const cliente = {
            apellido: apellido,
            nombre: nombre,
            email: email,
            telefono: telefono,
            domicilio: domicilio? domicilio : null
        }

        const user = {
            usuario: usuario,
            rol: rol,
            clave: clave,
            cliente: cliente
        }
        console.log(user);


        const res = await axios.put(`/api/buensabor/usuarios/${id}`, user);
        console.log(res.data);

        //esto es lo mismo que hacer otra función aparte y enviarle las cosas
        dispatch({
            type: types.updateUsuario,
            payload: {
                id,
                usuario: {
                    id,
                    ...res.data
                }
            }
        })

        Swal.fire('Update', 'Usuario actualizado con éxito', 'success') 

        return res.data;

    } catch (e) {
        console.log("No puede actualizar el usuario");
    }

}

export const guardarUsuario = (email, clave, rol) => async (dispatch) => {
    try {

        const usuario = {
            usuario: email,
            clave: clave,
            rol: rol
        }
        console.log(usuario);
        //await axios.post('/api/buensabor/usuarios', usuario)

        rol == 'Cocinero' ?
        await axios.post('/api/buensabor/usuarios/conCocinero', usuario)
        : await axios.post('/api/buensabor/usuarios/pass', usuario)

        //Swal.fire('Creado', 'Usuario creado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo guardar el usuario', 'error')
    }

}