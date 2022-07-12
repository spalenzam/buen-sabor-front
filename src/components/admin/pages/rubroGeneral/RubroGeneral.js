import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./articuloDetalle.css";
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getRubroGeneralById, updateRubroGeneral } from '../../../../actions/rubrogeneral';

const RubroGeneral = () => {

  const [rubroSeleccionado, setRubroSeleccionado] = useState({});

  const { rubroGeneralId: id } = useParams();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    denominacion: '',
  });

  const { denominacion } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      //Todos los valores que tiene actualmente el formValues, pero cambio el que recibo en el evento (con la segunda línea)
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleUpdateRubro = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();

    dispatch(updateRubroGeneral(id, denominacion)).then(setRubroSeleccionado);


  }

  useEffect(() => {

    dispatch(getRubroGeneralById(id)).then((data) => {
      console.log(data);
      setRubroSeleccionado(data)
      setFormValues({
        ...data,
        denominacion: data?.denominacion,
    })
    })
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Rubro</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form onSubmit={handleUpdateRubro} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nombre Rubro</label>
                <input
                  type="text"
                  placeholder={rubroSeleccionado?.denominacion}
                  name='denominacion'
                  value={denominacion}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="userUpdateButton">Actualizar</button>
            <Link to={"../rubroGeneral/"}>
              <button className="userUpdateButton">Volver</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RubroGeneral