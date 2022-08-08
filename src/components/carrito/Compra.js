import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPedidoById } from '../../actions/pedidos';

const Compra = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();

    const [pedido, setPedido] = useState({}); 

    useEffect(() => {
        dispatch(getPedidoById(id)).then((data) => {
            console.log(data);
            setPedido(data)
        })
    }, []);

  return (
    <div>
        <h2>Su compra se realizó con éxito</h2>
        <h3>Número de pedido: {pedido.numeroPedido}</h3>
        <h4>Su pedido estará listo a las: {pedido.horaEstimadaFinPedido} hs </h4>
    </div>
  )
}

export default Compra