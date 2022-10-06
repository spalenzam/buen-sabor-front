import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEstadoPedido, getPedidoMP } from '../../actions/pedidos';

const CompraMP = () => {
  const dispatch = useDispatch();

  localStorage.cartProducts = [];

  let url = window.location.search
  url = url.substring(1)

  let urlParseada = url.split('&')
  let json = {}

  for (let i in urlParseada) {
    let variable = urlParseada[i].split('=')
    json[variable[0]] = variable[1]
  }

  const nro = json.payment_id
  const [pedido, setPedido] = useState({});

  useEffect(() => {
    dispatch(getEstadoPedido(json.status, nro)).then((data) => {
      setPedido(data)
    })
  }, []);

  return (
    <div className='buen-sabor__main-content'>
      <div class="container">
        <div class="row">
          <div class="col-12">
            {json.status === 'approved'
              ? <>
                <h2>Su compra se realizó con éxito</h2>
                <h3 className='npedido'>Número de pedido: <span>{pedido.numeroPedido}</span></h3>
                <h4 className='pedidoListo'>Su pedido estará listo a las: {pedido.horaEstimadaFinPedido} hs </h4>
              </>
              : <>
                <h2>No se pudo realizar la compra</h2>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompraMP