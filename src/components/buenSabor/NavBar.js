import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import logo from '../../assets/images/buensabor.png';
import { useState } from 'react';
import './inicio.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const NavBar = ({ totalItems }) => {
    const dispatch = useDispatch();

    //Event listener del botón
    const handleLogout = () => {
        dispatch(startLogout());
    }
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" className="navigation">
                <Navbar.Brand href="/inicio">
                    <img src={logo} alt="Logo Buen Sabor" className="logoHeader" />
                </Navbar.Brand>
                <button className="hamburger" onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}>

                    {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                    <Nav className="mr-auto">
                        <Nav.Link href="/inicio">Inicio</Nav.Link>
                        <Nav.Link href="/productos">Productos</Nav.Link>
                        <Nav.Link href="/nosotros">Sobre nosotros</Nav.Link>
                    </Nav>
                    
                    <button
                        className='btn-nav'
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        <img src='https://w7.pngwing.com/pngs/363/698/png-transparent-avatar-female-others-purple-face-black-hair.png' alt='' className='topAvatar' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/pedidos">Pedidos</Dropdown.Item>
                        <Dropdown.Item href="/facturas">Facturas</Dropdown.Item>
                        <Dropdown.Item href="/usuario">Editar perfil</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Navbar>
        </>
    )
}

export default NavBar