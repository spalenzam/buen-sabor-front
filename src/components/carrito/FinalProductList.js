import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { crearPedido, getCliente } from '../../actions/pedidos';
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useSelector } from "react-redux";
import './Cart.css';

const FinalProductList = ({ cart }) => {

    const total = cart.reduce(
        (previous, product) => previous + product.cant * product.precioVenta, 0);

    const [envio, setEnvio] = useState("");

    const handleChange = (e) => {
        setEnvio(e.target.value)
    };

    //! MERCADO PAGO 
    const mercadopago = new window.MercadoPago('TEST-74348839-fe10-495f-af97-8cf12e55ce3e', {
        locale: 'es-AR'
    });

    async function saveMP(total) {

        const orderData = {
            descripcion: "Comida - Buen Sabor",
            cantidad: 1,
            totalPagar: total
        }

        fetch('http://localhost:3000/api/buensabor/mercadoPagoDatos/preference', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        }).then(function (response) {
            return Promise.resolve(response.json());
        })
        .then(function (preference) {
            console.log(preference)
            createCheckoutButton(preference.id)
        })
        .catch(function () {
            console.log('Error al ejecutar Mercado Pago');
        })
    }

    function createCheckoutButton(preferenceId) {
        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            autoOpen: true,
        });
    }

    // !CREAR PEDIDO
    const dispatch = useDispatch();

    const [formPedido, setFormPedido] = useState({
        numeroPedido: '',
        fechaPedido: new Date(),
        horaEstimadaFinPedido: '',
        tipoEnvioPedido: 'Local',
        estado: 'Pagado',
        estadoInterno: 'Cajero',
        cliente: null,
        domicilio: null,
        mercadoPagoDatos: null
    });

    const { numeroPedido, fechaPedido, horaEstimadaFinPedido, tipoEnvioPedido, estado, estadoInterno, cliente, domicilio, mercadoPagoDatos } = formPedido;

    const handleClick = ({ target }) => {
        setFormPedido({
            ...formPedido,
            // [target.name]: target.value ,
        })
    }
    

    const handleCreatePedido = (e) => {
        e.preventDefault();
        if (estado === 'Pagado') {
            dispatch(crearPedido(numeroPedido, fechaPedido, horaEstimadaFinPedido, tipoEnvioPedido, estado, estadoInterno, cliente, domicilio, mercadoPagoDatos, cart));
        }
    }

    // !CLIENTE - verificar si est?? toda la info o completar
    const usuario = useSelector(state => state.auth)
    dispatch(getCliente(usuario.email))

    return (
        <div className='buen-sabor__main-content'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="titulo-inicio">Carrito</h2>
                        
                        <div className="carrito-box">
                            <div className="carrito-1">
                                {cart.map((comida, i) => (
                                    <div key={i}>
                                        <h4>{comida.denominacion}</h4>
                                        
                                        <h6>${comida.precioVenta} x {comida.cant} = ${comida.precioVenta * comida.cant}</h6>
                                    </div>
                                ))}

                                <h3>Total: ${total} </h3>
                            </div>
                            <div className="carrito-2">
                                <form onSubmit={handleCreatePedido}>
                                    <FormLabel id="demo-radio-buttons-group-label">Env??o</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Local" control={<Radio />} label="Retiro en el Local" onChange={handleChange} />
                                        <FormControlLabel value="Domicilio" control={<Radio />} label="Env??o a domicilio" onChange={handleChange} />
                                        {
                                            envio === "" ?
                                                <div>
                                                    <button disabled={true}>Efectivo</button>
                                                    <button disabled={true}>Mercado Pago </button>
                                                </div>
                                                : envio === "Local" ?
                                                    <div>
                                                        <p>Pagando en efectivo se realiza el 10% de descuento</p>
                                                        <button onClick={handleClick}>Efectivo: ${total * 0.9}</button>
                                                        <button onClick={() => saveMP(total)} >Mercado Pago ${total}</button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <button disabled={true}>Efectivo</button>
                                                        <button onClick={() => saveMP(total)}>Mercado Pago ${total}</button>
                                                    </div>
                                        }
                                    </RadioGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FinalProductList

