import { types } from "../types/types";
import axios from 'axios';

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
        const res = await axios.get(`/api/buensabor/articulosmanufacturados`)
        //Actualizo el state del store
        dispatch(productosActivos(res.data))
        return res.data;

    }
    catch (e) {
        console.log("No puede traer los productos");
    }


}

export const productosActivos = (productosList) => {
    console.log(productosList);
    return {
        type: types.getAllProducto,
        payload: 
            productosList     
    }
}

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