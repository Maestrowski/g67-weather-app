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
  const [hourly, setHourly] = useState(null);
  const [cityName, setCityName] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [timezone,setTimezone] = useState(null);

  const handleOnUseLocation = () => {
    var [lat, lon] = [null,null];
    if (document.getElementById("geoLat").innerHTML != "" && document.getElementById("geoLon").innerHTML != "") {
      [lat, lon] = [document.getElementById("geoLat").innerHTML,document.getElementById("geoLon").innerHTML];

      console.log(lat,lon);

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

          setCurrentWeather({ city: weatherResponse.name, ...weatherResponse }); {/**Get City data */}
          setCityName(weatherResponse.name);
          setCurrentTemp(weatherResponse.main.temp);  {/**Get temperature which will be displayed in the header */}
          setWeatherIcon(`icons/${weatherResponse.weather[0].icon}.png`); {/** Get the appropriate weather icon */}
          setForecast({ city: weatherResponse.name, ...forecastResponse }); 
          setTimezone(weatherResponse.timezone);
          setHourly({city: weatherResponse.name, ...forecastResponse});

          {/** Setup the weather forecast for 7 days */}

          const dailyData = []; {/** Create an array of the weather forecast for each day */}
          const dailyTemperatures = {};
          forecastResponse.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const day = date.getDay();  {/** Get the current day from the system */}
            const temperature = Math.round(item.main.temp);
            console.log(day);
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

          console.log(dailyData);
          {/** Setup the hourly forecast*/}

          // console.log(forecastResponse);
          const hourlyData = []; {/** Create an array of the weather forecast for each day */}
          const hourlyTemperatures = {};
          forecastResponse.list.forEach((item) => {
          const hour = new Date(item.dt).getHours();  {/** Get the current hour of the given timestamp */}
          const temperature = Math.round(item.main.temp);
          const icon = `icons/${item.weather[0].icon}.png`
          if (!hourlyTemperatures[hour]) {
            hourlyTemperatures[hour] = []; {/** Show nothing if there is no city selected */}
          }
          if (!hourlyData[hour]) {
            hourlyData[hour] = []; {/** Show nothing if there is no city selected */}
          }
          hourlyTemperatures[hour].push(temperature);
          hourlyData[hour] = {temperature, icon};
          // console.log(hourlyData);
        });

        setHourly({temperatures: hourlyTemperatures, icons: hourlyData}); {/**Display data to the console */}
        console.log(hourlyTemperatures);
        console.log(hourlyData);
        })
        .catch(console.log);
      } else {
        setCityName("Could not access location data");

        setCurrentWeather(null);
        setCurrentTemp(null);  
        setWeatherIcon(null); 
        setForecast(null); 
        setHourly(null);
      }
  };

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
        setTimezone(weatherResponse.timezone);
        setForecast({ city: searchData.label, ...forecastResponse }); 
        setHourly({city: searchData.label, ...forecastResponse});

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

        {/** Setup the hourly forecast*/}

        console.log(forecastResponse);
          const hourlyData = []; {/** Create an array of the weather forecast for each day */}
          const hourlyTemperatures = {};
          forecastResponse.list.forEach((item) => {
          const hour = new Date(item.dt).getHours();  {/** Get the current hour of the given timestamp */}
          const temperature = Math.round(item.main.temp);
          const icon = `icons/${item.weather[0].icon}.png`
          if (!hourlyTemperatures[hour]) {
            hourlyTemperatures[hour] = []; {/** Show nothing if there is no city selected */}
          }
          hourlyTemperatures[hour].push(temperature);
          hourlyData[hour] = {temperature, icon};
        });

        setHourly({temperatures: hourlyTemperatures, icons: hourlyData}); {/**Display data to the console */}
        console.log(hourlyTemperatures);
        console.log(hourlyData);
      })
      .catch(console.log);
  };


{/** Display all the components */}
  return (
    <div className="container">
      <Header 
      onSearchChange={handleOnSearchChange} 
      onUseLocation={handleOnUseLocation}
      cityName={cityName}
      currentTemp={currentTemp}
      weatherIcon={weatherIcon}/>
      <GeoWeather/>
      <HourForecast data={hourly} timezone={timezone}/>
      {forecast && <DailyForecast data={forecast} timezone={timezone}/>}
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentWeather && <WeatherGraph 
      lat = {currentWeather.coord.lat}
      lon = {currentWeather.coord.lon}
      apiKey = {WEATHER_API_KEY}/>}
    </div>
  );
}

export default App;
