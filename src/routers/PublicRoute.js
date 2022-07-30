import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, children, admin }) => {

    return !isAuthenticated ? children : admin == true ? <Navigate to="/admin" /> : <Navigate to="/" />

};

export default PublicRoute;
