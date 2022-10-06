import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createFactura, getEstados, getEstadosInternos, getPedidoById, getPedidos, getPedidosCajeroPagado, getPedidosCajeroTerminado, getPedidosCocinero, getPedidosDelivery, updateEstadoPedido } from '../../../../actions/articulos';
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import Swal from 'sweetalert2';
import "./pedidoList.css";

const PedidoList = (props) => {

    const [pedidos, setPedidos] = useState([]);

    const [estadosInternos, setEstadosInternos] = useState([]);
    const [estados, setEstados] = useState([]);

    let estadoInternoCajero = estadosInternos.filter((x) => x?.codigo == 1)
    let estadoInternoCocinero = estadosInternos.filter((x) => x?.codigo == 2)
    let estadoInternoDelivery = estadosInternos.filter((x) => x?.codigo == 3)

    let estadoPagado = estados.filter((x) => x?.codigo == 2)
    let estadoTerminado = estados.filter((x) => x?.codigo == 3)
    let estadoDelivery = estados.filter((x) => x?.codigo == 4)
    let estadoFacturado = estados.filter((x) => x?.codigo == 5)

    const dispatch = useDispatch();

    const handleUpdate = async (id) => {
        const pedido = await dispatch(getPedidoById(id))

        if (pedido.estado == "Pendiente" && pedido.estadoInterno == "Cajero") {
            await dispatch(updateEstadoPedido(id, estadoPagado.at(0)?.nombre, null))
            setPedidos(await dispatch(getPedidosCajeroPagado()))
            Swal.fire('Pedido pagado', '', 'success')

        } else if (pedido.estado == "Pagado" && pedido.estadoInterno == "Cajero") {

            await dispatch(updateEstadoPedido(id, null, estadoInternoCocinero.at(0)?.nombre))
            setPedidos(await dispatch(getPedidosCajeroPagado()))
            Swal.fire('Pedido enviado a la cocina', '', 'success')

        } else if (pedido.estado == "Pagado" && pedido.estadoInterno == "Cocina") {

            await dispatch(updateEstadoPedido(id, estadoTerminado.at(0)?.nombre, estadoInternoCajero.at(0)?.nombre))
            setPedidos(await dispatch(getPedidosCocinero()))
            Swal.fire('Pedido enviado al cajero', '', 'success')

        } else if (pedido.estado == "Terminado" && pedido.estadoInterno == "Cajero") {

            if (pedido.tipoEnvioPedido == "Delivery") {

                await dispatch(updateEstadoPedido(id, estadoDelivery.at(0)?.nombre, estadoInternoDelivery.at(0)?.nombre))
                setPedidos(await dispatch(getPedidosCajeroTerminado()))
                Swal.fire('Pedido enviado al delivery', '', 'success')

            } else {

                await dispatch(updateEstadoPedido(id, estadoFacturado.at(0)?.nombre, estadoInternoCajero.at(0)?.nombre))
                setPedidos(await dispatch(getPedidosCajeroTerminado()))
                await dispatch(createFactura(pedido))
                Swal.fire('Pedido facturado', '', 'success')

            }
        } else if (pedido.estado == "Delivery" && pedido.estadoInterno == "Delivery") {

            await dispatch(updateEstadoPedido(id, estadoFacturado.at(0)?.nombre, estadoInternoCajero.at(0)?.nombre))
            setPedidos(await dispatch(getPedidosDelivery()))
            await dispatch(createFactura(pedido))
            Swal.fire('Pedido facturado', '', 'success')
        }

    };

    const columns = [
        { field: "numeroPedido", headerName: "Número Pedido", width: 180 },
        { field: "horaEstimadaFinPedido", headerName: "Hora estimada", width: 180 },
        { field: "tipoEnvioPedido", headerName: "Tipo envío", width: 200 },
        { field: "estado", headerName: "Estado", width: 160 },
        {
            field: "action",
            headerName: "Acción",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            className="productListEdit"
                            onClick={() => handleUpdate(params.row.id)}
                        >
                            {
                                params.row.estado == "Pendiente" ?
                                "Pagado" :
                                props.boton
                            }
                        </button>
                    </>
                );
            },
        },
    ];


    useEffect(() => {
        dispatch(getEstadosInternos()).then(setEstadosInternos)
        dispatch(getEstados()).then(setEstados)
        setPedidos(props.pedido)
    }, [props.pedido]);

    return (
        <div className="productList">
            <DataGrid
                rows={pedidos}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    )
}

export default PedidoList