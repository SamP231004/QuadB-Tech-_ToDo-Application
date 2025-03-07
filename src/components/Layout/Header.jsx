import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async (latitude, longitude) => {
            try {
                const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Could not fetch weather data');
                }
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            }
            catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeather(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        setError('Unable to retrieve your location.');
                        setLoading(false);
                        console.error('Geolocation error:', error);
                    }
                );
            }
            else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        getLocation();
    }, []);

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
                    <div className="weather-display">
                        {loading && <p>Loading weather...</p>}
                        {error && <p>Error: {error}</p>}
                        {weather && (
                            <>
                                <p>
                                    {weather.name}, {weather.sys.country}
                                </p>
                                <p>
                                    {weather.main.temp}°C, {weather.weather[0].description}
                                </p>
                                <img
                                    src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                                    alt="Weather Icon"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;