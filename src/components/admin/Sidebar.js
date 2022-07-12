import React from 'react';
import "./sidebar.css";
import { Link } from "react-router-dom";
import { FastfoodOutlined, StorefrontOutlined, ReceiptOutlined, ShoppingCartOutlined, PersonOutlineOutlined, AssessmentOutlined, AddShoppingCartOutlined } from "@material-ui/icons"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LineWeightIcon from '@mui/icons-material/LineWeight';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>

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
        </div>

        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Cocinero</h3>
          <ul className='sidebarList'>
            <Link to="pedidoCocinero" className="link">
              <li className='sidebarListItem'>
                <AddShoppingCartOutlined className='sidebarIcon' />
                Pedidos pendientes
              </li>
            </Link>
          </ul>
        </div>

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
            <li className='sidebarListItem'>
              <AssessmentOutlined className='sidebarIcon' />
              Reportes
            </li>
            <Link to="user" className="link">
              <li className='sidebarListItem'>
                <PersonOutlineOutlined className='sidebarIcon' />
                Usuarios
              </li>
            </Link>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Sidebar