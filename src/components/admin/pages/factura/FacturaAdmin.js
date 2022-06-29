import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { descargarPDF, generarPDF, getAllFacturas, getFacturaById } from '../../../../actions/articulos';
import { DataGrid } from "@material-ui/data-grid";
import "./pedidoList.css";

const FacturaAdmin = () => {
    const [facturas, setFacturas] = useState([]);

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
        dispatch(getAllFacturas()).then(setFacturas)
    }, []);

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

export default FacturaAdmin