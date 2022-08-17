import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { descargarPDF, facturasPorPedidos, generarPDF, getAllFacturas, getAllPedidos, getFacturaById, getFacturasByPedidos } from '../../../../actions/articulos';
import { DataGrid } from "@material-ui/data-grid";
import "./pedidoList.css";
import { useLocation } from 'react-router-dom';

const FacturasAvatar = ({ usuario }) => {
    const location = useLocation()

    //const { usuario = 'defaultValue' } = location.state || {};
    console.log(usuario);

    const [pedidos, setPedidos] = useState([]);

    const [facturas, setFacturas] = useState([]);

    console.log(usuario);
    console.log(pedidos);
    console.log(facturas);

    const dispatch = useDispatch();

    const handleDescargar = async (id) => {

        const factura = await dispatch(getFacturaById(id))

        console.log(factura);

        await dispatch(descargarPDF(factura.id))

    }

    const columns = [
        { field: "numeroFactura", headerName: "N° Factura", width: 145 },
        { field: "fechaFactura", type: 'dateTime', valueGetter: ({ value }) => value && new Date(value), headerName: "Fecha", width: 180, },
        { field: "formaPago", headerName: "Forma de Pago", width: 160 },
        { field: "totalVenta", headerName: "Venta", width: 150 },
        {
            field: "action",
            headerName: "Acción",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            className="productListEdit"
                            onClick={() => handleDescargar(params.row.id)}
                        >
                            PDF
                        </button>
                    </>
                );
            },
        },

    ];

    useEffect(() => {
        // dispatch(getAllPedidos()).then((data) => {
        //     const ped = data.filter(x => x.cliente.id == usuario?.cliente?.id)
        //     console.log(data);
        //     setPedidos(ped)
        //     console.log(ped);
        // })
        // console.log(pedidos);
        // dispatch(getFacturasByPedidos(pedidos)).then(setFacturas)
        // console.log(facturas);
        dispatch(facturasPorPedidos(usuario)).then(setFacturas)
    }, [usuario]);

    return (
        <div className="productList">
            <DataGrid
                rows={facturas}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    )
}

export default FacturasAvatar