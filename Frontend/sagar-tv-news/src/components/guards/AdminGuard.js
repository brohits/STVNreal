import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminGuard = ({ children }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/admin/login" />;
    }

    if (!isAdmin) {
        // Logged in but not admin, redirect to home page
        return <Navigate to="/" />;
    }

    // Authorized, render children
    return children;
};

export default AdminGuard;
