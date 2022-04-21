import { Grid } from '@material-ui/core';
import Tarjeta from './Tarjeta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';


const Productos = ({ productos, agregarACarrito }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [close] = useState();

    const [state] = useState({
        searchTerm:"", 
        close
    });

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
    endtWeekend.setHours(15);
    endtWeekend.setMinutes(59);


return (
    <>
        <input
            type="text"
            placeholder="Buscar"
            onChange={(event) => {
                //state.searchTerm = event.target.value;
                setSearchTerm(event.target.value);
            }} />

        <div>
            {console.log(searchTerm)}
        </div>
        <Grid container justifyContent="center" spacing={4}>
                {productos.filter((producto) => {
                    if (searchTerm === "") {
                        return producto
                    } else if (producto.denominacion.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return producto
                    }
                }).map((producto) => (
                    <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3} >
                        <Tarjeta
                            product={producto}
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

    </>
)
}

export default Productos