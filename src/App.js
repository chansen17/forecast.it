import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import { fetchWeather } from './api/fetchWeather';

function App() {
  const [ query, setQuery ] = useState("");
  const [ weather, setWeather ] = useState({})

  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery('');

      console.log(data);
    }
  }

  useEffect(() => {
    AOS.init();
  });
  
  return (
      
    <React.Fragment>
      <input 
            data-aos="fade-up"
            data-aos-anchor=".weather-title"
            type="text" 
            placeholder="Search city.." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            onKeyPress={search} 
            />
        {
          weather.main ? (
            <div className="city-container">
              <h2 className="city-name"><span>{weather.name}, {weather.sys.country}</span></h2>
              <div className="city-temp">
                { Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="city-meta">
                <img className="city-icon" 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} 
                />
                <h4 className="degrees">{weather.weather[0].description}</h4>
                <div className="meta-data">
                  <ul>
                    <li>Feels like: <span>{weather.main.feels_like}</span></li>
                    <li>Humidty: <span>{weather.main.humidity}</span></li>
                    <li>Wind temp: <span>{weather.wind.deg}</span></li>
                    <li>Wind speed: <span>{weather.wind.speed}</span></li>
                    {weather.wind.gust && <li>Wind gust: <span>{weather.wind.gust}</span></li>}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <h1 data-aos="fade-down" className="weather-title">Forecast.it</h1>
          )
        } 
  </React.Fragment>

  );
}

export default App;
