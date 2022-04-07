import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator';
import { setError, removeError } from '../../actions/ui'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

const LoginScreen = () => {

  //Acá tenemos que crear el dispatch para poder enviar la action al reducer y que me devuelva lo que necesito 
  const dispatch = useDispatch();

  //Para obtener cosas del state vamos a usar el useSelector que recibe un callback -> useSelector "()"
  const { loading } = useSelector( state => state.ui )

  //este vendría siendo mi objeto, desestructuro el formValues y el handleInputChange, el reset por ahora no
  const [ formValues, handleInputChange ] = useForm({
      email: '',
      password: ''
  });

  //Acá desestructuro del formValues el mail y la pass
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    
    //Acá llamo a la función dispatch y le envio mi action llamada login( le pasamos el uid y el displayName ), para que el reducer haga lo que tiene que hacer
    //dispatch( login(123, 'Macarena') );
    //En vez de hacer lo anterior vamos a llamar a otra función que es la que interiormente usa la función de login
    if (isFormValid()) {
      dispatch( startLoginEmailPassword( email, password) )
    }
  
  }

  const isFormValid = () => {

    if (!validator.isEmail(email)) {
      dispatch( setError ( 'El mail no es válido' ) )
      return false;

    } else if ( password.length < 5) {
      dispatch( setError ( 'Las contraseñas no coinciden' ) )
      return false;

    } 
      
    dispatch( removeError () )
    return true;
    
  }

  //Esto es para loguearme con google
  const handleGoogleLogin = () =>{
    dispatch( startGoogleLogin() );
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={ handleLogin }>

        {/* {
          msgError &&
          <div className='auth__alert-error'>
            { msgError }
          </div>
        } */}

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
          disabled={ loading }
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>

          <div
            className="google-btn"
            onClick={ handleGoogleLogin }
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