import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';
import NavBar from '../components/buenSabor/NavBar';
import Productos from '../components/buenSabor/Productos';
import Carrito from '../components/carrito/Carrito';
import instrumentos from '../datos/instrumentos.json';
import { useDispatch , useSelector} from 'react-redux'
import { getProductos, productosActivos } from '../actions/productos';

const DashBoardRoutes = () => {

    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    
    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState({})

    const dispatch = useDispatch();

    //consigo los productos
    const fetchProductos = async () => {
        setProductos(await dispatch(getProductos()))
    }
    
    const handleAgregarACarrito = async (productoId, cantidad) => {
        setCarrito(cart);
    }


    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchProductos();
    }, []);
    
console.log(productos);

    return (
        <>
            <NavBar totalItems={10}/> 

            <div className='container'>
                <Routes>
                    <Route path="/" element={<BuenSaborScreen />} />
                    <Route path="/productos" element={<Productos productos = {productos} agregarACarrito={handleAgregarACarrito} />} />    
                    {/* <Route path="/carrito" element={<Carrito cart={cart} handleModificarCantidad = {handleModificarCantidad} handleEliminarItems = {handleEliminarItems} handleVaciar = {handleVaciar}/>} />         */}
                </Routes>
            </div>
            
        </>
    )
}

export default DashBoardRoutes
