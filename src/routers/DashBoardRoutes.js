import React, { useEffect, useState, useCallback } from 'react'
import { Routes, Route } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';
import NavBar from '../components/buenSabor/NavBar';
import Inicio from '../components/buenSabor/Inicio';
import Productos from '../components/buenSabor/Productos';
import Cart from '../components/carrito/Cart';
import { useDispatch, useSelector } from 'react-redux'
import { getBebidas, getProductos } from '../actions/productos';
import { getRubroGeneral } from '../actions/rubrogeneral';
import DetallePlato from '../components/buenSabor/DetallePlato';
import Footer from '../components/buenSabor/Footer';
import Nosotros from '../components/buenSabor/Nosotros';
import FinalProductList from '../components/carrito/FinalProductList';
import moment from 'moment';
import UserData from '../components/carrito/UserData';
import { getCliente } from '../actions/pedidos';
import { getUserbyMail, getUsuarioById } from '../actions/usuarios';
import Compra from '../components/carrito/Compra';
import CompraMP from '../components/carrito/CompraMP';
import Avatar from '../components/admin/pages/avatar/Avatar';
import PedidosAvatar from '../components/admin/pages/avatar/PedidosAvatar';
import FacturasAvatar from '../components/admin/pages/avatar/FacturasAvatar';

const DashBoardRoutes = () => {

    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    //Estado donde guardamos los articulos insumo
    const [bebidas, setBebidas] = useState([]);

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
    }, [dispatch]);

    // consigo las bebidas
    const fetchBebidas = useCallback(async () => {
        setBebidas(await dispatch(getBebidas()))
    }, [dispatch]);

    //Función que agrega al carrito los productos
    const addFood = (product) => {
        const inCart = cart.find(
            (productInCart) => productInCart.id === product.id
        );
        if (inCart) {
            setCarrito(
                cart.map((productInCart) => {
                    if (productInCart.id === product.id) {
                        return { ...inCart, cant: inCart.cant + 1 };
                    } else return productInCart;
                })
            );
        } else {
            setCarrito([...cart, { ...product, cant: 1 }]);
        }
    }

    //Función que elimina productos
    const delFood = (product) => {
        //find porque es un solo elemento con ese id
        const inCart = cart.find((productInCart) => productInCart.id === product.id);

        if (inCart.cant === 1) {
            setCarrito(cart.filter(productInCart => productInCart.id !== product.id)
            );
        } else {
            setCarrito(
                cart.map((productInCart) => {
                    if (productInCart.id === product.id) {
                        return { ...inCart, cant: inCart.cant - 1 }
                    } else return productInCart;
                }));
        }
    }

    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchBebidas();
        fetchProductos();
    }, [fetchProductos, fetchBebidas]);

    //Estado donde guardamos las categorías
    const [rubroGeneral, setRubroGeneral] = useState([]);

    //consigo categorías 
    const fetchRubroGeneral = useCallback(async () => {
        setRubroGeneral(await dispatch(getRubroGeneral()))
    }, [dispatch]);

    useEffect(() => {

        fetchRubroGeneral();
    }, [fetchRubroGeneral]);

    // Local abierto o cerrado
    const today = moment().toDate();
    const todayDay = moment().format('dddd');
    var start = moment().toDate();
    var end = moment().toDate();
    var startWeekend = moment().toDate();
    var endtWeekend = moment().toDate();

    start.setHours(20);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);
    startWeekend.setHours(11);
    startWeekend.setMinutes(0);
    endtWeekend.setHours(15);
    endtWeekend.setMinutes(0);

    today.setHours(21);
    today.setMinutes(0);

    let close = ((today >= start && today <= end) ?
        false :
        ((todayDay === 'Saturday' || todayDay === 'Sunday') && (today >= startWeekend && today <= endtWeekend)) ?
            false
            :
            true)

    // CLIENTE - verifica si está toda la info
    const [usuarioLog, setUsuarioLog] = useState({}); 

    const usuario = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getCliente(usuario.email)).then((data) => {
            setUsuarioLog(data)
        })
    }, []);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

    return (
        <>
            <NavBar totalItems={10} />
            <Routes>
                <Route path="/" element={<Inicio rubro={rubroGeneral} />} />
                <Route path="/inicio" element={<Inicio rubro={rubroGeneral} />} />
                <Route path="/productos" element={
                    <>
                        <div className="container position-relative">
                            <Cart cart={cart} agregarACarrito={addFood} eliminarDeCarrito={delFood} cantDisponible={productos} cantDispBebidas={bebidas} close={close} />
                            <Productos bebidas={bebidas} productos={productos} agregarACarrito={addFood} cantPedida={cart} close={close} />
                        </div>
                    </>
                } />
                <Route path="/detallePlato/:id" element={<DetallePlato productos={productos} />} />
                <Route path="/Nosotros" element={<Nosotros />} />
                <Route path='/tienda' element={
                    <>
                        <div>
                            <FinalProductList cart={cart} usuarioSeleccionado={usuarioSeleccionado} setCarrito={setCarrito}/>
                        </div>
                        <div>
                            <UserData usuarioLog={usuarioLog} usuarioSeleccionado={usuarioSeleccionado} setUsuarioSeleccionado={setUsuarioSeleccionado} />
                        </div>
                    </>
                } />
                <Route path="/compra/:id" element={<Compra />} />
                <Route path="/compra" element={<CompraMP />} />
                <Route path="/pedidos" element={<PedidosAvatar usuario={usuarioLog}/>} />
                <Route path="/facturas" element={<FacturasAvatar usuario={usuarioLog}/>} />
                <Route path="/usuario" element={<UserData usuarioLog={usuarioLog} usuarioSeleccionado={usuarioSeleccionado} setUsuarioSeleccionado={setUsuarioSeleccionado} />} />
            </Routes>
            <Footer rubro={rubroGeneral} />
        </>
    )
}

export default DashBoardRoutes