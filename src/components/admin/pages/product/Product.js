import React, { useEffect, useState } from 'react';
import "./product.css";
import { Publish } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getProductoById, getRubroGeneral, updateProducto, updateProductoConImagen } from '../../../../actions/productos';
import AgregarArticulo from './AgregarArticulo';

const Product = () => {
    const [producto, setProducto] = useState({});
    const [rubrosGeneral, setRubrosGeneral] = useState([]);
    // const [artManuDetalle, setArtManuDetalle] = useState([
    //     { cantidad: "one", unidadMedida: "two", idArticuloInsumo: "two", idArticuloManufacturado: "two" }
    // ]);

    const [keyImage, setKeyImage] = useState(0);

    const dispatch = useDispatch();

    const [nombreImagen, setNombreImagen] = useState();

    const { productId: id } = useParams();

    const [formValues, setFormValues] = useState({
        denominacion: '',
        precioVenta: '',
        tiempoEstimadoCocina: '',
        imagen: '',
        idRubro: '',
        denominacionRubro: '',
        fechaBaja: null
    });

    const { denominacion, precioVenta, tiempoEstimadoCocina, denominacionRubro, idRubro, imagen, fechaBaja } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.type == "file" ? target.files[0] : target.value
        })

        if(target.type == "file"){
            console.log(target.files[0]);
          setNombreImagen(target.files[0].name)
          }
    }

    const handleUpdateProducto = (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        if (imagen) {
            dispatch(updateProductoConImagen(id, denominacion, precioVenta, tiempoEstimadoCocina, idRubro, imagen)).then((data) => {
                setProducto(data);
                setKeyImage(keyImage + 1)
            });
        } else {
            dispatch(updateProducto(id, denominacion, precioVenta, tiempoEstimadoCocina, idRubro, imagen, fechaBaja)).then((data) => {
                setProducto(data);
            });
        }
    }

    useEffect(() => {
        dispatch(getProductoById(id)).then((data) => {
            setProducto(data)
            setFormValues({
                ...data,
                idRubro: data?.rubrogeneral?.id,
                denominacionRubro: data?.rubrogeneral?.denominacion,
                articulos: data?.articulomanufacturadodetalles
            })
        })

        dispatch(getRubroGeneral()).then(setRubrosGeneral);

    }, []);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Producto</h1>

            </div>

            <div className="productTop">
                <div className="productTopLeft">
                    {/* <Chart data={productData} dataKey="Sales" title="Sales Performance"/> */}
                    <div className="productInfoTop">
                        {
                            producto?.id ?
                                <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${producto?.id}?${keyImage}`} alt={producto?.denominacion} className="productInfoImg" />
                                :
                                <img alt={producto?.denominacion} className="productInfoImg" />
                        }
                        <span className="productName">{producto?.denominacion?.toUpperCase()}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{producto?.id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Activo:</span>
                            {
                                producto?.fechaBaja ?
                                    <span className="productInfoValue">No</span>
                                    :
                                    <span className="productInfoValue">Si</span>
                            }

                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Precio:</span>
                            <span className="productInfoValue">${producto?.precioVenta}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Tiempo Cocina:</span>
                            <span className="productInfoValue">{producto?.tiempoEstimadoCocina} minutos</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Rubro:</span>
                            <span className="productInfoValue">{producto?.rubrogeneral?.denominacion}</span>
                        </div>
                    </div>
                </div>
                <div className="productTopRight">
                    <span className="productName">INGREDIENTES</span>

                    <div className="productInfoItemArticulo">
                        <AgregarArticulo idProducto={id} />
                    </div>
                    <Link to="../newArticuloDetalle" state={{ producto }}>
                        {/* <Link to="../newArticuloDetalle"> */}
                        <button className="productAddButton">Agregar artículo</button>
                    </Link>

                </div>
            </div>

            <div className="productBottom">
                <form onSubmit={handleUpdateProducto} className="productForm">
                    <div className="productFormLeft">
                        <label>Nombre del producto</label>
                        <input
                            type="text"
                            placeholder={producto?.denominacion}
                            name='denominacion'
                            value={denominacion}
                            onChange={handleInputChange}
                        />
                        <label>Precio</label>
                        <input
                            type="text"
                            placeholder={'$' + " " + producto?.precioVenta}
                            name='precioVenta'
                            value={precioVenta}
                            onChange={handleInputChange}
                        />
                        <label>Tiempo estimado de cocina</label>
                        <input
                            type="text"
                            placeholder={producto?.tiempoEstimadoCocina}
                            name='tiempoEstimadoCocina'
                            value={tiempoEstimadoCocina}
                            onChange={handleInputChange}
                        />
                        <label>Rubro</label>
                        <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                            {rubrosGeneral.map((rubro, index) => (
                                <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                            ))}

                        </select>
                    </div>

                    <div className="productFormRight">
                        <div className="productUpload">
                            {
                                producto?.id ?
                                    <img src={`http://localhost:8090/api/buensabor/articulosmanufacturados/uploads/img/${producto?.id}?${keyImage}`} alt={producto?.denominacion} className="productUploadImg" />
                                    :
                                    <img alt={producto?.denominacion} className="productInfoImg" />
                            }
                            <label htmlFor="imagen">
                                <Publish />&nbsp;
                                <label>{nombreImagen}</label>
                            </label>
                            <input type="file" id="imagen" name='imagen' value={imagen?.files?.at(0).path || ""} style={{ display: "none" }} onChange={handleInputChange} />
                        </div>
                        <button type="submit " className="productButton">Actualizar</button>
                    </div>
                </form>

            </div>
            <Link to={"../product/"}>
                <button className="addProductButton">Volver</button>
            </Link>
        </div>
    )
}

export default Product