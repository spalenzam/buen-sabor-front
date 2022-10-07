import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPedidoById } from '../../actions/pedidos';

const Compra = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();

    const [pedido, setPedido] = useState({}); 

    localStorage.cartProducts = [];

    useEffect(() => {
        dispatch(getPedidoById(id)).then((data) => {
            console.log(data);
            setPedido(data)
        })
    }, []);

  return (
    <div className='buen-sabor__main-content'>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2>Su compra se realizó con éxito</h2>
            <h3 className='npedido'>Número de pedido: <span>{pedido.numeroPedido}</span></h3>
            <h4 className='pedidoListo'>Su pedido estará listo a las: {pedido.horaEstimadaFinPedido} hs </h4>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default Compra