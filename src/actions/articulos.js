import Swal from 'sweetalert2';
import axios from 'axios';

export const getArticuloInsumo = () => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/articuloinsumo/alta`);

        const resData = res.data
        
        return resData

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los insumos', 'error')
    }
}

export const getAllPedidos = () => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos`);
        
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos', 'error')
    }
}

export const getPedidos = () => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/alta`);
        
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos dados de alta', 'error')
    }
}

export const getPedidosCajeroPagado = () => async (dispatch) => {
    try {

        const res = await dispatch(getPedidos())

        console.log(res);

        const pedidosCajero = res.filter((x) => x?.estadoInterno == "Cajero" && x?.estado == "Pagado")
        
        return pedidosCajero

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos pagados', 'error')
    }
}

export const getPedidosCajeroTerminado = () => async (dispatch) => {
    try {

        const res = await dispatch(getPedidos())

        const pedidosCajero = res.filter((x) => x?.estadoInterno == "Cajero" && x?.estado == "Terminado")
        
        return pedidosCajero

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos terminados', 'error')
    }
}

export const getPedidosCocinero = () => async (dispatch) => {
    try {

        const res = await dispatch(getPedidos())

        console.log(res);

        const pedidosCocinero = res.filter((x) => x?.estadoInterno == "Cocina" && x?.estado == "Pagado")
        
        return pedidosCocinero

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos para el cocinero', 'error')
    }
}

export const getPedidosDelivery = () => async (dispatch) => {
    try {

        const res = await dispatch(getPedidos())

        console.log(res);

        const pedidosDelivery = res.filter((x) => x?.estadoInterno == "Delivery" && x?.estado == "Delivery")
        
        return pedidosDelivery

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos para el cocinero', 'error')
    }
}

export const getEstadosInternos = () => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/estados-internos`); 

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los estados internos', 'error')
    }
}

export const getEstados = () => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/estados`); 

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los estados', 'error')
    }
}

export const updateEstadoPedido = (id, estado, estadoInterno) => async () => {
    try {

        const pedido = {
            estadoInterno: estadoInterno,
            estado: estado
        }

        console.log(pedido);

        const res = await axios.put(`/api/buensabor/pedidos/cambiar-estados/${id}`, pedido);

        return res.data;

    } catch (e) {
        throw Swal.fire('Error', 'No se pudo guardar el pedido', 'error');
        
    }
}


export const getPedidoById = (id) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/${id}`); 

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el pedido', 'error')
    }
}
