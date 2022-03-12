import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

const BuenSaborScreen = () => {

  const dispatch = useDispatch();

  //Event listener del botón
  const handleLogout = () =>{
    dispatch( startLogout() );
  }


  return (
    <div className='buen-sabor__main-content'>
 
        <h1>Main content</h1>

        <h1>Este botón lo hice acá pero tenemos que ponerlo en el navBar</h1>

        <button 
          className='btn btn-primary'
          onClick={ handleLogout }
        >
          Logout
        </button>

    </div>
  )
}

export default BuenSaborScreen