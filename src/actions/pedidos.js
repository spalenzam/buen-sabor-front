import axios from 'axios';
import Swal from 'sweetalert2';

// !DATOS DE CLIENTE
export const getCliente = (email) => async () => {
    try {

        const res = await axios.get(`api/buensabor/usuarios/usuario/${email}`)
        return res.data

    }
    catch (e) {
        console.log('No se puede obtener el cliente')
    }
}

// !ESTADO DE PAGO - MERCADO PAGO
export const getEstadoPago = (id) => async () => {
    try{
        const res = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`)
        console.log (res)

    } catch {
        console.log('No se puede obtener el estado del pago realizado con Mercado Pago');
    }
}

// !CANTIDAD DE PEDIDOS EN DB
export const getPedidos = () => async () => {
    try {
        const res = await axios.get(`api/buensabor/pedidos`)
        return res.data.length + 1;
    }
    catch (e) {
        console.log('No se puede obtener el total de pedidos')
    }
}

// !CANTIDAD DE PEDIDOS EN COCINA 
export const getPedidosCocina = (tiempoElaboracion) => async (dispatch) => {
    try {
        const res = await axios.get(`api/buensabor/pedidos`)
        const pedidosCocina = res.data
        console.log("pedidosCocina", pedidosCocina)

        let tiempoPedidosCocina = 0
        let tiempoCocina = 0
        pedidosCocina.forEach(pedidos => {
            if (pedidos.estadoInterno === 'Cocina') {
                const enCocina = pedidos.detallepedidos
                enCocina.forEach((tiempo) => {
                    tiempoPedidosCocina = tiempoPedidosCocina + (tiempo.articulomanufacturado.tiempoEstimadoCocina) * tiempo.cantidad
                })
            } else {
                tiempoPedidosCocina = tiempoPedidosCocina
            }

        })    

        // !CAMBIAR POR COCINEROS DE CONFIGURACIÓN
        //Obtengo la cantidad de Cocineros 
        // const promCocinero = 0;
        // const cocineros = await dispatch(getRolUsuario())
        // promCocinero= cocineros
        // Promise.all(promCocinero)

        const cantCocineros = await axios.get(`api/buensabor/configuracion`)
        const cocineros = cantCocineros.data[0].cantidadCocineros

        //Hora Actual
        let hoy = new Date();
        let horaActual = hoy.getHours() 
        let minActual = hoy.getMinutes()
        let horas = 0
        let minutos = 0

        //Cálculo en hora, min y seg
        if (tiempoPedidosCocina > 0) {
            horas = Math.floor(((tiempoPedidosCocina / cocineros) + tiempoElaboracion) / 60) + horaActual;
            minutos = Math.floor(((((tiempoPedidosCocina / cocineros) + tiempoElaboracion) % 60) + minActual) % 60);
            if (minutos >= 60) {
                horas = Math.floor(horas + (minutos/60))
                minutos = Math.floor( minutos % 60)
            } 

        } else {
            horas = Math.floor(tiempoElaboracion / 60) + horaActual;
            minutos = Math.floor((tiempoElaboracion % 60 + minActual));
            if (minutos >= 60) {
                horas = Math.floor(horas + (minutos/60))
                minutos = Math.floor( minutos % 60)
            } 
        }

        //Si son pasadas las 24
        horas = horas >= 24 ? horas - 24 : horas;

        //Si son menos de 10' coloco un 0 adelante
        minutos = minutos < 10 ? '0' + minutos : minutos;
        tiempoCocina = horas + ":" + minutos + ":00"
        console.log(tiempoCocina);
        return tiempoCocina;
    }
    catch (e) {
        console.log('No se puede obtener la cantidad de Cocineros')
    }
}

// !CANTIDAD DE COCINEROS
export const getRolUsuario = () => async () => {
    try {
        const res = await axios.get(`api/buensabor/usuarios/alta`)
        const roles = res.data
        let cantCocineros = 0

        roles.forEach(rol => {
            if (rol.rol == 'Cocinero') {
                cantCocineros = cantCocineros + 1
            }
        })
        return cantCocineros;
    }
    catch (e) {
        console.log('No se puede obtener la cantidad de Cocineros')
    }
}

// !ARTICULO MANUFACTURADO POR ID - ACTUALIZO INSUMO
export const getArtManufacturado = (id, cant) => async (dispatch) => {
    try {

        // traigo los artManufacturdos por id y obtengo los insumos que necesita cada art
        const res = await axios.get(`/api/buensabor/articulosmanufacturados/${id}`)
        const insumosNecesarios = res.data.articulomanufacturadodetalles

        const listaInsumos = [];
        let insu = [];

        insumosNecesarios.forEach((insumo) => {
            listaInsumos.push(insu = axios.get(`/api/buensabor/articuloinsumo/${insumo.articuloinsumo.id}`))
        })
        Promise.all(listaInsumos).then(responses => {
            responses.forEach(response => {

                insumosNecesarios.forEach((ins) => {
                    if (ins.articuloinsumo.id === response.data.id) {
                        const insumoUsado = {
                            denominacion: response.data.denominacion,
                            esInsumo: response.data.esInsumo,
                            precioCompra: response.data.precioCompra,
                            precioVenta: response.data.precioVenta,
                            stockMinimo: response.data.stockMinimo,
                            unidadMedida: response.data.unidadMedida,
                            stockActual: (response.data.stockActual) - (ins.cantidad * cant)
                        }
                        axios.put(`api/buensabor/articuloinsumo/${ins.articuloinsumo.id}`, insumoUsado);
                    }
                })

            })
        })

    }

    catch (e) {
        console.log('No se puede obtener art manf')
    }
}

// !VER CLIENTE
// !CREAR PEDIDO Y DETALLES PEDIDO
export const crearPedido = (numeroPedido, fechaPedido, horaEstimadaFinPedido, tipoEnvioPedido, estado, estadoInterno, idCliente, idDomicilio, idMPDatos, cart) => async (dispatch) => {

    try {
        
        //**TIEMPO DE ELABORACIÓN DE PROD MANUFACTURADOS
        let tiempoElaboracion = 0
        cart.forEach((tiempo) => {
            if (tiempo.rubroarticulo?.id === 3 ) {
                tiempoElaboracion = tiempoElaboracion 
            } else {
                tiempoElaboracion = tiempoElaboracion + (tiempo.tiempoEstimadoCocina) * tiempo.cant
            }
        })
        console.log(tiempoElaboracion);
        // **TIEMPO DE PEDIDOS EN COCINA
        const horarioEntrega = await dispatch(getPedidosCocina(tiempoElaboracion));
        console.log(horarioEntrega);

        // **PEDIDO
        const pedidoNuevo = await dispatch(getPedidos())
        
        const fkcliente = {
            id: idCliente
        }

        const fkdomicilio = {
            id: idDomicilio
        }

        let fkmercadopago = null
        
        if (estado === 'PendienteMP') {
            
            const mercadoPago = {
                estado: estado,
                formaPago: 'Debito',
                metodoPago: tipoEnvioPedido,
            }
            const resmp = await axios.post('api/buensabor/mercadoPagoDatos', mercadoPago)
            
            fkmercadopago = {
                identificadorPago: resmp.data.identificadorPago
            }
        }

        const pedido = {
            numeroPedido: pedidoNuevo,
            fechaPedido: fechaPedido,
            horaEstimadaFinPedido: horarioEntrega,
            tipoEnvioPedido: tipoEnvioPedido,
            estado: estado,
            estadoInterno: estadoInterno,
            cliente: fkcliente,
            domicilio: fkdomicilio,
            mercadoPagoDatos: fkmercadopago 
        }
        const res = await axios.post('/api/buensabor/pedidos', pedido)

        // **DETALLE PEDIDO
        const detallesPedido = [];
        const promesas = [];

        cart.forEach((detpedido) => {

            //si as articulo manufacturado
            if (detpedido.articulomanufacturadodetalles) {
                const artManufacturado = {
                    id: detpedido.id
                }

                const fkpedido = {
                    id: res.data.id
                }

                const detallePedido = {
                    cantidad: detpedido?.cant,
                    subtotal: detpedido?.precioVenta,
                    articulomanufacturado: artManufacturado,
                    pedido: fkpedido,
                }
                detallesPedido.push(detallePedido)
                promesas.push(axios.post('api/buensabor/detallepedido', detallePedido));
            }

            //si as articulo insumo
            else {
                const artInsumo = {
                    id: detpedido.id
                }

                const fkpedido = {
                    id: res.data.id
                }

                const detallePedido = {
                    cantidad: detpedido?.cant,
                    subtotal: detpedido?.precioVenta,
                    articuloinsumo: artInsumo,
                    pedido: fkpedido,
                }
                detallesPedido.push(detallePedido)
                promesas.push(axios.post('api/buensabor/detallepedido', detallePedido));
            }

        })

        Promise.all(promesas);
        res.data.detallepedidos = detallesPedido

        await axios.put(`/api/buensabor/pedidos/${res.data.id}`, res.data);

        //ESTADO = PAGADO disminuyo insumos
        if (estado === 'Pendiente') {
            await axios.put(`/api/buensabor/detallepedido/actualizar/${res.data.id}`);
            window.location.replace(`http://localhost:3000/compra/${res.data.id}`)
        } 

        // Swal.fire({
        //     icon: 'success',
        //     title: 'Número de pedido: ' + pedido.numeroPedido,
        //      text: 'Su pedido estará listo a las: ' + horarioEntrega + 'hs'
        // })
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo realizar el pedido', 'error')
    }

}

