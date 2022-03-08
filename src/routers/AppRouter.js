import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import BuenSaborScreen from '../components/buenSabor/BuenSaborScreen';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={ <AuthRouter />} />
        <Route path="/" element={ <BuenSaborScreen />} />

        {/* Esto es para cuando se equivocan de link entonces lo redecciona al login */}
        <Route path="*" element={ <Navigate to= "/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter