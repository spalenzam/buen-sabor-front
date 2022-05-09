import React from 'react';

const ProductosItems = ({comida, agregarACarrito, eliminarDeCarrito, cantidadProd, cantDisponible}) => {

    return (
        <>
            <div>{comida.denominacion}</div>
            {comida.cant >= cantDisponible ? 
                <button 
                    disabled={true}
                    onClick={() => agregarACarrito (comida)}>Agregar
                </button> : 
                <button 
                    disabled={false}
                    onClick={() => agregarACarrito (comida)}>Agregar
                </button>}
                <button onClick={() => eliminarDeCarrito (comida)}>Eliminar</button>
            
            <div>
            {comida.cant}
            <p>Total= ${comida.cant * comida.precioVenta}</p>
        </div>
    </>

    )
}

export default ProductosItems