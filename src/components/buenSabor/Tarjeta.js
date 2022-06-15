import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './tarjeta.css';

const Tarjeta = ({ product, agregarACarrito, close, cantidadDisponible, cantPedida }) => {
    
    return (
        <>
            <Card className="margenesTarjeta">
                <a href={`/detalle/${product.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${product.id}`} className="maxAltoImg" alt="producto" />
                </a>
                <Card.Body>
                    <Card.Title>{product.denominacion}</Card.Title>
                    <Link to={ "/detallePlato/" + product.id}>
                    <button className="detalleTarjeta">Detalle del producto</button>
                    </Link>
                    <Card.Text>
                        ${product.precioVenta}
                    </Card.Text>
                    
                    
                </Card.Body>
                {
                    close
                        ?
                        <button
                            disabled={true}
                            onClick={() => agregarACarrito(product)}
                            className="btnTarjeta"
                        >
                            Cerrado momentaneamente
                        </button>

                        : (cantPedida+1 > cantidadDisponible) ? 
                            
                            <button
                                disabled={true}
                                onClick={() => agregarACarrito(product)}
                                className="btnTarjeta"
                            > No hay más productos disponibles
                            </button> :

                            <button
                                disabled={false}
                                onClick={() => agregarACarrito(product)}
                                className="btnTarjeta"
                                > Agregar al Carrito
                            </button>
                }
            </Card>
        </>
    )
}

export default Tarjeta