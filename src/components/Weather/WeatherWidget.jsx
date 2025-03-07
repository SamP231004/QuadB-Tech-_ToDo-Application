import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from '../../redux/actions/weatherActions';

const WeatherWidget = ({ city }) => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        dispatch(fetchWeatherRequest());
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
          );
          dispatch(fetchWeatherSuccess(response.data));
        } catch (err) {
          dispatch(fetchWeatherFailure(err.message));
        }
      }
    };

    fetchWeatherData();
  }, [dispatch, city]);

  if (loading) {
    return <p>Loading weather...</p>;
  }

  if (error) {
    return <p>Error fetching weather: {error}</p>;
  }

  if (weather) {
    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Description: {weather.weather[0].description}</p>
      </div>
    );
  }

  return null;
};

export default WeatherWidget;