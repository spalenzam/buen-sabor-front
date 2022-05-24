import React, { useEffect, useState } from 'react';
import "./product.css";
import { Publish } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import { getProductoById } from '../../../../actions/productos';

const Product = () => {
    const [producto, setProducto] = useState({});

    const dispatch = useDispatch();

    const { productId: id } = useParams();

    console.log(producto);

    const [formValues, setFormValues] = useState({
        denominacion: '',
        precioVenta: '',
        tiempoEstimadoCocina: '',
        denominacionRubro: '',

    });

    const { denominacion, precioVenta, tiempoEstimadoCocina, denominacionRubro } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleUpdateProducto = (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        //dispatch(updateProducto(id, denominacion, precioVenta, tiempoEstimadoCocina)).then(setProducto);
    }

    useEffect(() => {

        dispatch(getProductoById(id)).then((data) => {
            console.log(data);
            setProducto(data)
            setFormValues({
                ...data,
                denominacionRubro: data.rubrogeneral?.denominacion
            })
        })
    }, []);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Producto</h1>
                <Link to="../newproduct">
                    <button className="productAddButton">Crear producto</button>
                </Link>
            </div>

            <div className="productTop">
                <div className="productTopLeft">
                    {/* <Chart data={productData} dataKey="Sales" title="Sales Performance"/> */}
                    <div className="productInfoTop">
                        <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${producto.id}`} alt={producto.denominacion} className="productInfoImg" />
                        <span className="productName">{producto.denominacion?.toUpperCase()}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{producto.id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Activo:</span>
                            {
                                producto.fechaBaja ?
                                    <span className="productInfoValue">No</span>
                                    :
                                    <span className="productInfoValue">Si</span>
                            }

                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Precio:</span>
                            <span className="productInfoValue">${producto.precioVenta}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Tiempo Cocina:</span>
                            <span className="productInfoValue">{producto.tiempoEstimadoCocina} minutos</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Rubro:</span>
                            <span className="productInfoValue">{producto.rubrogeneral?.denominacion}</span>
                        </div>
                    </div>
                </div>
                <div className="productTopRight">
                    <span className="productInfoKey">INGREDIENTES</span>
                    <br/>
                    {producto.articulomanufacturadodetalles?.map((prod, index) => (
                        <div key={index}>
                            <div className="productInfoItem">
                                <span className="productInfoValue">{prod.articuloinsumo?.denominacion + " " + prod.cantidad + " " + prod.unidadMedida}</span>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="productBottom">
                <form onSubmit={handleUpdateProducto} className="productForm">
                    <div className="productFormLeft">
                        <label>Nombre del producto</label>
                        <input 
                        type="text" 
                        placeholder={producto.denominacion}
                        />
                        <label>Precio</label>
                        <input 
                        type="text" 
                        placeholder={'$' + " " + producto.precioVenta}
                        />
                        <label>Tiempo estimado de cocina</label>
                        <input 
                        type="text" 
                        placeholder={producto.tiempoEstimadoCocina}
                        />

                        <label>Rubro</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Pizza</option>
                            <option value="no">Hamburguesa</option>
                        </select>
                        {/* <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>  */}
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product