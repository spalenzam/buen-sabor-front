import React, { useEffect, useState, useCallback } from 'react'
import { Routes, Route } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';
import NavBar from '../components/buenSabor/NavBar';
import Productos from '../components/buenSabor/Productos';
import Cart from '../components/carrito/Cart';
import { useDispatch } from 'react-redux'
import { getProductos } from '../actions/productos';
import DetallePlato from '../components/buenSabor/DetallePlato';

const DashBoardRoutes = () => {
 
    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    
    const dispatch = useDispatch();

    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState(() => {
        try {
            //guarda los productos por si se recarga la pag
            const productosEnLocalStorage = localStorage.getItem("cartProducts");
            return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cart));
    }, [cart]);

    //consigo los productos
    const fetchProductos = useCallback(async () => {
        setProductos(await dispatch(getProductos()))
    },[dispatch]);

    //Función que agrega al carrito los productos
    const addFood = (product) => {
        const inCart = cart.find(
            (productInCart) => productInCart.id === product.id
        );
        if (inCart){
            setCarrito(
                cart.map((productInCart) => {
                    if(productInCart.id === product.id) {
                        return {...inCart, cant: inCart.cant + 1}; 
                    } else return productInCart;
                })            
            );
        } else {
            setCarrito([...cart, {...product, cant: 1}]);
        }
    }

    //Función que elimina productos
    const delFood = (product) => {
        //find porque es un solo elemento con ese id
        const inCart = cart.find((productInCart) => productInCart.id === product.id);
        
        if (inCart.cant ===1) {
            setCarrito(cart.filter(productInCart => productInCart.id !== product.id)
            ) ;
        } else {
            setCarrito(
                cart.map((productInCart) => {
            if(productInCart.id === product.id){
                return {...inCart, cant: inCart.cant -1}
            } else return productInCart;
        }));
        }
    }

    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]);

    
    return (
        <>
            <NavBar totalItems={10}/> 
            <div className='container'>
                <Routes>
                    <Route path="/" element={<BuenSaborScreen />} />
                    <Route path="/productos" element={
                        <>
                            <Productos productos = {productos} agregarACarrito={addFood} cantPedida = {cart}/>        
                            <Cart cart = {cart} agregarACarrito={addFood} eliminarDeCarrito={delFood} cantDisponible={productos}/> 
                         </>
                    }/> 
                    <Route path="/detallePlato/:id" element={<DetallePlato productos = {productos}/>} />
                    </Routes>
            </div>
            
        </>
      )
}

export default DashBoardRoutes
