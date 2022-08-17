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
import PedidoCajeroPagado from './pages/pedido/PedidoCajeroPagado';
import PedidoCajeroTerminado from './pages/pedido/PedidoCajeroTerminado';
import PedidoCocinero from './pages/pedido/PedidoCocinero';
import PedidoDelivery from './pages/pedido/PedidoDelivery';
import PedidoAdmin from './pages/pedido/PedidoAdmin';
import FacturaAdmin from './pages/factura/FacturaAdmin';
import Articulo from './pages/articulo/Articulo';
import NewArticulo from './pages/articulo/NewArticulo';
import RubroGeneralList from './pages/rubroGeneral/RubroGeneralList';
import RubroGeneral from './pages/rubroGeneral/RubroGeneral';
import NewRubroGeneral from './pages/rubroGeneral/NewRubroGeneral';
import RubroArticuloList from './pages/rubroArticulo/RubroArticuloList';
import RubroArticulo from './pages/rubroArticulo/RubroArticulo';
import NewRubroArticulo from './pages/rubroArticulo/NewRubroArticulo';
import Reportes from './pages/reportes/Reportes';
import ReportesIndividual from './pages/reportes/ReportesIndividual';
import Avatar from './pages/avatar/Avatar';

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
          <Route path="/articulo/:articuloId" element={<Articulo />} />
          <Route path="/newarticulo" element={<NewArticulo />} />
          <Route path="/pedidoPagado" element={<PedidoCajeroPagado />} />
          <Route path="/pedidoTerminado" element={<PedidoCajeroTerminado />} />
          <Route path="/pedidoCocinero" element={<PedidoCocinero />} />
          <Route path="/pedidoDelivery" element={<PedidoDelivery />} />
          <Route path="/pedidoAdmin" element={<PedidoAdmin />} />
          <Route path="/facturaAdmin" element={<FacturaAdmin />} />
          <Route path="/rubroGeneral" element={<RubroGeneralList />} />
          <Route path="/rubroGeneral/:rubroGeneralId" element={<RubroGeneral />} />
          <Route path="/newRubroGeneral" element={<NewRubroGeneral />} />
          <Route path="/rubroArticulo" element={<RubroArticuloList />} />
          <Route path="/rubroArticulo/:rubroArticuloId" element={<RubroArticulo />} />
          <Route path="/newRubroArticulo" element={<NewRubroArticulo />} />
          <Route path="/reportes" element={<Reportes/>} />
          <Route path="/reportesIndividual" element={<ReportesIndividual/>} />
        </Routes>
      </div>
    </>


  )
}

export default Admin