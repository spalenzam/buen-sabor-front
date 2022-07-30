import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ isAuthenticated, children, admin }) => {

    //me permite ver el path en el que estoy actualmente
    //const { pathname, search } = useLocation();
    
    //pregunto que si está logueado vaya hacia los children, que en este caso es el DashBoard
    return isAuthenticated ? children : admin == true ? <Navigate to="/admin/auth/login"/> : <Navigate to="/auth/login" />
};

export default PrivateRoute;