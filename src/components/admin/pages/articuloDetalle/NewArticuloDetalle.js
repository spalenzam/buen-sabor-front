import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./articuloDetalle.css";
import { useParams } from 'react-router';
import { removeError, setError } from '../../../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { guardarArticuloDetalle } from '../../../../actions/productos';
import { getArticuloInsumo } from '../../../../actions/articulos';
import { useLocation } from 'react-router-dom'

const NewArticuloDetalle = () => {

  const location = useLocation()

  const { producto = 'defaultValue' } = location.state || {};

  const { msgError } = useSelector(state => state.ui)

  console.log(producto);

  const [articulos, setArticulos] = useState([]);

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    idArticulo: null,
    unidadMedida: '',
    cantidad: ''
  });

  const { unidadMedida, cantidad, idArticulo } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleCreate = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();
    console.log(unidadMedida, cantidad, idArticulo, producto);
    if (isFormValid()) {
      dispatch(guardarArticuloDetalle(producto, idArticulo, unidadMedida, cantidad, articulos));
    }

  }

  const isFormValid = () => {

    if (cantidad == 0.0 || cantidad < 0.0 || cantidad == '') {
      dispatch(setError('La cantidad ingresada debe ser mayor a 0'))
      return false;
    } else if (idArticulo == '' || idArticulo == null) {
      dispatch(setError('Seleccione un articulo válido por favor'))
      return false;

    }

    dispatch(removeError())
    return true;
  }

  useEffect(() => {
    dispatch(getArticuloInsumo()).then(setArticulos);
  }, []);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo detalle</h1>
      <form onSubmit={handleCreate} className="addProductForm">
        {
          msgError &&
          <div className='auth__alert-error'>
            {msgError}
          </div>
        }
        <div className="addProductItem">
          <label>Nombre articulo</label>
          <select name="idArticulo" value={idArticulo} placeholder="Articulo" onChange={handleInputChange}>
            <option value="">Select option</option>
            {articulos.map((art, index) => (
              <option key={index} value={art.id}>{art.denominacion}</option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Cantidad</label>
          <input
            type="text"
            placeholder="3"
            name='cantidad'
            value={cantidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="addProductItem">
          <label>Unidad de medida</label>
          <select name="unidadMedida" value={unidadMedida} onChange={handleInputChange}>
            <option>Seleccione una opción</option>
            <option value="gr">gr</option>
            <option value="kg">kg</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
          </select>
        </div>
        <button className="addProductButton">Crear</button>
      </form>
      <Link to={"../product/"+producto.id}>
        <button className="addProductButton">Volver</button>
      </Link>
    </div>
  )
}

export default NewArticuloDetalle