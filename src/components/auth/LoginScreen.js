import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'

const LoginScreen = () => {

  //Acá tenemos que crear el dispatch para poder enviar la action al reducer y que me devuelva lo que necesito 
  const dispatch = useDispatch();

  //este vendría siendo mi objeto, desestructuro el formValues y el handleInputChange, el reset por ahora no
  const [ formValues, handleInputChange ] = useForm({

    email: 'spalenzam@gmail.com',
    password: '123'
  });

  //Acá desestructuro del formValues el mail y la pass para ocuparlo en cualquier parte del componente 
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    //Acá llamo a la función dispatch y le envio mi action llamada login( le pasamos el uid y el displayName ), para que el reducer haga lo que tiene que hacer
    dispatch( login(123, 'Macarena') );
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={ handleLogin }>

        <input
          type="text"
          placeholder='Email'
          //ESTO ES IMPORTANTE PORQUE LO OCUPA EL USEFORM
          name='email'
          className='auth__input'
          autoComplete='off'
          value={ email }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder='Password'
          name='password'
          className='auth__input'
          value={ password }
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className='btn btn-primary btn-block'
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>

          <div
            className="google-btn"
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link 
          to="/auth/register"
          className='link'
        >
          Create new account
        </Link>

      </form>
    </>
  )
}

export default LoginScreen