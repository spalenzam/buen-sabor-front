import React from 'react';
import "./topbar.css";
import { NotificationsNone, Settings } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  }
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>Buen Sabor</span>
        </div>
        <div className='topRight'>
        {/* <Link to="../avatar">
          <button className='btn'>
            <img src='https://w7.pngwing.com/pngs/363/698/png-transparent-avatar-female-others-purple-face-black-hair.png' alt='' className='topAvatar' />
          </button>
          </Link> */}
          <button
            className='btn-nav cs-admin'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topbar