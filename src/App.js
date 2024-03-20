import { useState, useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import "./App.css";

import Header from "./components/Header/Header";
import CurrentWeather from "./components/Header/current-weather/current-weather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourForecast from "./components/HourForecast/HourForecast";

import GeoWeather from "./GeoWeather";
import WeatherGraph from "./components/WeatherGraph/WeatherGraph";
import SoilGraph from "./components/WeatherGraph/SoilGraph";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [cityName, setCityName] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [timezone,setTimezone] = useState(null);

  const [frost,setFrost] = useState(false);

  const handleOnUseLocation = () => { // Handle getting data from API when using geolocation
    var [lat, lon] = [null,null];

    // If data is received and put onto DOM
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

          console.log(forecastResponse);

          

          setCurrentWeather({ city: weatherResponse.name, ...weatherResponse }); {/**Get City data */}
          setCityName(weatherResponse.name);
          setCurrentTemp(weatherResponse.main.temp);  {/**Get temperature which will be displayed in the header */}
          setWeatherIcon(`icons/${weatherResponse.weather[0].icon}.png`); {/** Get the appropriate weather icon */}
          setForecast({ city: weatherResponse.name, ...forecastResponse }); 
          setTimezone(weatherResponse.timezone);
          setHourly({city: weatherResponse.name, ...forecastResponse});

          setFrost(forecastResponse.list.some(forecast => {
            const Temp_min = forecast.main.temp_min;
            return Temp_min <= 0;
          }));

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
          const hourlyData = []; {/** Create an array of the weather forecast for each hour */}
          const hourlyTemperatures = {};

          const forecastList = forecastResponse.list;
          for (var i = 0; i < 8; i++) {
            if (!hourlyData[i]) {
              hourlyData[i] = []; {/** Show nothing if there is no city selected */}
            }
            hourlyData[i] = ({temp: forecastList[i].main.temp, icon: `icons/${forecastList[i].weather[0].icon}.png`});
          }
          
          setHourly(hourlyData); {/**Display data to the console */}
          })
          .catch(console.log);
      } else {
        // Display message if location is not enabled
        setCityName("Could not access location data");

        setCurrentWeather(null);
        setCurrentTemp(null);  
        setWeatherIcon(null); 
        setForecast(null); 
        setHourly(null);
      }
  };

  {/** fetch API Data from openWeatherAPI when using the searchbar */}

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

        console.log("Forecast Data " + forecastResponse);

        setFrost(forecastResponse.list.some(forecast => {
          const Temp_min = forecast.main.temp_min;
          return Temp_min <= 0;
        }));

        setCurrentWeather({ city: weatherResponse.name, ...weatherResponse }); {/**Get City data */}
        setCityName(weatherResponse.name);
        setCurrentTemp(weatherResponse.main.temp);  {/**Get temperature which will be displayed in the header */}
        setWeatherIcon(`icons/${weatherResponse.weather[0].icon}.png`); {/** Get the appropriate weather icon */}
        setForecast({ city: weatherResponse.name, ...forecastResponse }); 
        setTimezone(weatherResponse.timezone);
        setHourly({city: weatherResponse.name, ...forecastResponse});

        setFrost(forecastResponse.list.some(forecast => {
          const Temp_min = forecast.main.temp_min;
          return Temp_min <= 0;
        }));

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
        const forecastList = forecastResponse.list;
        for (var i = 0; i < 8; i++) {
          if (!hourlyData[i]) {
            hourlyData[i] = []; {/** Show nothing if there is no city selected */}
          }
          hourlyData[i] = ({temp: forecastList[i].main.temp, icon: `icons/${forecastList[i].weather[0].icon}.png`});
        }
        
        setHourly(hourlyData); {/**Display data to the console */}
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
      {hourly && <HourForecast data={hourly} timezone={timezone}/>}
      {frost && 
      <div className="frost-wrapper">
        <span className='frost-warning'>
            Frost Warning: Temperature expected to reach freezing point, take precautions to protect crops
        </span>
      </div>
      }
      {forecast && <DailyForecast data={forecast} timezone={timezone}/>}
      
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentWeather && <WeatherGraph 
      lat = {currentWeather.coord.lat}
      lon = {currentWeather.coord.lon}
      apiKey = {WEATHER_API_KEY}/>}
      {currentWeather && <SoilGraph 
      lat = {currentWeather.coord.lat}
      lon = {currentWeather.coord.lon}
      apiKey = {WEATHER_API_KEY}/>}
    </div>
  );
}

export default App;
