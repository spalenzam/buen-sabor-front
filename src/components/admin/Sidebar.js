import React from 'react';
import "./sidebar.css";
import { Link } from "react-router-dom";
import { FastfoodOutlined, StorefrontOutlined, ReceiptOutlined, ShoppingCartOutlined, PersonOutlineOutlined, AssessmentOutlined, AddShoppingCartOutlined } from "@material-ui/icons"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>

        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Cajero</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <ShoppingCartOutlined className='sidebarIcon' />
              Pedidos
            </li>
            <li className='sidebarListItem'>
              <ReceiptOutlined className='sidebarIcon' />
              Facturas
            </li>
          </ul>
        </div>

        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Cocinero</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <AddShoppingCartOutlined className='sidebarIcon' />
              Pedidos pendientes
            </li>
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
                Artículos Manufacturados
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