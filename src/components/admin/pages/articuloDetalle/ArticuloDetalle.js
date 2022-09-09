import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./articuloDetalle.css";
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getArtManuDetalleById, updateArticuloDetalle } from '../../../../actions/productos';

const ArticuloDetalle = () => {

    const [artDetalleSeleccionado, setArtDetalleSeleccionado] = useState({});

    const { articuloId: id } = useParams();

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        denominacionArticulo: '',
        unidadMedida: '',
        cantidad: ''
    });

    const { denominacionArticulo, unidadMedida, cantidad } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleUpdateArticuloDetalle = (e) => {
        //para que no haga la propagación del formulario
        e.preventDefault();

        dispatch(updateArticuloDetalle(id, denominacionArticulo, unidadMedida, cantidad)).then(setArtDetalleSeleccionado);


    }

    useEffect(() => {

        dispatch(getArtManuDetalleById(id)).then((data) => {
            console.log(data);
            setArtDetalleSeleccionado(data)
            setFormValues({
                ...data,
                denominacionArticulo: data.articuloinsumo.denominacion
            })
        })
    }, []);

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit Articulo Detalle</h1>
                {/* <Link to="/newArticuloDetalle">
                    <button className="userAddButton">Crear Articulo Detalle</button>
                </Link> */}
            </div>
            <div className="userContainer">
                <div className="userUpdate">
                    <span className="userUpdateTitle">Editar</span>
                    <form onSubmit={handleUpdateArticuloDetalle} className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Nombre Articulo</label>
                                <input
                                    type="text"
                                    placeholder={artDetalleSeleccionado?.articuloinsumo?.denominacion}
                                    name='denominacionArticulo'
                                    className="userUpdateInput"
                                    value={denominacionArticulo}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Cantidad</label>
                                <input
                                    type="text"
                                    placeholder={artDetalleSeleccionado?.cantidad}
                                    name='cantidad'
                                    className="userUpdateInput"
                                    value={cantidad}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Unidad de Medida</label>
                                <select name="unidadMedida" value={unidadMedida} onChange={handleInputChange}>
                                    <option value="gr">gr</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="ml">ml</option>
                                </select>
                            </div>
                            
                            
                        </div>
                        <button type="submit" className="userUpdateButton">Actualizar</button>
                        <Link to={"../product/" + artDetalleSeleccionado?.articulomanufacturado?.id}>
                                <button className="userUpdateButton">Volver</button>
                            </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ArticuloDetalle