import React from 'react';
import "./newUser.css";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../../../actions/ui';
import { guardarUsuario } from '../../../../actions/usuarios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegisterWithEmailPasswordNameEmpleado } from '../../../../actions/auth';

const NewUser = () => {

  const dispatch = useDispatch();

  const { msgError } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: '',
    clave: '',
    clave2: '',
    rol: '',

  });

  const { email, clave, clave2, rol } = formValues;

  const handleCreate = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();

    if (isFormValid()) {
      dispatch(guardarUsuario(email, clave, rol));
      dispatch(startRegisterWithEmailPasswordNameEmpleado(rol, rol, email, clave));
      
    }

    Swal.fire({
      title: 'Empleado creado con éxito',
      icon: 'success',
      html:
        'Volver a  ' +
        '<a href="../admin/user">Usuarios</a> ',
    })

  }

  const isFormValid = () => {

    if (!validator.isEmail(email)) {
      dispatch(setError('El mail no es válido'))
      return false;

    } else if (clave !== clave2 || clave.length < 5) {
      dispatch(setError('Las contraseñas no coinciden'))
      return false;

    }

    dispatch(removeError())
    return true;

  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Nuevo Empleado</h1>

      <form onSubmit={handleCreate} className="newUserForm">
        {
          msgError &&
          <div className='auth__alert-error'>
            {msgError}
          </div>
        }
        <div className="newUserItem">
          <label>Nombre de usuario</label>
          <input
            type="email"
            placeholder="janeDoe@gmail.com"
            name='email'
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="newUserItem">
          <label>Rol</label>
          <select name='rol' value={rol} onChange={handleInputChange} className="newUserGender">
            <option value="">Seleccione una opción</option>
            <option value="Cajero">Cajero</option>
            <option value="Cocinero">Cocinero</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        {/* <div className="newUserItem">
          <label>Rol</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="cajero"
              value={cajero}
              onChange={handleInputChange}
            />
            <label htmlFor="cajero">Cajero</label>
            <input
              type="radio"
              name="cocinero"
              value={cocinero}
              onChange={handleInputChange}
            />
            <label htmlFor="cocinero">Cocinero</label>
            <input
              type="radio"
              name="delivery"
              value={delivery}
              onChange={handleInputChange}
            />
            <label htmlFor="delivery">Delivery</label>
          </div>
        </div> */}
        <div className="newUserItem">
          <label>Clave</label>
          <input
            type="password"
            placeholder="Clave"
            name='clave'
            value={clave}
            onChange={handleInputChange}
          />
        </div>
        <div className="newUserItem">
          <label>Confirmar clave</label>
          <input
            type="password"
            placeholder="Confirmar clave"
            name='clave2'
            value={clave2}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button type="submit" className="newUserButton">Crear</button>
      </form>

      <Link to={"../user/"}>
        <button className="addProductButton">Volver</button>
      </Link>
    </div>
  )
}

export default NewUser