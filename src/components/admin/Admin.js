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
import ArticuloList from './pages/articulo/ArticuloList';
import PedidoList from './pages/pedido/PedidoList';
import PedidoCajeroPagado from './pages/pedido/PedidoCajeroPagado';
import PedidoCajeroTerminado from './pages/pedido/PedidoCajeroTerminado';
import PedidoCocinero from './pages/pedido/PedidoCocinero';
import PedidoDelivery from './pages/pedido/PedidoDelivery';
import PedidoAdmin from './pages/pedido/PedidoAdmin';
import FacturaAdmin from './pages/factura/FacturaAdmin';

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
          <Route path="/articulo" element={<ArticuloList />} />
          <Route path="/pedidoPagado" element={<PedidoCajeroPagado />} />
          <Route path="/pedidoTerminado" element={<PedidoCajeroTerminado />} />
          <Route path="/pedidoCocinero" element={<PedidoCocinero />} />
          <Route path="/pedidoDelivery" element={<PedidoDelivery />} />
          <Route path="/pedidoAdmin" element={<PedidoAdmin />} />
          <Route path="/facturaAdmin" element={<FacturaAdmin />} />
        </Routes>
      </div>
    </>


  )
}

export default Admin