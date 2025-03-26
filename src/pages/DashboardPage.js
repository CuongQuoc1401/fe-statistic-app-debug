import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user && <p>Chào mừng, {user.email}!</p>}
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
};

export default DashboardPage;