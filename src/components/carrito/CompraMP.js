import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEstadoPedido, getPedidoMP } from '../../actions/pedidos';

const CompraMP = () => {
  const dispatch = useDispatch();

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
    <div>
      {pedido.estado === 'Pagado'
        ? <>
          <h2>Su compra se realizó con éxito</h2>
          <h3>Número de pedido: {pedido.numeroPedido}</h3>
          <h4>Su pedido estará listo a las: {pedido.horaEstimadaFinPedido} hs </h4>
        </>
        : <>
           <h2>No se pudo realizar la compra</h2>
        </>
      }
    </div>
  )
}

export default CompraMP