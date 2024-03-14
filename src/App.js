import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/current-weather/current-weather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourForecast from "./components/HourForecast/HourForecast";
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import { getPosition, getCity } from "./Location";

function App() {
  //STATE VARIABLES
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(null);
  const [localArea, setLocalArea] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  //RUN ALL ASYNC FUNCTIONS HERE
  useEffect(() => {
    async function getGeoLatLon() {
      // get Latitude,Longitude from GeolocationAPI
      const posCall = await getPosition();

      // set state variables
      setLat(await posCall[0]);
      setLon(await posCall[1]);

      //console.log("Current Location coordinates: " +await posCall[0]+ ", " +await posCall[1]);

      return [posCall[0], posCall[1]];
    }

    async function getCityFromGeo() {
      // get City from Openweather Reverse-Geocoding API with latitude,longitude from GeolocationAPI
      const cityCall = await getCity();

      // set state variable
      setCity(await cityCall);

      console.log("Current city: " +await cityCall);

      return cityCall;
    }

    async function getLocalAreaFromGeo() {
      // get Local Area from OpenweatherAPI with latitude,longitude from GeolocationAPI
      const weatherResponse = await getWeatherFromGeo();

      const localResponse = await weatherResponse.name;
      setLocalArea(await localResponse);
      
      console.log("Current location: " +await localResponse);

      return localResponse;
    }

    async function getWeatherFromGeo() {
      // get Current Weather from OpenweatherAPI with latitude,longitude from GeolocationAPI
      const [lat,lon] = await getGeoLatLon();

      setLat(await lat);
      setLon(await lon);

      //console.log("Getting today's weather for coordinates: " +await lat+ ", " +await lon);

      const currentWeatherFetch = await fetch(
        `${WEATHER_API_URL}/weather?lat=${await lat}&lon=${await lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const weatherResponse = await currentWeatherFetch.json();
      console.log("Current weather: ", weatherResponse);
      
      setCurrentWeather(await weatherResponse);
      return weatherResponse;
    }

    async function getForecastFromGeo() {
      // get Extended Forecast from OpenweatherAPI with latitude,longitude from GeolocationAPI

      const [lat,lon] = await getGeoLatLon();

      setLat(await lat);
      setLon(await lon);

      //console.log("Getting extended forecast for coordinates: " +await lat+ ", " +await lon);

      const forecastFetch = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${await lat}&lon=${await lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const forecastResponse = await forecastFetch.json();
      console.log("Forecast data: ", forecastResponse);

      setForecast(await forecastResponse);
      return forecastResponse;
    }

    async function updateAllElementsOfClass(callFunction, targetClass) {
      const response = await callFunction();

      const elements = document.getElementsByClassName(await response);
      
      //console.log(await elements);
      if (await elements != null) {
        await elements.forEach((element) => element.innerHTML = response);
      }
    }

    getGeoLatLon();
    getCityFromGeo();
    getLocalAreaFromGeo();

    getWeatherFromGeo();
    getForecastFromGeo();

    // console.log("Current Location coordinates: " +lat+ ", " +lon);
    // console.log("Current city: " +city);
    // console.log("Current location: " +localArea);

    // console.log("Getting today's weather for coordinates: " +lat+ ", " +lon);
    // console.log("Forecast data: ", forecast);
  }, []);

  return (
    <div className="container">
      <Header />
      <CurrentWeather/>
      <HourForecast />
    </div>
  );
}

export default App;