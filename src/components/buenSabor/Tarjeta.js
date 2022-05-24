import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Tarjeta = ({ product, agregarACarrito, close, cantidadDisponible, cantPedida }) => {
    
    return (
        <>
            <Card style={{ width: '18rem' }} className="margenesTarjeta">
                <a href={`/detalle/${product.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${product.id}`} className="maxAltoImg" alt="producto" />
                </a>
                <Card.Body>
                    <Card.Title>{product.denominacion}</Card.Title>
                    <Card.Text>
                        ${product.precioVenta}
                    </Card.Text>
                   {/* <Button>
                        <a href={`/detallePlato/${product.id}`}>Detalle del producto</a>
                    </Button> */}
                    <Link to={ "/detallePlato/" + product.id}>
                    <button>Detalle del producto</button>
                    </Link>

                    {/* <Card.Text style={{ color: 'orange' }}>
                        {product.costoEnvio === "G" ? <span><img src={camion} alt="camion" /> <span style={{ color: 'green' }}>"Envio gratis a todo el país"</span> </span> : `Costo de Envio interior de Argentina $ ${product.costoEnvio}`}
                    </Card.Text> */}
                    
                </Card.Body>
                {
                    close
                        ?
                        <Button
                            disabled={true}
                            onClick={() => agregarACarrito(product)}
                        >
                            Cerrado momentaneamente
                        </Button>

                        : (cantPedida+1 > cantidadDisponible) ? 
                            
                            <Button
                                disabled={true}
                                onClick={() => agregarACarrito(product)}
                            > No hay más productos disponibles
                            </Button> :

                            <Button
                                disabled={false}
                                onClick={() => agregarACarrito(product)}
                                > Agregar al Carrito
                            </Button>
                }
            </Card>
        </>
    )
}

export default Tarjeta