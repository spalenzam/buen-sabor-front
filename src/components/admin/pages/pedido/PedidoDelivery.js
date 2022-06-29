import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPedidosDelivery } from '../../../../actions/articulos';
import PedidoList from './PedidoList';
import "./pedidoList.css";

const PedidoDelivery = () => {

    const [pedidosDelivery, setPedidosDelivery] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidosDelivery()).then(setPedidosDelivery)
    }, []);

    return (
        <div className="productList">
            <PedidoList pedido={pedidosDelivery} boton={"Entregado"} /> 
        </div>
    )
}

export default PedidoDelivery