import React, { useEffect, useState } from 'react';
import "./product.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getRubroGeneral } from '../../../../actions/productos';
import { getArticuloById, getRubroArticulo, updateArticulo } from '../../../../actions/articulos';

const Articulo = () => {

    const [articuloSeleccionado, setArticuloSeleccionado] = useState({});

    const [rubroArticulo, setRubroArticulo] = useState([]);

    const { articuloId: id } = useParams();

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        denominacion: '',
        esInsumo: '',
        precioCompra: '',
        precioVenta: '',
        stockActual: '',
        stockMinimo: '',
        unidadMedida: '',
        cantidad: '',
        idRubro: ''
    });

    const { denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, cantidad, idRubro } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleUpdateArticulo = (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        dispatch(updateArticulo(id, denominacion, esInsumo, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, cantidad, idRubro)).then(setArticuloSeleccionado);


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
                            <option value="gr">gr</option>
                            <option value="kg">kg</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                        </select>

                        <label>Rubro</label>
                        <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                            {rubroArticulo.map((rubro, index) => (
                                <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                            ))}

                        </select>

                    </div>
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