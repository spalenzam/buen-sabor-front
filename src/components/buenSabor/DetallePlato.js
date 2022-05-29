import React from 'react'; 
import { useParams } from 'react-router';

const DetallePlato = ({productos})=>{

    const { id } = useParams();
    let producto = productos.filter((producto) => producto.articuloManufacturado.id == id);
     console.log(id)
     console.log(producto)
    return (
        <div>
        <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${producto[0].articuloManufacturado.id}`} alt={producto[0].articuloManufacturado.denominacion} className="productInfoImg" /> 
        {producto[0].articuloManufacturado.denominacion}
        {producto[0].articuloManufacturado.precioVenta}
        {producto[0].cantidadDisponible}
        </div>
    );
    
}


export default DetallePlato