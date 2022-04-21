import React from 'react';
import useStyles from './styles';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { useLocation } from 'react-router-dom';
import { IconButton, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const NavBar = ({ totalItems }) => {
    const dispatch = useDispatch();

  //Event listener del botón
  const handleLogout = () =>{
    dispatch( startLogout() );
  }

  const ubicacion = useLocation();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">INICIO</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/productos">Productos</Nav.Link>
                    <Nav.Link href="/dondeEstamos">Donde Estamos</Nav.Link>
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
                    className='btn btn-primary'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </Navbar>
        </>
    )
}

export default NavBar