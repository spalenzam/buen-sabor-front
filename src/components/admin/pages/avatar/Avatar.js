import React, { useEffect, useState } from 'react';
import { Link, Route, Routes} from "react-router-dom";
import { PersonOutlineOutlined, ReceiptOutlined, ShoppingCartOutlined} from "@material-ui/icons"
import { useDispatch, useSelector } from 'react-redux';
import { getUserbyMail } from '../../../../actions/usuarios';
import "./admin.css"
import FacturasAvatar from './FacturasAvatar';
import UserData from '../../../carrito/UserData';
import PedidosAvatar from './PedidosAvatar';
import SidebarAvatar from './SidebarAvatar';

const Avatar = () => {
    const dispatch = useDispatch();

    const { email } = useSelector(state => state.auth)

    const [usuario, setUsuario] = useState('');

    useEffect(() => {

        dispatch(getUserbyMail(email)).then((data) => {
            console.log(data);
            setUsuario(data)
        })
    }, []);
    return (
        <>
        <div className='containerAdmin'>
            <SidebarAvatar usuario={usuario}/>
            {/* <div className='sidebar'>
                <div className='sidebarWrapper'>

                    <div className='sidebarMenu'>
                        <h3 className='sidebarTitle'>Administrador</h3>
                        <ul className='sidebarList'>
                            <Link to="usuario" className="link">
                                <li className='sidebarListItem'>
                                <PersonOutlineOutlined className='sidebarIcon' />
                                    Perfil
                                </li>
                            </Link>
                            <Link to="pedidos" state={{ usuario }} className="link">
                                <li className='sidebarListItem'>
                                    <ShoppingCartOutlined className='sidebarIcon' />
                                    Pedidos
                                </li>
                            </Link>
                            <Link to="facturas" state={{ usuario }} className="link">
                                <li className='sidebarListItem'>
                                    <ReceiptOutlined className='sidebarIcon' />
                                    Facturas
                                </li>
                            </Link>
                        </ul>
                    </div>

                </div>
            </div> */}

            <Routes>
            <Route exact path="/" element={<PedidosAvatar />} />
            <Route path="pedidos" element={<PedidosAvatar/>} />
            <Route path="/facturas" element={<FacturasAvatar/>} />
            <Route path="/usuario" element={<UserData /*usuarioLog={usuarioLog} usuarioSeleccionado={usuarioSeleccionado} setUsuarioSeleccionado={setUsuarioSeleccionado}*//>} />
            </Routes>
        </div>
        </>
    )
}

export default Avatar