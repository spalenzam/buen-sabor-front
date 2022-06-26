import axios from 'axios';
import Swal from 'sweetalert2';

// !DATOS DE CLIENTE
export const getCliente = (email) => async () => {
    try {

        const res = await axios.get(`api/buensabor/clientes/cliente/${email}`)
        const datosCliente = res.data

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
        return ('mp:', res)
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

        let tiempoPedidosCocina = 0
        let tiempoCocina = 0
        pedidosCocina.forEach(pedidos => {
            if (pedidos.estadoInterno === 'Cocina') {
                const enCocina = pedidos.detallepedidos
                enCocina.forEach((tiempo) => {
                    tiempoPedidosCocina = tiempoPedidosCocina + (tiempo.articulomanufacturado.tiempoEstimadoCocina) * tiempo.cantidad
                })
            }
        })    

        // !CAMBIAR POR COCINEROS DE CONFIGURACIÓN
        //Obtengo la cantidad de Cocineros
        const cocineros = await dispatch(getRolUsuario())
        
        //Hora Actual
        let hoy = new Date();
        let horaActual = hoy.getHours() 
        let minActual = hoy.getMinutes()

        //Cálculo en hora, min y seg
        let horas = Math.floor(((tiempoPedidosCocina/cocineros) + tiempoElaboracion ) / 60) + horaActual;
        let minutos = Math.floor(((tiempoPedidosCocina/cocineros) + tiempoElaboracion + minActual) % 60);

        //Si son pasadas las 24
        horas = horas >= 24 ? horas - 24 : horas;

        //Si son menos de 10' coloco un 0 adelante
        minutos = minutos < 10 ? '0' + minutos : minutos;
        tiempoCocina = horas + ":" + minutos + ":00"

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
            if (rol.rol === 'Cocinero') {
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

        insumosNecesarios.forEach((insumo) => {

            const insumoUsado = {
                denominacion: insumo.articuloinsumo.denominacion,
                esInsumo: insumo.articuloinsumo.esInsumo,
                precioCompra: insumo.articuloinsumo.precioCompra,
                precioVenta: insumo.articuloinsumo.precioVenta,
                stockMinimo: insumo.articuloinsumo.stockMinimo,
                unidadMedida: insumo.unidadMedida,
                stockActual: (insumo.articuloinsumo.stockActual - insumo.cantidad * cant).toFixed(2),
            }

            axios.put(`api/buensabor/articuloinsumo/${insumo.articuloinsumo.id}`, insumoUsado);

        });

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
            tiempoElaboracion = tiempoElaboracion + (tiempo.tiempoEstimadoCocina) * tiempo.cant
        })
        
        // **TIEMPO DE PEDIDOS EN COCINA
        const horarioEntrega = await dispatch(getPedidosCocina(tiempoElaboracion))
        
        // **PEDIDO
        const pedidoNuevo = await dispatch(getPedidos())

        const pedido = {
            numeroPedido: pedidoNuevo,
            fechaPedido: fechaPedido,
            horaEstimadaFinPedido: horarioEntrega,
            tipoEnvioPedido: tipoEnvioPedido,
            estado: estado,
            estadoInterno: estadoInterno,
        }
        const res = await axios.post('/api/buensabor/pedidos', pedido)

        // **DETALLE PEDIDO
        const detallesPedido = [];
        const promesas = [];

        cart.forEach((detpedido) => {

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

        })

        Promise.all(promesas);
        res.data.detallepedidos = detallesPedido

        await axios.put(`/api/buensabor/pedidos/${res.data.id}`, res.data);

        // **genero [] de ART MANUFACTURADOS
        const artManufComprados = [];
        detallesPedido.forEach((detinsumo) => {

            const detManufComprado = {
                cantidad: detinsumo?.cantidad,
                idArtManufacturado: detinsumo.articulomanufacturado.id,
            }

            artManufComprados.push(detManufComprado)
        })

        // **ARTICULO MANUFACTURADO según id para ver insumos        
        artManufComprados.forEach((detManufacturado) => {
            dispatch(getArtManufacturado(detManufacturado.idArtManufacturado, detManufacturado.cantidad))
        })

        Swal.fire({
            icon: 'success',
            title: 'Número de pedido: ' + pedido.numeroPedido,
            text: 'Su pedido estará listo a las: ' + horarioEntrega + 'hs'
        })
    }
    catch (e) {
        Swal.fire('Error', 'No se pudo realizar el pedido', 'error')
    }

}
