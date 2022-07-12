import React, { useState } from 'react';
import "./newUser.css";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveRubro } from '../../../../actions/rubrogeneral';

const NewRubroGeneral = () => {

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

  const handleCreate = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();
    dispatch(saveRubro(denominacion))
    

    Swal.fire({
      title: 'Rubro creado con éxito',
      icon: 'success',
      html:
        'Volver a  ' +
        '<a href="../admin/rubroGeneral">Rubros</a> ',
    })

  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Rubro</h1>

      <form onSubmit={handleCreate} className="newUserForm">

        <div className="newUserItem">
          <label>Nombre de Rubro</label>
          <input
            type="text"
            placeholder="Pizza"
            name='denominacion'
            value={denominacion}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="newUserButton">Crear</button>
      </form>

      <Link to={"../rubroGeneral/"}>
        <button className="addProductButton">Volver</button>
      </Link>
    </div>
  )
}

export default NewRubroGeneral