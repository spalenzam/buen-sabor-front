import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPedidosCocinero } from '../../../../actions/articulos';
import PedidoList from './PedidoList';
import "./pedidoList.css";

const PedidoCocinero = () => {

    const [pedidosCocinero, setPedidosCocinero] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidosCocinero()).then(setPedidosCocinero)
    }, []);

    console.log(pedidosCocinero);

    return (
        <div className="productList">
            <PedidoList pedido={pedidosCocinero} boton={"Cajero"} /> 
        </div>
    )
}

export default PedidoCocinero