import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../redux/actions/weatherActions';

const WeatherWidget = () => {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();
    const { weather, loading, error } = useSelector(state => state.weather);

    useEffect(() => {
        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Use coordinates to get weather
                    // In a real app, we'd use a reverse geocoding API
                    // For this demo, we'll use a default city
                    setLocation('New York');
                    dispatch(fetchWeather('New York'));
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setLocation('New York');
                    dispatch(fetchWeather('New York'));
                }
            );
        } else {
            // Fallback to default location
            setLocation('New York');
            dispatch(fetchWeather('New York'));
        }
    }, [dispatch]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            dispatch(fetchWeather(location));
        }
    };

    // Get weather icon based on condition
    const getWeatherIcon = (condition) => {
        if (!condition) return '☁️';

        const code = condition.id;

        if (code >= 200 && code < 300) return '⛈️'; // Thunderstorm
        if (code >= 300 && code < 400) return '🌧️'; // Drizzle
        if (code >= 500 && code < 600) return '🌧️'; // Rain
        if (code >= 600 && code < 700) return '❄️'; // Snow
        if (code >= 700 && code < 800) return '🌫️'; // Atmosphere (fog, mist)
        if (code === 800) return '☀️'; // Clear
        if (code > 800) return '☁️'; // Clouds

        return '🌡️';
    };

    // Get weather message based on condition
    const getWeatherMessage = (condition) => {
        if (!condition) return 'Weather information unavailable';

        const code = condition.id;
        const temp = weather?.main?.temp || 0;

        if (code >= 200 && code < 300)
            return 'Thunderstorms detected! Indoor tasks recommended.';
        if (code >= 300 && code < 600)
            return 'Rainy conditions. Consider rescheduling outdoor tasks.';
        if (code >= 600 && code < 700)
            return 'Snowy conditions. Be careful with outdoor activities.';
        if (code >= 700 && code < 800)
            return 'Low visibility conditions. Indoor tasks recommended.';
        if (code === 800) {
            if (temp > 30) return 'Clear but very hot. Stay hydrated for outdoor tasks!';
            if (temp < 5) return 'Clear but cold. Bundle up for outdoor tasks!';
            return 'Perfect weather for outdoor tasks!';
        }
        if (code > 800) {
            return 'Cloudy conditions. Good for outdoor tasks.';
        }

        return 'Check weather conditions before planning outdoor tasks.';
    };

    return (
        <div className="weather-widget">
            <h3>Weather Conditions</h3>

            <form onSubmit={handleSubmit} className="location-form">
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Enter location"
                    className="location-input"
                />
                <button type="submit" className="btn-location">
                    Update
                </button>
            </form>

            {loading && <div className="weather-loading">Loading weather data...</div>}

            {error && <div className="weather-error">Error: {error}</div>}

            {weather && !loading && !error && (
                <div className="weather-content">
                    <div className="weather-header">
                        <div className="weather-icon">
                            {getWeatherIcon(weather.weather?.[0])}
                        </div>
                        <div className="weather-info">
                            <div className="weather-location">{weather.name}</div>
                            <div className="weather-temp">{Math.round(weather.main?.temp)}°C</div>
                            <div className="weather-condition">
                                {weather.weather?.[0]?.description}
                            </div>
                        </div>
                    </div>

                    <div className="weather-details">
                        <div className="weather-detail">
                            <span>Humidity:</span> {weather.main?.humidity}%
                        </div>
                        <div className="weather-detail">
                            <span>Wind:</span> {Math.round(weather.wind?.speed * 3.6)} km/h
                        </div>
                    </div>

                    <div className="weather-message">
                        {getWeatherMessage(weather.weather?.[0])}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;