import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getAllPedidos } from '../../../../actions/articulos';
import { DataGrid } from "@material-ui/data-grid";
import "./pedidoList.css";
import { getCliente } from '../../../../actions/pedidos';
import { NoteAddSharp } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

const PedidosAvatar = ({ usuario }) => {

    const location = useLocation()

    //const { usuario = 'defaultValue' } = location.state || {};
    console.log(usuario);

    const [pedidos, setPedidos] = useState([]);
    console.log(pedidos);

    const dispatch = useDispatch();

    const columns = [
        { field: "numeroPedido", headerName: "N° Pedido", width: 145 },
        { field: "fechaPedido", type: 'dateTime', valueGetter: ({ value }) => value && new Date(value), headerName: "Fecha", width: 180, },
        { field: "horaEstimadaFinPedido", headerName: "Hs estimada", width: 160 },
        { field: "tipoEnvioPedido", headerName: "Tipo envío", width: 150 },
        { field: "estado", headerName: "Estado", width: 125 },
        { field: "estadoInterno", headerName: "Estado Interno", width: 160 },
        { field: "fechaBaja", headerName: "Fecha Baja", width: 140 },

    ];

    useEffect(() => {

        dispatch(getAllPedidos()).then((data) => {
            console.log(data);
            const ped = data.filter(x => x.cliente.id == usuario?.cliente?.id)
            console.log(ped);
            setPedidos(ped)
        })

    }, [usuario]);

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

export default PedidosAvatar