import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ isAuthenticated, children }) => {

    //me permite ver el path en el que estoy actualmente
    //const { pathname, search } = useLocation();
    
    //pregunto que si está logueado vaya hacia los children, que en este caso es el DashBoard
    return isAuthenticated ? children : <Navigate to="/auth/login" />
};

export default PrivateRoute;