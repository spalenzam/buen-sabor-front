import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

// export const getProductos = () => {
//     //como es asíncrona tenemos que hacer el callback al dispatch
//     return async (dispatch) => {

//         try {
//             const data = await axios.get(`/api/buensabor/articulosmanufacturados`)
//                 // .then(respuesta => {
//                 //     const productoList = respuesta.data;

//                 // })
//             //dispatch(getAllProducto(data))
//             dispatch
//         }
//         catch (e) {
//             console.log("No puede traer los productos");
//         }

//     }
// }

export const getProductos = () => async (dispatch) => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    try {
        //Obtengo los productos
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/cantidad-disponible`)
        console.log(res.data);
        //Actualizo el state del store
        dispatch({
            type: types.getAllProducto,
            payload: 
                res.data     
        })
        return res.data;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden traer los productos', 'error')
    }


}

// export const productosActivos = (productosList) => {
//     console.log(productosList);
//     return {
//         type: types.getAllProducto,
//         payload: 
//             productosList     
//     }
// }

export const deleteProducto = (id) => async (dispatch) => {
    try {
        //Elimino el producto
        await axios.delete(`/api/buensabor/articulosmanufacturados/${id}`)
        //Actualizo el state del store
        dispatch(deleteProductoStore(id))

    }
    catch (e) {
        console.log("No puede traer los productos");
    }
}


export const deleteProductoStore = ( id ) =>({
    type: types.deleteProducto,
    payload: id
}) 

export const getProductosSinCantidad = () => async (dispatch) => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    try {
        //Obtengo los productos
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/alta`)
        console.log(res.data);
        //Actualizo el state del store
        dispatch({
            type: types.getAllProducto,
            payload: 
                res.data     
        })
        return res.data;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden traer los productos', 'error')
    }


}

export const getProductoById = (id) => async (dispatch) => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/${id}`);
        // localStorage.setItem('user', JSON.stringify(res.data))
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el usuario', 'error')
    }
}