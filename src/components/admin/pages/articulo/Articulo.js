import React, { useEffect, useState } from 'react';
import "./product.css";
import { Publish } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getRubroGeneral } from '../../../../actions/productos';
import { getArticuloById, getRubroArticulo, updateArticulo, updateInsumoConImagen } from '../../../../actions/articulos';

const Articulo = () => {
    
    const [articuloSeleccionado, setArticuloSeleccionado] = useState({});

    const [rubroArticulo, setRubroArticulo] = useState([]);

    const { articuloId: id } = useParams();

    const [keyImg, setKeyImg] = useState(0);

    const dispatch = useDispatch();

    const [nombreImagen, setNombreImagen] = useState();

    const [formValues, setFormValues] = useState({
        denominacion: '',
        esInsumo: '',
        precioCompra: '',
        precioVenta: '',
        stockActual: '',
        stockMinimo: '',
        unidadMedida: '',
        cantidad: '',
        idRubro: '',
        imagen: ''
    });

    const { denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro, imagen } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.type === "file" ? target.files[0] : target.value
        })

        if (target.type === "file") {
            console.log(target.files[0]);
            setNombreImagen(target.files[0].name)
        }
    }

    const handleUpdateArticulo = (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        if (imagen) {
            dispatch(updateInsumoConImagen(id, denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro, imagen)).then((data) => {
                setArticuloSeleccionado(data);
                setKeyImg(keyImg + 1)
            });
        } else {
            dispatch(updateArticulo(id, denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, idRubro)).then((data) => {
                setArticuloSeleccionado(data);
            });
        }
    }

    useEffect(() => {
        dispatch(getArticuloById(id)).then((data) => {
            setArticuloSeleccionado(data)
            setFormValues({
                ...data,
                idRubro: data?.rubroarticulo?.id,
            })
        })

        dispatch(getRubroArticulo()).then(setRubroArticulo);
    }, []);
console.log("articuloSeleccionado",articuloSeleccionado)
console.log("rubroArticulo",rubroArticulo)
    return (
        <div className="product">
            <div className="productBottom">
                <form onSubmit={handleUpdateArticulo} className="productForm">
                    <div className="productFormLeft">
                        <label>Nombre del artículo</label>
                        <input
                            type="text"
                            placeholder={articuloSeleccionado?.denominacion}
                            name='denominacion'
                            value={denominacion}
                            onChange={handleInputChange}
                        />
                        <label>Precio Compra</label>
                        <input
                            type="text"
                            placeholder={'$' + " " + articuloSeleccionado?.precioCompra}
                            name='precioCompra'
                            value={precioCompra}
                            onChange={handleInputChange}
                        />
                        <label>Precio Venta</label>
                        <input
                            type="text"
                            placeholder={'$' + " " + articuloSeleccionado?.precioVenta}
                            name='precioVenta'
                            value={precioVenta}
                            onChange={handleInputChange}
                        />

                        <label>Es insumo</label>
                        <select name="esInsumo" value={esInsumo} onChange={handleInputChange}>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>

                    </div>

                    <div className="productFormLeft">
                        <label>Stock</label>
                        <input
                            type="text"
                            placeholder={articuloSeleccionado?.stockActual}
                            name='stockActual'
                            value={stockActual}
                            onChange={handleInputChange}
                        />
                        <label>Stock Mínimo</label>
                        <input
                            type="text"
                            placeholder={articuloSeleccionado?.stockMinimo}
                            name='stockMinimo'
                            value={stockMinimo}
                            onChange={handleInputChange}
                        />
                        <label>Unidad de Medida</label>
                        <select name="unidadMedida" value={unidadMedida} onChange={handleInputChange}>
                            {/* <option value="gr">gr</option> */}
                            <option value="Kg">Kg</option>
                            <option value="l">Litro</option>
                            <option value="Unidad">Unidad</option>
                            {/* <option value="ml">ml</option> */}
                        </select>

                        <label>Rubro</label>
                        <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                            {rubroArticulo.map((rubro, index) => (
                                rubro.rubroarticuloPadre == null
                                &&  <option key={index} value={rubro.id}>
                                    {articuloSeleccionado?.rubroarticulo?.id === 3
                                    ? articuloSeleccionado?.rubroarticulo?.denominacion
                                    :articuloSeleccionado?.rubroarticulo?.rubroarticuloPadre?.denominacion
                                    }
                                    </option>
                            ))}

                        </select>
                    </div>

                    {articuloSeleccionado?.rubroarticulo?.id === 3
                        &&
                        <div className="productFormRight">
                            <div className="productUpload">
                                {
                                    articuloSeleccionado?.id ?
                                        <img src={`http://localhost:8090/api/buensabor/articuloinsumo/uploads/img/${articuloSeleccionado?.id}?${keyImg}`} alt={articuloSeleccionado?.denominacion} className="productUploadImg" />
                                        :
                                        <img alt={articuloSeleccionado?.denominacion} className="productInfoImg" />
                                }
                                <label htmlFor="imagen">
                                    <Publish />&nbsp;
                                    <label>{nombreImagen}</label>
                                </label>
                                <input type="file" id="imagen" name='imagen' value={imagen?.files?.at(0).path || ""} style={{ display: "none" }} onChange={handleInputChange} />
                            </div>
                        </div>
                    }
                    <button type="submit " className="productButton">Actualizar</button>
                </form>

            </div>

            <Link to={"../articulo/"}>
                <button className="addProductButton">Volver</button>
            </Link>
        </div>
    )
}

export default Articulo