import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPedidosCajeroTerminado } from '../../../../actions/articulos';
import PedidoList from './PedidoList';
import "./pedidoList.css";

const PedidoCajeroTerminado = () => {

    const [pedidosCajeroTerminado, setPedidosCajeroTerminado] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPedidosCajeroTerminado()).then(setPedidosCajeroTerminado)
    }, []);

    return (
        <div className="productList">
            <PedidoList pedido={pedidosCajeroTerminado} boton={"Entregar"} />
        </div>
    )
}

export default PedidoCajeroTerminado