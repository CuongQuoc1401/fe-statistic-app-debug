import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Giả sử bạn có AuthContext

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    if (isAuthenticated || token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;