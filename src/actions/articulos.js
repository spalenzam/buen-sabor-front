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

export const deleteArticulo = (id) => async (dispatch) => {

    try {
        await axios.put(`/api/buensabor/articuloinsumo/dar-de-baja/${id}`);

        Swal.fire('Delete', 'Articulo eliminado con éxito', 'success')

    } catch (e) {
        console.log("No puede eliminar el usuario");
    }
}

export const getArticuloById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/buensabor/articuloinsumo/${id}`);
       
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró el artículo', 'error')

    }
}

export const getRubroArticulo = () => async () => {
    try {
        //Obtengo el producto
        const res = await axios.get(`/api/buensabor/rubroarticulo/alta`);
        // localStorage.setItem('user', JSON.stringify(res.data))
        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los rubros', 'error')
    }
}

export const updateArticulo = (id, denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro) => async () => {
    try {

        const rubro = {
            id: idRubro
        }

        const articulo = {
            denominacion: denominacion,
            esInsumo: esInsumo,
            precioCompra:precioCompra,
            precioVenta: precioVenta,
            stockActual:stockActual,
            stockMinimo:stockMinimo,
            unidadMedida: unidadMedida,
            rubroarticulo:rubro
        }

        console.log(articulo);

        const res = await axios.put(`/api/buensabor/articuloinsumo/${id}`, articulo);
        console.log(res);

        Swal.fire('Update', 'Artículo actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el artículo', 'error')
    }
}

export const createArticulo = (denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro) => async () => {
    try {

        const rubro = {
            id: idRubro,
        }

        const articulo = {
            denominacion: denominacion,
            esInsumo:esInsumo,
            precioCompra:precioCompra,
            precioVenta: precioVenta,
            stockActual:stockActual,
            stockMinimo:stockMinimo,
            unidadMedida:unidadMedida,
            rubroarticulo: rubro,
        }
        const res = await axios.post('/api/buensabor/articuloinsumo', articulo)

        //Swal.fire('Create', 'Artículo creado con éxito', 'success')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo guardar el artículo', 'error') }

    }
}

export const updateInsumoConImagen = (id, denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro, imagen) => async () => {
    try {

        const formData = new FormData();
        formData.append('denominacion', denominacion);
        formData.append('esInsumo', esInsumo);
        formData.append('precioCompra', precioCompra);
        formData.append('precioVenta', precioVenta);
        formData.append('stockActual', stockActual);
        formData.append('stockMinimo', stockMinimo);
        formData.append('unidadMedida', unidadMedida);
        formData.append('rubroarticulo.id', idRubro);
        formData.append('archivo', imagen);
        const res = await axios.put(`/api/buensabor/articuloinsumo/editar-con-imagen/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        Swal.fire('Update', 'Insumo actualizado con éxito', 'success')

        return res.data;

    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el insumo', 'error')
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

export const facturasPorPedidos = (usuario) => async (dispatch) => {
    try {

        const pedidos = await dispatch(getAllPedidos())
        console.log(pedidos);
        const pedidosFiltrados = pedidos.filter(x => x.cliente.id == usuario?.cliente?.id)
        console.log(pedidosFiltrados);
        const facturas = await dispatch(getFacturasByPedidos(pedidosFiltrados))
        console.log(facturas);
        return facturas

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

        const pedidosCajero = res.filter((x) => x?.estadoInterno == "Cajero" && x?.estado == "Pagado" || x?.estado == "Pendiente")

        return pedidosCajero

    } catch (e) {
        Swal.fire('Error', 'No se encontraron los pedidos del cajero', 'error')
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

export const getFacturasByPedidos = (pedidos) => async () => {
    try {

        const res = await axios.get('/api/buensabor/facturas')

        const facturas = [];

        pedidos.forEach((ped) => {

            res.data.forEach((fac) => {
                if(fac.pedido.id == ped?.id){
                    facturas.push(fac)
                }
            })

        })
        return facturas;


    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo obtener ninguna factura', 'error') }

    }
}

export const getFacturaById = (id) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/facturas/${id}`);

        return res.data

    } catch (e) {
        Swal.fire('Error', 'No se encontró la factura', 'error')
    }
}

export const createFactura = (pedido) => async (dispatch) => {
    try {

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

        res.data.detallefacturas = detallesFactura

        const facturaLista = await axios.put(`/api/buensabor/facturas/${res.data.id}`, res.data);

        const pdf = await dispatch(generarPDF(facturaLista.data.id))

        console.log(pdf);

        const mail = await dispatch(enviarMail(factura.numeroFactura, pedido.cliente.email))

        console.log(mail);
        Swal.fire('Create', 'Factura creada con éxito', 'success')

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo guardar la factura', 'error') }

    }
}

export const generarPDF = (factura) => async () => {
    try {

        const res = await axios.get(`/api/buensabor/facturas/generarPDF/${factura}`);

        return res.data
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo obtener ninguna factura', 'error') }

    }
}

export const descargarPDF = (factura) => async () => {
    try {

        const res = axios(`/api/buensabor/facturas/generarPDF/${factura}`, {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
        .then(response => {
        //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});
        //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
            window.open(fileURL);
        })
        .catch(error => {
            console.log(error);
        });

        // const res = await axios.get(`/api/buensabor/facturas/generarPDF/${factura}`, {
        //     headers: {
        //         'Respo': 'blob'
        //     }
        // });

        console.log(res);
        
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo obtener ninguna factura', 'error') }

    }
}



export const enviarMail = (numfactura, mail) => async () =>{
    try {

        const uno = "c://temp/factura "
        const dos = numfactura
        const tres = ".pdf"
        const archivo = uno + dos + tres

        const email = {
            to: mail,
            message: "A continuación adjuntamos la factura de la compra realizada en el local Buen Sabor",
            subject: "Factura Buen Sabor",
            attachment:archivo,
        }
        console.log(email);
        /*  */const res = await axios.post(`/api/buensabor/email//sendMailAdjunto`, email);

        return res.data


        // const formData = new FormData();
        // formData.append('to', "spalenzam@gmail.com");
        // formData.append('message', "Hola");
        // formData.append('subject', "Prueba dos");
        // formData.append('attachment', pdf);

        // const res = await axios.post('api/buensabor/email/sendMailAdjunto', formData,
        //     {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })

        // console.log(res);
    }
    catch (e) {
        throw { error: Swal.fire('Error', 'No se pudo enviar el mail', 'error') }

    }
}
