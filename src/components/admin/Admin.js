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
        </Routes>
      </div>
    </>


  )
}

export default Admin