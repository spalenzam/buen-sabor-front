import React from 'react';
import "./topbar.css";
import { NotificationsNone, Settings } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

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
          {/* <div className='topbarIconContainer'>
              <NotificationsNone/>
              <span className='topIconBadge'>2</span>
            </div>
            <div className='topbarIconContainer'>
              <Settings/>
              <span className='topIconBadge'>2</span>
            </div> */}
          <img src='https://w7.pngwing.com/pngs/363/698/png-transparent-avatar-female-others-purple-face-black-hair.png' alt='' className='topAvatar' />
          <button
            className='btn-nav'
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