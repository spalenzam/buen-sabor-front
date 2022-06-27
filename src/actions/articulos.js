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

export const getAllFacturas = () => async () => {
    try {

        const res = await axios.get('/api/buensabor/facturas')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo obtener ninguna factura', 'error') }

    }
}

export const createFactura = (pedido) => async (dispatch) => {
    try {

        console.log(pedido);
        const facturas = await dispatch(getAllFacturas())
        const ultimoNumero = facturas[facturas.length - 1].numeroFactura

        let totalPedido = 0.0
        let totalCostoPedido = 0.0
        pedido.detallepedidos?.forEach((deta) => {
            //consigo el total
            totalPedido = totalPedido + deta.subtotal

            //Consigo el costo
            deta.articulomanufacturado?.articulomanufacturadodetalles?.forEach((articulo) => {
                console.log(articulo.articuloinsumo?.precioCompra);
                console.log(articulo.cantidad);
                console.log(totalCostoPedido);
                totalCostoPedido = totalCostoPedido + articulo.articuloinsumo?.precioCompra * articulo.cantidad / 1
            })

            totalCostoPedido = totalCostoPedido * deta.cantidad

        })

        let descuento = 0.0
        if (pedido.tipoEnvioPedido != "Delivery") {
            descuento = 10 * totalPedido / 100
        }

        const ped = {
            id:pedido.id
        }
        const factura = {
            fechaFactura: new Date(),
            numeroFactura: ultimoNumero + 1,
            montoDescuento: descuento,
            formaPago: pedido.mercadoPagoDatos ? pedido.mercadoPagoDatos.formaPago : "Efectivo",
            nroTarjeta: pedido.mercadoPagoDatos ? pedido.mercadoPagoDatos.nroTarjeta : null,
            totalVenta: totalPedido - descuento,
            totalCosto: totalCostoPedido,
            pedido: ped,
        }

        const res = await axios.post('/api/buensabor/facturas', factura)

        const detallesFactura = []

        pedido.detallepedidos?.forEach((deta) => {

            const articulo ={
                id:deta.articuloinsumo?.id
            }

            const manufacturado ={
                id:deta.articulomanufacturado?.id
            }

            const detalleFactura = {
                cantidad: deta.cantidad,
                subtotal: deta.subtotal,
                artinsumo: articulo.id ? articulo : null,
                artmanufacturado: manufacturado.id ? manufacturado : null,
                factura: factura,
            }

            detallesFactura.push(detalleFactura)
        })

        console.log(detallesFactura);

        res.data.detallefacturas = detallesFactura

        const facturaLista = await axios.put(`/api/buensabor/facturas/${res.data.id}`, res.data);

        const facturaPDF = {factura : facturaLista.data}

        console.log(facturaLista.data.id);

        const pdf = await dispatch(generarPDF(facturaLista.data.id))

        Swal.fire('Create', 'Factura creada con éxito', 'success')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo guardar la factura', 'error') }

    }
}

export const generarPDF = (factura) => async () => {
    try {

        console.log(factura);
        const res = await axios.get(`/api/buensabor/facturas/generarPDF/${factura}`);

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo obtener ninguna factura', 'error') }

    }
}