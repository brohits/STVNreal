import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, loading, error, user, isAdmin } = useAuth();

    useEffect(() => {
        // If user is already logged in and is admin, redirect to admin panel
        if (user && isAdmin) {
            navigate('/admin/news');
        }
    }, [user, isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await login(username, password);
        
        if (success) {
            // Login successful, the useEffect above will handle the redirect
            return;
        }
        // Login failed, error state is handled by AuthContext
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="auth-links">
                        Need an admin account?{' '}
                        <a href="/admin/signup" onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/signup');
                        }}>
                            Sign up here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
