import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPedidosCajeroPagado } from '../../../../actions/articulos';
import PedidoList from './PedidoList';
import "./pedidoList.css";

const PedidoCajeroPagado = () => {

    const [pedidosCajeroPagado, setPedidosCajeroPagado] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidosCajeroPagado()).then(setPedidosCajeroPagado)
    }, []);

    return (
        <div className="productList">
            <PedidoList pedido={pedidosCajeroPagado} boton={"Cocina"} /> 
        </div>
    )
}

export default PedidoCajeroPagado