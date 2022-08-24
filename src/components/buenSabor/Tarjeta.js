import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './tarjeta.css';

const Tarjeta = ({ product, agregarACarrito, close, cantidadDisponible, cantPedida, bebidas }) => {

    return (
        <>
            <Card className="margenesTarjeta">
                <Link to={"/detallePlato/" + product.id}>
                    {product.rubroarticulo?.id === 3
                    ?
                        <div className="contImg">
                            <Card.Img variant="top" src={`http://localhost:8090/api/buensabor/articuloinsumo/uploads/img/${product.id}`} className="maxAltoImg" alt="producto" />
                        </div>
                    :
                        <div className="contImg">
                            <Card.Img variant="top" src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${product.id}`} className="maxAltoImg" alt="producto" />
                        </div>
                    }

                </Link>
                <Card.Body>
                    <Card.Title>{product.denominacion}</Card.Title>
                    {product.rubroarticulo?.id !== 3 
                    && 
                        <Link to={"/detallePlato/" + product.id}>
                            <button className="detalleTarjeta">Detalle del producto</button>
                        </Link>
                    }
                    
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

                        : (cantPedida + 1 > cantidadDisponible) ?

                            <button
                                disabled={true}
                                onClick={() => agregarACarrito(product)}
                                className="btnTarjetaDisabled"
                            > Fuera de stock
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