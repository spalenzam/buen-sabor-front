import React from 'react';

const ProductosItems = ({comida, agregarACarrito, eliminarDeCarrito}) => {

    return (
        <div>
            <div>{comida.denominacion}</div>
            <div>
                <button onClick={() => agregarACarrito (comida)}>Agregar</button>
                <button onClick={() => eliminarDeCarrito (comida)}>Eliminar</button>
            </div>
            <div>
                {comida.cant}
                <p>Total= ${comida.cant * comida.precioVenta}</p>
            </div>
        </div>
    )
}

export default ProductosItems