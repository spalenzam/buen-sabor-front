import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FinalProductList = ({ cart }) => {
    console.log(cart)

    const total = cart.reduce(
        (previous, product) => previous + product.cant * product.precioVenta, 0);

    const [envio, setEnvio] = useState("");

    const handleChange = (e) => {
        setEnvio(e.target.value)
    };

    const mercadopago = new window.MercadoPago('TEST-74348839-fe10-495f-af97-8cf12e55ce3e', {
        locale: 'es-AR'
    });

    async function saveMP(total) {

        const orderData = {
            descripcion: "Comida - Buen Sabor",
            cantidad: 1,
            totalPagar: total
        }

        fetch('http://localhost:3000/api/buensabor/mercadoPagoDatos/payment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        }).then(function (response) {
            console.log('post: ', response)
            console.log('response.json: ', response)
            return Promise.resolve(response.json());

        })
            .then(function (preference) {
                console.log(preference)
                createCheckoutButton(preference.id);
            })
            .catch(function () {
                console.log('Error al ejecutar Mercado Pago');
            })
    }

    function createCheckoutButton(preferenceId) {
        console.log("preference id: ", preferenceId)

        mercadopago.checkout({
            preference: {
                id: preferenceId
            },
            autoOpen: true,
        });
    }

    return (
        <div>
            <Link to={"/productos"} >
                <button> Volver </button>
            </Link>
            <h2>CARRITO</h2>
            {cart.map((comida, i) => (
                <div key={i}>
                    <h4>{comida.denominacion}</h4>
                    <h6>${comida.precioVenta} x {comida.cant} = {comida.precioVenta * comida.cant}</h6>
                </div>

            ))}
            <h3>Total: ${total} </h3>

            <div>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Envío</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="local" control={<Radio />} label="Retiro en el Local" onChange={handleChange}/>
                        <FormControlLabel value="domicilio" control={<Radio />} label="Envío a domicilio" onChange={handleChange}/>
                        {
                            envio === "" ?
                                <div>
                                    <button disabled={true}>EFECTIVO</button>
                                    <button disabled={true} onClick={() => saveMP(total)} >MERCADO PAGO </button>
                                </div>
                            : envio === "local" ?
                            <div>
                                <p>Pagando en efectivo se realiza el 10% de descuento</p>
                                <button >EFECTIVO: ${total*0.9}</button>
                                <button onClick={() => saveMP(total)} >MERCADO PAGO ${total}</button>
                            </div>
                            :  
                            <div>
                                <button disabled={true}>EFECTIVO</button>
                                <button onClick={() => saveMP(total)} >MERCADO PAGO ${total}</button>
                            </div>
                            
                    
                        }
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default FinalProductList

