import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./articuloDetalle.css";
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getRubroArticulo, getRubroArticuloById, updateRubroArticulo } from '../../../../actions/rubroarticulo';



const RubroArticulo = () => {

  const [rubroSeleccionado, setRubroSeleccionado] = useState({});

  const [rubroArtPadre, setRubroArtPadre] = useState([]);

  const { rubroArticuloId: id } = useParams();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    denominacion: '',
    idRubro: ''
  });

  const { denominacion, idRubro } = formValues;

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

    dispatch(updateRubroArticulo(id, denominacion, idRubro)).then(setRubroSeleccionado);


  }

  useEffect(() => {

    dispatch(getRubroArticuloById(id)).then((data) => {
      console.log(data);
      setRubroSeleccionado(data)
      setFormValues({
        ...data,
        denominacion: data?.denominacion,
        idRubro: data?.rubroarticuloPadre?.id,
      })
    })

    dispatch(getRubroArticulo()).then((data) => {
      setRubroArtPadre(data.filter(articulo => articulo.rubroarticuloPadre == null))
    });
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
              {
                rubroSeleccionado.rubroarticuloPadre != null &&
                <div className="userUpdateItem">
                  <label>Rubro Padre</label>
                  <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                    {rubroArtPadre.map((rubro, index) => (
                      <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                    ))}

                  </select>
                </div>
              }
            </div>
            <button type="submit" className="userUpdateButton">Actualizar</button>
            <Link to={"../rubroArticulo/"}>
              <button className="userUpdateButton">Volver</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RubroArticulo