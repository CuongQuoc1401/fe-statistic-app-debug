import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* Render ApiCaller component here */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;