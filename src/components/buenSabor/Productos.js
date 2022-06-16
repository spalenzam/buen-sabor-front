import { Grid } from '@material-ui/core';
import Tarjeta from './Tarjeta';
import moment from 'moment';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'

const Productos = ({ productos, agregarACarrito, cantPedida=0 }) => {
    const location = useLocation()
    const { rubro = 'defaultValue' } = location.state || {};
    const [searchTerm, setSearchTerm] = useState("");

    console.log(rubro)
    
    // const [state] = useState({
    //     searchTerm:"", 
    //     close
    // });

    const today = moment().toDate();
    const todayDay = moment().format('dddd');
    var start = moment().toDate();
    var end = moment().toDate();
    var startWeekend = moment().toDate();
    var endtWeekend = moment().toDate();

    start.setHours(20);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);
    startWeekend.setHours(11);
    startWeekend.setMinutes(0);
    endtWeekend.setHours(21);
    endtWeekend.setMinutes(0);
    
    today.setHours(21);
    today.setMinutes(0);

let cantPropPedido;

const itemPedido = (productoId) => {
    cantPedida.find((cantPed) => {
        if (cantPed.id === productoId){
            cantPropPedido = cantPed.cant;
            return cantPropPedido
        } else {
            return cantPropPedido = 0;
        }
    })  
}

return (
    <>
        <div className='buen-sabor__main-content'>
            <input
                type="text"
                placeholder="Buscar"
                className="inputSearch"
                onChange={(event) => {
                    //state.searchTerm = event.target.value;
                    setSearchTerm(event.target.value);
                }} />

            <Grid container justifyContent="center" spacing={4}>
                    {productos.filter((producto) => {
                        if (searchTerm === "") {
                            return producto
                        } else if (producto.articuloManufacturado.denominacion.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return producto
                        }
                    }).map((producto) => (
                        <Grid item key={producto.articuloManufacturado.id} xs={12} sm={6} md={4} lg={3} >
                            {itemPedido(producto.articuloManufacturado.id)}
                            <Tarjeta
                                product={producto.articuloManufacturado}
                                cantidadDisponible = {producto.cantidadDisponible}
                                cantPedida = {cantPropPedido}
                                agregarACarrito={agregarACarrito}
                                close={(today >= start && today <= end) ?
                                    false :

                                    ((todayDay === 'Saturday' || todayDay === 'Sunday') && (today >= startWeekend && today <= endtWeekend)) ?
                                        false
                                        :
                                        true
                                }
                            />
                        </Grid>
                    )
                    )}
            </Grid>
        </div>                    
    </>
)
}

export default Productos