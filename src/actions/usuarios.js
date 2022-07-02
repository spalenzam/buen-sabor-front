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

        const domicilio = {
            calle: calle,
            numero: numero,
            localidad: localidad
        }

        const cliente = {
            apellido: apellido,
            nombre: nombre,
            email: email,
            telefono: telefono,
            domicilio: domicilio
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
        await axios.post('/api/buensabor/usuarios', usuario)

        //Swal.fire('Creado', 'Usuario creado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo guardar el usuario', 'error')
    }

}