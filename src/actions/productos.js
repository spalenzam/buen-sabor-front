import { types } from "../types/types";
import axios from 'axios';
import Swal from 'sweetalert2';

export const getProductos = () => async (dispatch) => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    try {
        //Obtengo los productos
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/cantidad-disponible`)
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

export const getBebidas = () => async (dispatch) => {

    try {

        //Obtengo los articulos insumo/bebidas
        const res = await axios.get(`/api/buensabor/articuloinsumo/alta`)
        
        const bebidas = res.data.filter(articulo => articulo.esInsumo === false);

        //Actualizo el state del store
        dispatch({
            type: types.getAllBebidas,
            payload:
                bebidas
        })
       
        return bebidas;

    }
    catch (e) {
        Swal.fire('Error', 'No se pueden traer los productos', 'error')
    }
}

export const deleteProducto = (id) => async (dispatch) => {
    try {
        //Elimino el producto
        await axios.put(`/api/buensabor/articulosmanufacturados/dar-de-baja/${id}`)
        //Actualizo el state del store
        dispatch(deleteProductoStore(id))

        Swal.fire('Elimado', 'Producto eliminado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se puede eliminar el producto', 'error')
    }
}


export const deleteProductoStore = (id) => ({
    type: types.deleteProducto,
    payload: id
})

export const getProductosSinCantidad = () => async (dispatch) => {
    //como es asíncrona tenemos que hacer el callback al dispatch
    try {
        //Obtengo los productos
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/alta`)
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
        Swal.fire('Error', 'No se encontró el producto', 'error')

    }
}

export const getRubroGeneral = () => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/rubrogeneral/alta`);
        // localStorage.setItem('user', JSON.stringify(res.data))
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los rubros', 'error')
    }
}


export const updateProductoConImagen = (id, denominacion, precioVenta, tiempoEstimadoCocina, idRubro, imagen) => async () => {
    try {

        const formData = new FormData();
        formData.append('denominacion', denominacion);
        formData.append('precioVenta', precioVenta);
        formData.append('tiempoEstimadoCocina', tiempoEstimadoCocina);
        formData.append('rubrogeneral.id', idRubro);
        formData.append('archivo', imagen);
        const res = await axios.put(`/api/buensabor/articulosmanufacturados/editar-con-imagen/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        //const res = await axios.put(`/api/buensabor/articulosmanufacturados/${id}`, product);

        Swal.fire('Update', 'Producto actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el producto', 'error')
    }
}

export const updateProducto = (id, denominacion, precioVenta, tiempoEstimadoCocina, idRubro, fechaBaja) => async () => {
    try {

        const rubro = {
            id: idRubro
        }
        const product = {
            denominacion: denominacion,
            precioVenta: precioVenta,
            tiempoEstimadoCocina: tiempoEstimadoCocina,
            rubrogeneral: rubro,
            fechaBaja: fechaBaja
        }

        const res = await axios.put(`/api/buensabor/articulosmanufacturados/${id}`, product);

        Swal.fire('Update', 'Producto actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el producto', 'error')
    }
}

export const getArtManuDetalle = (id) => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/artmanufacturadodetalle`);

        const resData = res.data

        const result = resData.filter(articulo => articulo.articulomanufacturado.id == id);

        return result

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los articulos detalles del producto seleccionado', 'error')
    }
}

export const getArtManuDetalleById = (id) => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/artmanufacturadodetalle/${id}`);

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los articulos detalles', 'error')
    }
}

export const updateArticuloDetalle = (id, denominacionArticulo, unidadMedida, cantidad) => async () => {
    try {

        const articulo = {
            unidadMedida: unidadMedida,
            cantidad: cantidad
        }

        const res = await axios.put(`/api/buensabor/artmanufacturadodetalle/${id}`, articulo);

        Swal.fire('Update', 'Producto actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el producto', 'error')
    }
}


export const deleteArticuloDetalle = (id) => async (dispatch) => {
    try {
        //Elimino el producto
        await axios.delete(`/api/buensabor/artmanufacturadodetalle/${id}`)

        Swal.fire('Eliminado', 'Detalle eliminado con éxito', 'success')

    }
    catch (e) {
        Swal.fire('Error', 'No puede eliminar los articulos', 'error')
    }
}

export const guardarArticuloDetalle = (producto, idArticulo, unidadMedida, cantidad, articulos) => async () => {
    try {

        const articuloinsumo = articulos.filter(art => art.id == idArticulo)
        // const articuloinsumo ={
        //     id:parseInt(idArticulo)
        // }

        const articulomanufacturadodetalle = {
            unidadMedida: unidadMedida,
            cantidad: cantidad,
            articuloinsumo: articuloinsumo[0],
            articulomanufacturado: producto,
        }

        await axios.post('/api/buensabor/artmanufacturadodetalle', articulomanufacturadodetalle)

        Swal.fire('Creado', 'Detalle creado con éxito', 'success')
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo guardar el detalle', 'error')
    }

}

export const createProductoManufacturado = (denominacionProducto, precioVenta, tiempoEstimadoCocina, fechaBaja, idRubro, articulomanufacturadodetalles) => async () => {
    try {

        const rubro = {
            id: idRubro,
        }

        const articulomanufacturado = {
            denominacion: denominacionProducto,
            precioVenta: precioVenta,
            tiempoEstimadoCocina: tiempoEstimadoCocina,
            fechaBaja: fechaBaja,
            rubrogeneral: rubro,
        }
        const res = await axios.post('/api/buensabor/articulosmanufacturados/crear-con-rubro', articulomanufacturado)

        res.data.articulomanufacturadodetalles = articulomanufacturadodetalles

        await axios.put(`/api/buensabor/articulosmanufacturados/${res.data.id}`, res.data);

        //Swal.fire('Create', 'Producto creado con éxito', 'success')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo guardar el producto', 'error') }

    }
}

export const createProductoManufacturadoConImagen = (denominacionProducto, precioVenta, tiempoEstimadoCocina, fechaBaja, idRubro, articulomanufacturadodetalles, imagen) => async () => {
    try {
        console.log(imagen);
        const formData = new FormData();
        formData.append('denominacion', denominacionProducto);
        formData.append('precioVenta', precioVenta);
        formData.append('tiempoEstimadoCocina', tiempoEstimadoCocina);
        formData.append('rubrogeneral.id', idRubro);
        formData.append('archivo', imagen);

        const res = await axios.post('/api/buensabor/articulosmanufacturados/crear-con-imagen', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        res.data.articulomanufacturadodetalles = articulomanufacturadodetalles

        await axios.put(`/api/buensabor/articulosmanufacturados/${res.data.id}`, res.data);

        //Swal.fire('Create', 'Producto creado con éxito', 'success')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo guardar el producto', 'error') }
    }
}

