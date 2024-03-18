import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/Header/current-weather/current-weather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourForecast from "./components/HourForecast/HourForecast";
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from "./components/api";
import "./App.css";
import GeoWeather from "./GeoWeather";

import WeatherGraph from "./components/WeatherGraph/WeatherGraph";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cityName, setCityName] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  {/** fetch API Data from openWeatherAPI */}

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        {/**Grab the required data for the header and current weather section */}

        setCurrentWeather({ city: searchData.label, ...weatherResponse }); {/**Get City data */}
        setCityName(searchData.label);
        setCurrentTemp(weatherResponse.main.temp);  {/**Get temperature which will be displayed in the header */}
        setWeatherIcon(`icons/${weatherResponse.weather[0].icon}.png`); {/** Get the appropriate weather icon */}
        setForecast({ city: searchData.label, ...forecastResponse }); 

        {/** Setup the weather forecast for 7 days */}

        const dailyData = []; {/** Create an array of the weather forecast for each day */}
        const dailyTemperatures = {};
        forecastResponse.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          const day = date.getDay();  {/** Get the current day from the system */}
          const temperature = Math.round(item.main.temp);
          const icon = `icons/${item.weather[0].icon}.png`
          if (!dailyTemperatures[day]) {
            dailyTemperatures[day] = []; {/** Show nothing if there is no city selected */}
          }
          dailyTemperatures[day].push(temperature);
          dailyData[day] = {temperature, icon};
        });

        const dailyTemperatureArray = Object.values(dailyTemperatures).map(dayTemperatures => {
          const sum = dayTemperatures.reduce((acc, temp) => acc + temp, 0);
          return Math.round(sum / dayTemperatures.length); {/** Calculate the average temperature for that day */}
        });

        setForecast({temperatures: dailyTemperatureArray, icons: dailyData}); {/**Display data to the console */}
      })
      .catch(console.log);
  };


{/** Display all the components */}
  return (
    <div className="container">
      <Header 
      onSearchChange={handleOnSearchChange} 
      cityName={cityName}
      currentTemp={currentTemp}
      weatherIcon={weatherIcon}/>
      <HourForecast />
      {forecast && <DailyForecast data={forecast}/>}
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentWeather && <WeatherGraph 
      lat = {currentWeather.coord.lat}
      lon = {currentWeather.coord.lon}
      apiKey = {WEATHER_API_KEY}/>}
    </div>
  );
}

export default App;
