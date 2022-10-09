import React from 'react'; 
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const DetallePlato = ({productos})=>{

    const { id } = useParams();
    let producto = productos.filter((producto) => producto.articuloManufacturado.id == id);
     console.log(id)
     console.log(producto)
    const ingredientes = producto[0].articuloManufacturado.articulomanufacturadodetalles;
    return (
        <div class= "buen-sabor__main-content">
            
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="titulo-inicio">Detalle de Producto</h2>
                        <div className="boxDetalle">
                            <div className="boxDetalle1">
                                <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${producto[0].articuloManufacturado.id}`} alt={producto[0].articuloManufacturado.denominacion} /> 
                            </div>
                            <div className="boxDetalle2">
                                <h2>{producto[0].articuloManufacturado.denominacion}</h2>
                                <h3>{"$ " + producto[0].articuloManufacturado.precioVenta}</h3>
                                <h3>Ingredientes:</h3>
                                <ul>
                                {ingredientes.map(element => 
                               <li>{element.articuloinsumo.denominacion}</li>
                              )}
                                </ul>
                                <Link to={"/productos"}>
                                    <button className="btnVolver">Volver</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}


export default DetallePlato