import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthRouter from './AuthRouter';
import { firebase } from "../firebase/firebase-config"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashBoardRoutes from './DashBoardRoutes';
import Admin from "../components/admin/Admin"
import AuthRouterAdmin from './AuthRouterAdmin';


const AppRouter = () => {

  const dispatch = useDispatch();

  //Creo un estado local, esta me va a servir para evaluar el estado del firebase, si ya verificó o no, true es que está verificando
  const [checking, setChecking] = useState(true);

  //Creo un estado local, esto es para saber si estoy logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //Con esto firebase me avisa cuando la autenticación cambia, o sea que puedo guardar el estado del login en el auth del redux sin que vuelva a iniciarse cuando refresco la pantalla 
  useEffect(() => {
    //El onAuthStateChanged es un observable que va a estar pendiente de el cambio del estado del user, recién cuando cambie de usuario es cuando se va a volver a cmabiar el login
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      //Si estoy autenticado
      if (user?.uid) {
        if(user.displayName != null){
          const names= user.displayName?.split(" ");
          dispatch(login(user.uid, names[0], names[1], user.email));
        }else{
          dispatch(login(user.uid, user.displayName, user.displayName, user.email));
        }
        //Si entró acá es porque está logueado, entonces lo pongo en true
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }

      //lo cambio cuando ya tengo la respuesta del firebase
      setChecking(false)

    })
  }, [dispatch, setChecking, setIsLoggedIn]) //Estas dependencias me sirven para ejecutar el useEffect cada vez que cambia alguna de ellas 

  if (checking) {
    return (
      <h1>Espere..</h1>
    )

  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Cuando la persona está logueada */}
        <Route path="/*" element={
          <PrivateRoute isAuthenticated={isLoggedIn} admin={false}>
            <DashBoardRoutes />
          </PrivateRoute>
        }
        />

        {/* Cuando la persona NO está logueada */}
        <Route path="auth/*" element={
          <PublicRoute isAuthenticated={isLoggedIn} admin={false}>
            <AuthRouter />
          </PublicRoute>
        }
        />

        <Route path="admin/*" element={
          <PrivateRoute isAuthenticated={isLoggedIn} admin={true}>
          <Admin />
          </PrivateRoute>
        }
        />

        {/* Cuando la persona NO está logueada */}
        <Route path="admin/auth/*" element={
          <PublicRoute isAuthenticated={isLoggedIn} admin={true}>
            <AuthRouterAdmin />
          </PublicRoute>
        }
        />

        {/* Esto es para cuando se equivocan de link entonces lo redecciona al login */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter