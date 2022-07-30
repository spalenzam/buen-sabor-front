import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import { Link, Navigate } from "react-router-dom";
import { FastfoodOutlined, StorefrontOutlined, ReceiptOutlined, ShoppingCartOutlined, PersonOutlineOutlined, AssessmentOutlined, AddShoppingCartOutlined } from "@material-ui/icons"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import { useDispatch, useSelector } from 'react-redux';
import { getUsuariobyMail } from '../../actions/usuarios';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { email } = useSelector(state => state.auth)

  const [rol, setRol] = useState('');

  useEffect(() => {

    dispatch(getUsuariobyMail(email)).then((data) => {
      console.log(data);
      setRol(data)
    })
  }, []);
console.log(rol);
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        {rol == "Cliente" && <Navigate to="/" />}
        {rol == "Cajero" || rol == "Admin" ?
          <div className='sidebarMenu'>
            <h3 className='sidebarTitle'>Cajero</h3>
            <ul className='sidebarList'>
              <Link to="pedidoPagado" className="link">
                <li className='sidebarListItem'>
                  <ShoppingCartOutlined className='sidebarIcon' />
                  Pedidos Pendientes
                </li>
              </Link>
              <Link to="pedidoTerminado" className="link">
                <li className='sidebarListItem'>
                  <ShoppingCartOutlined className='sidebarIcon' />
                  Pedidos Listos
                </li>
              </Link>
              <Link to="facturaAdmin" className="link">
                <li className='sidebarListItem'>
                  <ReceiptOutlined className='sidebarIcon' />
                  Facturas
                </li>
              </Link>
            </ul>
          </div> : ''
          }
        {rol == "Cocinero" || rol == "Admin" ?
          <div className='sidebarMenu'>
            <h3 className='sidebarTitle'>Cocinero</h3>
            <ul className='sidebarList'>
              <Link to="pedidoCocinero" className="link">
                <li className='sidebarListItem'>
                  <AddShoppingCartOutlined className='sidebarIcon' />
                  Pedidos pendientes
                </li>
              </Link>
              <Link to="product" className="link">
                <li className='sidebarListItem'>
                  <FastfoodOutlined className='sidebarIcon' />
                  Productos
                </li>
              </Link>
            </ul>
          </div>
          : ''
        }{rol == "Delivery" || rol == "Admin" ?
          <div className='sidebarMenu'>
            <h3 className='sidebarTitle'>Delivery</h3>
            <ul className='sidebarList'>
              <Link to="pedidoDelivery" className="link">
                <li className='sidebarListItem'>
                  <ShoppingCartOutlined className='sidebarIcon' />
                  Pedidos para entregar
                </li>
              </Link>
            </ul>
          </div>
        :''
        }{rol == "Admin" ?
          <div className='sidebarMenu'>
            <h3 className='sidebarTitle'>Administrador</h3>
            <ul className='sidebarList'>
              <Link to="articulo" className="link">
                <li className='sidebarListItem'>
                  <StorefrontOutlined className='sidebarIcon' />
                  Artículos
                </li>
              </Link>
              <Link to="product" className="link">
                <li className='sidebarListItem'>
                  <FastfoodOutlined className='sidebarIcon' />
                  Productos
                </li>
              </Link>
              <Link to="rubroArticulo" className="link">
                <li className='sidebarListItem'>
                  <LineWeightIcon className='sidebarIcon' />
                  Rubros Artículos
                </li>
              </Link>
              <Link to="rubroGeneral" className="link">
                <li className='sidebarListItem'>
                  <LineWeightIcon className='sidebarIcon' />
                  Rubros Productos
                </li>
              </Link>
              <Link to="pedidoAdmin" className="link">
                <li className='sidebarListItem'>
                  <ShoppingCartOutlined className='sidebarIcon' />
                  Pedidos
                </li>
              </Link>
              <Link to="facturaAdmin" className="link">
                <li className='sidebarListItem'>
                  <ReceiptOutlined className='sidebarIcon' />
                  Facturas
                </li>
              </Link>
              <Link to="reportes" className="link">
                <li className='sidebarListItem'>
                  <AssessmentOutlined className='sidebarIcon' />
                  Reportes
                </li>
              </Link>
              <Link to="user" className="link">
                <li className='sidebarListItem'>
                  <PersonOutlineOutlined className='sidebarIcon' />
                  Usuarios
                </li>
              </Link>
            </ul>
          </div>
          : ''
        }
      </div>
    </div>
  )
}

export default Sidebar