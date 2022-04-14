import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';
import NavBar from '../components/buenSabor/NavBar';
import Productos from '../components/buenSabor/Productos';
import Carrito from '../components/carrito/Carrito';
import instrumentos from '../datos/instrumentos.json';

const DashBoardRoutes = () => {

    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState({})


    //consigo los productos
    const fetchProductos = async () => {
        const data = await instrumentos;
        //voy guardando todos los datos que me trae en productos
        setProductos(data);
    }

    //Función que agrega al carrito los productos 
    const handleAgregarACarrito = async (productoId, cantidad) => {
        //const { cart } = await commerce.cart.add(productoId, cantidad);
        setCarrito(cart);
    }

    const handleModificarCantidad = async (productoId, quantity) =>{
        //const { cart } = await commerce.cart.update(productoId, { quantity });
        setCarrito(cart);
    }

    const handleEliminarItems = async (productoId) =>{
        //const { cart } = await commerce.cart.remove(productoId);
        setCarrito(cart);
    }

    const handleVaciar = async () =>{
        //const { cart } = await commerce.cart.empty();
        setCarrito(cart);
    }

    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchProductos();
        //fetchCarrito();
    }, []);

    return (
        <>
            <NavBar totalItems={10}/> 

            <div className='container'>
                <Routes>
                    <Route path="/" element={<BuenSaborScreen />} />
                    <Route path="/productos" element={<Productos productos = {productos} agregarACarrito={handleAgregarACarrito} />} />    
                    <Route path="/carrito" element={<Carrito cart={cart} handleModificarCantidad = {handleModificarCantidad} handleEliminarItems = {handleEliminarItems} handleVaciar = {handleVaciar}/>} />        
                </Routes>
            </div>
            
        </>
    )
}

export default DashBoardRoutes
