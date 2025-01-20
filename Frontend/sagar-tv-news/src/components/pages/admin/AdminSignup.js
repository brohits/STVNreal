import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminSignup.css';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const { signup, loading, error, user, isAdmin } = useAuth();

    useEffect(() => {
        // If user is already logged in and is admin, redirect to admin panel
        if (user && isAdmin) {
            navigate('/admin/news');
        }
    }, [user, isAdmin, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Basic validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setFormError('All fields are required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address');
            return;
        }

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setFormError('Password must be at least 6 characters long');
            return;
        }

        const success = await signup({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });

        if (success) {
            navigate('/admin/news');
        }
    };

    return (
        <div className="admin-signup-container">
            <div className="admin-signup-box">
                <h2>Admin Signup</h2>
                {(error || formError) && (
                    <div className="error-message">{formError || error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    <div className="auth-links">
                        Already have an account?{' '}
                        <a href="/admin/login" onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/login');
                        }}>
                            Login here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
