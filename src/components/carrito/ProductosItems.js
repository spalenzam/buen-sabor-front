import React from 'react';

const ProductosItems = ({comida, agregarACarrito, eliminarDeCarrito, cantidadProd, cantDisponible}) => {

    return (
        <>
            <div>{comida.denominacion}</div>
            {comida.cant >= cantDisponible ? 
                <button 
                    className="productsContainerBtnDisabled"
                    disabled={true}
                    onClick={() => agregarACarrito (comida)}>Agregar
                    
                </button> : 
                <button 
                    className="productsContainerBtn"
                    disabled={false}
                    onClick={() => agregarACarrito (comida)}>Agregar
                </button>}
                <button className="productsContainerBtn" onClick={() => eliminarDeCarrito (comida)}>Eliminar</button>
            
            <div>
            {comida.cant}
            <p>Total= ${comida.cant * comida.precioVenta}</p>
        </div>
    </>

    )
}

export default ProductosItems