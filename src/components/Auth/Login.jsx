import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
} from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(loginRequest());
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (email === 'user@example.com' && password === 'password') {
                const user = { email: email };
                dispatch(loginSuccess(user));
                navigate('/tasks');
            }
            else {
                dispatch(loginFailure('Invalid credentials'));
            }
        }
        catch (err) {
            dispatch(loginFailure(err.message));
            console.error('Login failed:', err);
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span>
                    </p>
                    <p className="demo-credentials">
                        <small>Demo credentials: user@example.com / password</small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;