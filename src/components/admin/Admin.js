import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./admin.css"
import Home from './pages/home/Home';
import { Routes, Route } from "react-router-dom";
import UserList from './pages/user/UserList';
import User from './pages/user/User';
import NewUser from './pages/user/NewUser';
import ProductList from './pages/product/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/product/NewProduct';
import NewArticuloDetalle from './pages/articuloDetalle/NewArticuloDetalle';
import ArticuloDetalle from './pages/articuloDetalle/ArticuloDetalle';

const Admin = () => {
  return (
    <>
      <Topbar />

      <div className='containerAdmin'>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} /> 
          <Route path="/newProduct" element={<NewProduct />} />  
          <Route path="/articuloDetalle/:articuloId" element={<ArticuloDetalle />} />
          <Route path="/newArticuloDetalle" element={<NewArticuloDetalle />} />
          {/* <Route path="/newArtManufacturadoDetalle/:productId" element={<AgregarArticulo />} /> */}
        </Routes>
      </div>
    </>


  )
}

export default Admin