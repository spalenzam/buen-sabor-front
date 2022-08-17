import { PersonOutlineOutlined, ReceiptOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.css";

const SidebarAvatar = ({usuario}) => {
  return (
    <div className='sidebar'>
                <div className='sidebarWrapper'>

                    <div className='sidebarMenu'>
                        <h3 className='sidebarTitle'>Administrador</h3>
                        <ul className='sidebarList'>
                            <Link to="usuario" className="link">
                                <li className='sidebarListItem'>
                                <PersonOutlineOutlined className='sidebarIcon' />
                                    Perfil
                                </li>
                            </Link>
                            <Link to="pedidos" state={{ usuario }} className="link">
                                <li className='sidebarListItem'>
                                    <ShoppingCartOutlined className='sidebarIcon' />
                                    Pedidos
                                </li>
                            </Link>
                            <Link to="facturas" state={{ usuario }} className="link">
                                <li className='sidebarListItem'>
                                    <ReceiptOutlined className='sidebarIcon' />
                                    Facturas
                                </li>
                            </Link>
                        </ul>
                    </div>

                </div>
            </div>
  )
}

export default SidebarAvatar