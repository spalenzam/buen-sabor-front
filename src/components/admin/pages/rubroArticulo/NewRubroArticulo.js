import React, { useEffect, useState } from 'react';
import "./newUser.css";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRubroArticulo, saveRubroArticulo } from '../../../../actions/rubroarticulo';

const NewRubroArticulo = () => {

  const dispatch = useDispatch();

  const [rubroArtPadre, setRubroArtPadre] = useState([]);

  const [formValues, setFormValues] = useState({
    denominacion: '',
    idRubro: null
  });

  const { denominacion, idRubro } = formValues;

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
    dispatch(saveRubroArticulo(denominacion, idRubro))
    

    Swal.fire({
      title: 'Rubro creado con éxito',
      icon: 'success',
      html:
        'Volver a  ' +
        '<a href="../admin/rubroArticulo">Rubros Artículo</a> ',
    })

  }

  useEffect(() => {

    dispatch(getRubroArticulo()).then((data) => {
      setRubroArtPadre(data.filter(articulo => articulo.rubroarticuloPadre == null))
    });
  }, []);

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Rubro Artículo</h1>

      <form onSubmit={handleCreate} className="newUserForm">

        <div className="newUserItem">
          <label>Nombre de rubro</label>
          <input
            type="text"
            placeholder="Verdura"
            name='denominacion'
            value={denominacion}
            onChange={handleInputChange}
          />
        </div>
        <div className="newUserItem">
                  <label>Rubro Padre</label>
                  <select name="idRubro" value={idRubro} id="rubro" onChange={handleInputChange}>
                  <option value="">Selecione una opción</option>
                    {rubroArtPadre.map((rubro, index) => (
                      <option key={index} value={rubro.id}>{rubro.denominacion}</option>
                    ))}

                  </select>
                  <label>*Si es padre no seleccione ninguna opción</label>
                </div>
        <button type="submit" className="newUserButton">Crear</button>
      </form>

      <Link to={"../rubroArticulo/"}>
        <button className="addProductButton">Volver</button>
      </Link>
    </div>
  )
}

export default NewRubroArticulo