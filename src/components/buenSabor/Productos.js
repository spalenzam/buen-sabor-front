import { Grid } from '@material-ui/core';
import Tarjeta from './Tarjeta';
// import moment from 'moment';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';



const Productos = ({ bebidas, productos, agregarACarrito, cantPedida = 0, close }) => {
    const location = useLocation();
    const { ru } = location.state || {};
    const [searchTerm, setSearchTerm] = useState("");

    if (ru) {
        if (ru.id === 3) {
            bebidas = bebidas.filter((x) => x.rubroarticulo?.id == ru?.id)
            productos = null;
        } else {
            productos = productos.filter((x) => x.articuloManufacturado?.rubrogeneral?.id == ru?.id)
            bebidas = null;
        }
    }

    // const [state] = useState({
    //     searchTerm:"", 
    //     close
    // });

    // const today = moment().toDate();
    // const todayDay = moment().format('dddd');
    // var start = moment().toDate();
    // var end = moment().toDate();
    // var startWeekend = moment().toDate();
    // var endtWeekend = moment().toDate();

    // start.setHours(20);
    // start.setMinutes(0);
    // end.setHours(23);
    // end.setMinutes(59);
    // startWeekend.setHours(11);
    // startWeekend.setMinutes(0);
    // endtWeekend.setHours(21);
    // endtWeekend.setMinutes(0);

    // today.setHours(21);
    // today.setMinutes(0);

    let cantPropPedido;

    const itemPedido = (productoId) => {
        cantPedida.find((cantPed) => {
            if (cantPed.id === productoId) {
                cantPropPedido = cantPed.cant;
                return cantPropPedido
            } else {
                return cantPropPedido = 0;
            }
        })
    }

    return (
        <>
            <div className='buen-sabor__main-content title-productos'>
                <input
                    type="text"
                    placeholder="Buscar"
                    className="inputSearch"
                    onChange={(event) => {
                        //state.searchTerm = event.target.value;
                        setSearchTerm(event.target.value);
                    }} />
                {(productos) ? <h2>COMIDAS</h2> : ""}
                <Grid container justifyContent="center" spacing={4}>
                    {productos?.filter((producto) => {
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
                                cantidadDisponible={producto.cantidadDisponible}
                                cantPedida={cantPropPedido}
                                agregarACarrito={agregarACarrito}
                                // close={(today >= start && today <= end) ?
                                //     false :

                                //     ((todayDay === 'Saturday' || todayDay === 'Sunday') && (today >= startWeekend && today <= endtWeekend)) ?
                                //         false
                                //         :
                                //         true
                                // }
                                close={close}
                            />
                        </Grid>
                    )
                    )}
                </Grid>
                {(bebidas) ? <h2>BEBIDAS</h2> : ""}
                <Grid container justifyContent="center" spacing={4}>
                    {bebidas?.filter((bebida) => {
                        if (searchTerm === "") {
                            return bebida
                        } else if (bebida.denominacion.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return bebida
                        }
                    }).map((bebida) => (

                        <Grid item key={bebida.id} xs={12} sm={6} md={4} lg={3} >
                            {itemPedido(bebida.id)}
                            <Tarjeta
                                product={bebida}
                                cantidadDisponible={bebida.stockActual - bebida.stockMinimo}
                                cantPedida={cantPropPedido}
                                agregarACarrito={agregarACarrito}
                                close={close}
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