// !DATOS DEL PEDIDO
export const getPedidoById = (id) => async () => {
    try {
        const res = await axios.get(`/api/buensabor/pedidos/${id}`)
        return res.data;
    }
    catch (e) {
        console.log('No se puede obtener los datos del pedido')
    }
}

// !DATOS PEDIDO MP
export const getPedidoMP = () => async () => {
    try {

        const res = await axios.get(`/api/buensabor/pedidos/ultimoPedido`)
        return res.data

    }
    catch (e) {
        console.log('No se puede obtener el cliente')
    }
}

// !ESTADO DE PAGO - MERCADO PAGO
export const getEstadoPedido = (status, nro) => async () => {

    try {
        const res = await axios.get(`/api/buensabor/pedidos/ultimoPedido`)

        if (status === 'approved') {
            res.data.estado = 'Pagado'

            //Disminuyo insumos
            await axios.put(`/api/buensabor/detallepedido/actualizar/${res.data.id}`);

            //Actualizo estado del pedido
            await axios.put(`/api/buensabor/pedidos/${res.data.id}`, res.data);

            //obtengo mp
            const resmp = await axios.get(`/api/buensabor/mercadoPagoDatos/${res.data.mercadoPagoDatos.identificadorPago}`)

            resmp.data.fechaAprobacion = new Date();
            resmp.data.estado = 'Aprobado';
            resmp.data.nroTarjeta = nro;

            await axios.put(`/api/buensabor/mercadoPagoDatos/${resmp.data.identificadorPago}`, resmp.data);
            return res.data

        } else {
            res.data.estado = 'Rechazado'

            //Actualizo estado del pedido
            await axios.put(`/api/buensabor/pedidos/${res.data.id}`, res.data);

            //obtengo mp
            const resmp = await axios.get(`/api/buensabor/mercadoPagoDatos/${res.data.mercadoPagoDatos.identificadorPago}`)

            resmp.data.estado = 'Rechazado';

            await axios.put(`/api/buensabor/mercadoPagoDatos/${resmp.data.identificadorPago}`, resmp.data);
        }

        // return ('mp:', res)
    } catch {
        console.log('No se puede obtener el estado del pago realizado con Mercado Pago');
    }
}