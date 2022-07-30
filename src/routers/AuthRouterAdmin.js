import React from 'react';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import { Routes, Route, Navigate } from "react-router-dom";

const AuthRouterAdmin = () => {
  return (
    <div className='auth__main'>
        <div className='auth__box-container'>

            <Routes>
                <Route path="login" element={<LoginScreen admin={true}/>} />

                {/* Esto es para cuando se equivocan de link entonces lo redecciona al login */}
                <Route path="*" element={ <Navigate to= "admin/auth/login" />} />
            </Routes>

        </div>
    </div>
  )
}

export default AuthRouterAdmin


