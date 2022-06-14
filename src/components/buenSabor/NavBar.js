import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import logo from '../../assets/images/buensabor.png';
import './inicio.css';

const NavBar = ({ totalItems }) => {
    const dispatch = useDispatch();

  //Event listener del botón
  const handleLogout = () =>{
    dispatch( startLogout() );
  }
 
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/inicio">
                    <img src={logo} alt="Logo Buen Sabor" className="logoHeader" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/inicio">Inicio</Nav.Link>
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/nosotros">Sobre nosotros</Nav.Link>
                </Nav>
                
                {/* <div >
                        {ubicacion.pathname === '/productos' ? (
                        <div className='btn btn-primary'>
                            <IconButton href="/carrito" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>) : null}
                    </div> */}
                <button
                    className='btn-nav'
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </button>
            </Navbar>
        </>
    )
}

export default NavBar