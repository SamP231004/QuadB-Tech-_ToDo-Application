export const fetchWeather = (location) => {
    return async dispatch => {
        dispatch({ type: 'FETCH_WEATHER_REQUEST' });

        try {
            // API key would normally be in environment variables
            const apiKey = 'demo-api-key';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
            );

            if (!response.ok) {
                throw new Error('Weather data not available');
            }

            const weatherData = await response.json();

            dispatch({
                type: 'FETCH_WEATHER_SUCCESS',
                payload: weatherData
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_WEATHER_FAILURE',
                payload: error.message
            });
        }
    };
};