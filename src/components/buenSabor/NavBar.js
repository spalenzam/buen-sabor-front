import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

const NavBar = ({ totalItems }) => {
    const dispatch = useDispatch();

  //Event listener del botón
  const handleLogout = () =>{
    dispatch( startLogout() );
  }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">INICIO</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/inicio">Inicio</Nav.Link>
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