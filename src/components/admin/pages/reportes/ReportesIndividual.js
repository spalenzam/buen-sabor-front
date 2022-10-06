import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { DataGrid } from "@material-ui/data-grid";
import "./pedidoList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generarExcelGanancia, generarExcelIngresoDiario, generarExcelIngresoMensual, generarExcelPedidoPorCliente, generarExcelRankingComidas, getGanancia, getIngresoDiario, getIngresoMensual, getPedidoPorCliente, getRankingComidas } from '../../../../actions/reportes';
import { useLocation, Link } from 'react-router-dom'
import moment from "moment";
import { Stack } from '@mui/material';
import { List, ListItem } from '@material-ui/core';

const ReportesIndividual = () => {

    const location = useLocation()

    const { bandera = 'defaultValue' } = location.state || {};

    console.log(bandera);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rankingComidas, setRankingComidas] = useState([]);
    const [ingresoDiario, setIngresoDiario] = useState([]);
    const [ingresoMensual, setIngresoMensual] = useState([]);
    const [pedidoPorCliente, setPedidoPorCliente] = useState([]);
    const [ganancia, setGanancia] = useState([]);

    const dispatch = useDispatch();

    const handleBuscarRanking = async (startDate, endDate) => {
        setRankingComidas(await dispatch(getRankingComidas(startDate, endDate)))
    }

    const handleBuscarIngresoDiario = async (startDate) => {
        setIngresoDiario(await dispatch(getIngresoDiario(startDate)))
    }

    const handleBuscarIngresoMensual = async (startDate) => {
        setIngresoMensual(await dispatch(getIngresoMensual(startDate)))
    }

    const handleBuscarPedidoPorCliente = async (startDate) => {
        setPedidoPorCliente(await dispatch(getPedidoPorCliente(startDate, endDate)))
    }

    const handleBuscarGanancia = async (startDate) => {
        setGanancia(await dispatch(getGanancia(startDate, endDate)))
    }

    const handleGenerarExcel = async (startDate, endDate) => {
        if (bandera == "ranking") {
            await dispatch(generarExcelRankingComidas(startDate, endDate))
        } else if (bandera == "diario") {
            await dispatch(generarExcelIngresoDiario(startDate))
        } else if (bandera == "mensual") {
            await dispatch(generarExcelIngresoMensual(startDate))
        } else if (bandera == "cliente") {
            await dispatch(generarExcelPedidoPorCliente(startDate))
        } else if (bandera == "ganancia") {
            await dispatch(generarExcelGanancia(startDate))
        }

    }

    let columns = null

    if (bandera == "ranking") {
        columns = [
            { field: "denominacion", headerName: "Nombre Producto", width: 200 },
            { field: "cantidadTotal", headerName: "Cantidad Vendida", width: 200 },

        ];
    } else if (bandera == "ganancia") {
        columns = [
            { field: "numeroFactura", headerName: "N° Factura", width: 170, },
            { field: "fechaFactura", type: 'dateTime', valueGetter: ({ value }) => value && new Date(value), headerName: "Fecha", width: 180 },
            { field: "formaPago", headerName: "Forma de Pago", width: 220 },
            { field: "totalVenta", headerName: "Venta", width: 150 },
        ];
    } else if (bandera == "diario" || bandera == "mensual") {
        columns = [
            { field: "numeroFactura", headerName: "N° Factura", width: 170, },
            { field: "fechaFactura", type: 'dateTime', valueGetter: ({ value }) => value && new Date(value), headerName: "Fecha", width: 180 },
            { field: "formaPago", headerName: "Forma de Pago", width: 220 },
            { field: "totalVenta", headerName: "Venta", width: 130 },
            {
                field: "detallefacturas", headerName: "Detalle",  width: 600,
                renderCell: (params) => {
                    
                    {console.log(params)}
                    return (
                        
                        <List className="productListItem">
                        {params.row.detallefacturas?.map((detalle, index) => (
                            <ListItem key={index}>{detalle?.cantidad + " - " + detalle?.artmanufacturado?.denominacion}</ListItem> 
                            
                        ))}
                   </List>
                    );
                    
                },
            },
        ];
    } else if (bandera == "cliente") {
        columns = [
            {
                field: "email", headerName: "Mail Cliente", width: 170, renderCell: (params) => {
                    return (
                        <div className="productListItem">
                            {params.row.cliente?.email}
                        </div>
                    );
                },
            },
            {
                field: "apellido", headerName: "Apellido Cliente", width: 200, renderCell: (params) => {
                    return (
                        <div className="productListItem">
                            {params.row.cliente?.apellido}
                        </div>
                    );
                },
            },
            {
                field: "nombre", headerName: "Nombre Cliente", width: 200, renderCell: (params) => {
                    return (
                        <div className="productListItem">
                            {params.row.cliente?.nombre}
                        </div>
                    );
                },
            },
            { field: "cantidadDePedidos", headerName: "Cantidad de pedido", width: 250 },
        ];
    }
    console.log(ingresoDiario)
    return (

        <div className="productList btnbuscar">
            {
                bandera == "ranking" || bandera == "cliente" || bandera == "ganancia" ?

                    <>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={startDate}
                            onChange={(date) => { setStartDate(date); setRankingComidas([]); setPedidoPorCliente([]); setGanancia([]) }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={endDate}
                            onChange={(date) => { setEndDate(date); setRankingComidas([]); setPedidoPorCliente([]); setGanancia([]) }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                        {
                            bandera == "ranking" ?
                                <button
                                    className="productListEdit"
                                    onClick={() => handleBuscarRanking(startDate, endDate)}
                                >
                                    Buscar
                                </button>
                                : bandera == "cliente" ?
                                    <button
                                        className="productListEdit"
                                        onClick={() => handleBuscarPedidoPorCliente(startDate, endDate)}
                                    >
                                        Buscar
                                    </button>
                                    :
                                    <button
                                        className="productListEdit"
                                        onClick={() => handleBuscarGanancia(startDate, endDate)}
                                    >
                                        Buscar
                                    </button>
                        }

                        {
                            rankingComidas?.length > 0 ?

                                <>
                                    <button
                                        className="productListButton"
                                        onClick={() => handleGenerarExcel(startDate, endDate)}
                                    >
                                        Generar excel
                                    </button>
                                    <DataGrid
                                        rows={rankingComidas}
                                        disableSelectionOnClick
                                        columns={columns}
                                        pageSize={8}
                                        rowsPerPageOptions={[8]}
                                        getRowId={(row) => Math.random()}
                                    />


                                </>
                                : pedidoPorCliente?.length > 0 ?

                                    <>
                                        <button
                                            className="productListButton"
                                            onClick={() => handleGenerarExcel(startDate, endDate)}
                                        >
                                            Generar excel
                                        </button>
                                        <DataGrid
                                            rows={pedidoPorCliente}
                                            disableSelectionOnClick
                                            columns={columns}
                                            pageSize={8}
                                            rowsPerPageOptions={[8]}
                                            getRowId={(row) => Math.random()}
                                        />


                                    </>
                                    : ganancia?.length != 0 ?
                                        <>
                                            <button
                                                className="productListButton"
                                                onClick={() => handleGenerarExcel(startDate, endDate)}
                                            >
                                                Generar excel
                                            </button>
                                            <div>El total de la ganancia en el periodo que ingresó fue de ${ganancia.ingreso}</div>
                                            <DataGrid
                                                rows={ganancia?.factura}
                                                disableSelectionOnClick
                                                columns={columns}
                                                pageSize={8}
                                                rowsPerPageOptions={[8]}
                                                getRowId={(row) => Math.random()}
                                            />


                                        </>

                                        : ''
                        }

                        <Link to={"../reportes"}>
                            <button className="addProductButton">Volver</button>
                        </Link>
                    </>

                    : bandera == "diario" || bandera == "mensual" ?
                        <>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={startDate}
                                onChange={(date) => { setStartDate(date); setIngresoDiario([]); setIngresoMensual([]) }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />

                            {
                                bandera == "diario" ?
                                    <button
                                        className="productListEdit"
                                        onClick={() => handleBuscarIngresoDiario(startDate)}
                                    >
                                        Buscar
                                    </button>
                                    :
                                    <button
                                        className="productListEdit"
                                        onClick={() => handleBuscarIngresoMensual(startDate)}
                                    >
                                        Buscar
                                    </button>
                            }

                            {ingresoDiario.length != 0 ?
                                <>
                                    <button
                                        className="productListButton"
                                        onClick={() => handleGenerarExcel(startDate)}
                                    >
                                        Generar excel
                                    </button>
                                    <div>El total de los ingresos del día {moment(startDate).format("DD-MM-yyyy")} es de ${ingresoDiario.ingreso}</div>
                                    <DataGrid
                                        rows={ingresoDiario?.factura}
                                        disableSelectionOnClick
                                        columns={columns}
                                        pageSize={8}
                                        rowsPerPageOptions={[8]}
                                        getRowId={() => Math.random()}
                                        getRowHeight={() => 'auto'}
                                    />


                                </>
                                : ingresoMensual.length != 0 ?
                                    <>
                                        <button
                                            className="productListButton"
                                            onClick={() => handleGenerarExcel(startDate)}
                                        >
                                            Generar excel
                                        </button>
                                        <div>El total de los ingresos del mes {moment(startDate).format("MM-yyyy")} es de ${ingresoMensual.ingreso}</div>
                                        <DataGrid
                                            rows={ingresoMensual?.factura}
                                            disableSelectionOnClick
                                            columns={columns}
                                            pageSize={8}
                                            rowsPerPageOptions={[8]}
                                            getRowId={(row) => Math.random()}
                                            getRowHeight={() => 'auto'}
                                        />


                                    </>
                                    : ''}
                            <Link to={"../reportes"}>
                                <button className="addProductButton">Volver</button>
                            </Link>
                        </>

                        : ''
            }


        </div>
    )
}

export default ReportesIndividual