import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/current-weather/current-weather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourForecast from "./components/HourForecast/HourForecast";
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import GeoWeather from "./GeoWeather";

import WeatherGraph from "./components/WeatherGraph/WeatherGraph";


function App() {
  return (
    <div className="container">
      <Header />
      
      <HourForecast />
      <DailyForecast />
      <CurrentWeather/>
      <WeatherGraph />

      <GeoWeather />
    </div>
  );
}

export default App;