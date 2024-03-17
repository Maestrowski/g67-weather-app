import { useState } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/Header/current-weather/current-weather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourForecast from "./components/HourForecast/HourForecast";
import { WEATHER_API_URL,WEATHER_API_KEY } from "./components/api";
import "./App.css";
import WeatherGraph from "./components/WeatherGraph/WeatherGraph";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cityName, setCityName] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

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
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setCityName(searchData.label);
        setCurrentTemp(weatherResponse.main.temp);
        setWeatherIcon(`icons/${weatherResponse.weather[0].icon}.png`);
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Header 
      onSearchChange={handleOnSearchChange} 
      cityName={cityName}
      currentTemp={currentTemp}
      weatherIcon={weatherIcon}/>
      <HourForecast />
      <DailyForecast />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      <WeatherGraph />
    </div>
  );
}

export default App;
