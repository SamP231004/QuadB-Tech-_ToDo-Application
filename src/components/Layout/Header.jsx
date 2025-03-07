import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const Header = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <h1>TaskMaster</h1>
                    </Link>

                    <nav className="nav-menu">
                        {isAuthenticated ? (
                            <>
                                <Link to="/tasks" className="nav-link">
                                    My Tasks
                                </Link>
                                <div className="user-menu">
                                    <span className="user-name">
                                        Welcome, {user?.name || 'User'}
                                    </span>
                                    <button onClick={handleLogout} className="btn-logout">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;