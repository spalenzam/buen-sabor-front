import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui'
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {

  //Acá tenemos que crear el dispatch para poder enviar la action al reducer y que me devuelva lo que necesito 
  const dispatch = useDispatch();

  //Para obtener cosas del state vamos a usar el useSelector que recibe un callback -> useSelector "()"
  const { msgError } = useSelector( state => state.ui )

  //Pasos para hacer un form 
  //1) hacer el usoForm con el objeto que necesito obtener
  //este vendría siendo mi objeto, desestructuro el formValues y el handleInputChange, el reset por ahora no
  const [formValues, handleInputChange] = useForm({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    telefono: '',
    numeroCalle: '',
    calle: '',
    localidad: ''
  });

  //2) Desestructurar los datos del objeto
  //Acá desestructuro del formValues 
  const { name, lastname, email, password, password2, telefono, numeroCalle, calle, localidad } = formValues;

  //3)
  //los nombre de los atributos del formValue tienen que coincidir con el name de los input del formulario
  //tenemos que agregar el value={con su nombre correspondiente} a cada input
  //y tmb agregar el onChange a cada input

  //4)crear la función que va a capturar el evento cada vez que cambie
  //Tenemos que ponerla dentro del onSubmit del form
  const handleRegister = (e) => {
    //para que no haga la propagación del formulario
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(name, lastname, email, password, telefono, numeroCalle, calle, localidad));
    }

  }

  //5)podemos hacer el quinto paso que es para validar las cosas del formulario
  const isFormValid = () => {

    if (name.trim().length === 0) {
      dispatch( setError ( 'El nombre es requerido' ) )
      return false;

    } else if (!validator.isEmail(email)) {
      dispatch( setError ( 'El mail no es válido' ) )
      return false;

    } else if (password !== password2 || password.length < 5) {
      dispatch( setError ( 'Las contraseñas no coinciden' ) )
      return false;

    } 
      
    dispatch( removeError () )
    return true;
    
    
  }

  return (
    <>
      <h3 className='auth__title'>Register</h3>

      <form onSubmit={handleRegister}>

        {
          msgError &&
          <div className='auth__alert-error'>
            { msgError }
          </div>
        }

        <input
          type="text"
          placeholder='Name'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder='Lastname'
          name='lastname'
          className='auth__input'
          autoComplete='off'
          value={lastname}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder='Confirm Password'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />

        <input
          type="telefono"
          placeholder='Teléfono'
          name='telefono'
          className='auth__input'
          value={telefono}
          onChange={handleInputChange}
        />

        <input
          type="numeroCalle"
          placeholder='Número Calle'
          name='numeroCalle'
          className='auth__input'
          value={numeroCalle}
          onChange={handleInputChange}
        />

        <input
          type="calle"
          placeholder='Nombre calle'
          name='calle'
          className='auth__input'
          value={calle}
          onChange={handleInputChange}
        />

        <input
          type="localidad"
          placeholder='Localidad'
          name='localidad'
          className='auth__input'
          value={localidad}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className='btn btn-primary btn-block mb-5'
        >
          Register
        </button>

        <Link
          to="/auth/login"
          className='link'
        >
          Already registered?
        </Link>

      </form>
    </>
  )
}

export default RegisterScreen