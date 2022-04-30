import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import camion from '../../assets/images/camion.png';

const Tarjeta = ({ product, agregarACarrito, close }) => {

    
    return (
        <>
            <Card style={{ width: '18rem' }} className="margenesTarjeta">
                <a href={`/detalle/${product.id}`}>
                    <Card.Img variant="top" src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${product.id}`} className="maxAltoImg" alt="Instrumento" />
                </a>
                <Card.Body>
                    <Card.Title>{product.denominacion}</Card.Title>
                    <Card.Text>
                        ${product.precioVenta}
                    </Card.Text>
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

                        :
                        <Button
                            disabled={false}
                            onClick={() => agregarACarrito(product)}
                        >
                            Agregar al carrito
                        </Button>
                        

                }
            </Card>
        </>
    )
}

export default Tarjeta