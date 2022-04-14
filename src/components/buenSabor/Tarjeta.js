import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import camion from '../../assets/images/camion.png';

const Tarjeta = ({ product, agregarACarrito, close }) => {
    console.log(close);
    return (
        <>
            <Card style={{ width: '18rem' }} className="margenesTarjeta">
                <a href={`/detalle/${product.id}`}>
                    <Card.Img variant="top" className="maxAltoImg" alt="Instrumento" />
                </a>
                <Card.Body>
                    <Card.Title>{product.denominacion}</Card.Title>
                    <Card.Text>
                        ${product.precioVenta}
                    </Card.Text>
                    <Card.Text style={{ color: 'orange' }}>
                        {product.precioVenta === "G" ? <span><img src={camion} alt="camion" /> <span style={{ color: 'green' }}>"Envio gratis a todo el país"</span> </span> : `Costo de Envio interior de Argentina $ ${product.precioVenta}`}
                    </Card.Text>
                </Card.Body>
                {
                    close
                        ?
                        <Button
                            disabled={true}
                            //onClick={() => agregarACarrito(product.id, 1)}
                        >
                            Cerrado momentaneamente
                        </Button>


                        :
                        <Button
                            disabled={false}
                            //onClick={() => agregarACarrito(product.id, 1)}
                        >
                            Agregar al carrito
                        </Button>

                }
            </Card>
        </>
    )
}

export default Tarjeta