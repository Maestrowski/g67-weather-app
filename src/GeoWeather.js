import React from 'react';
import './GeoWeather.css';
import { WEATHER_API_URL, R_GEO_API_URL, WEATHER_API_KEY } from "./components/api";

class GeoWeather extends React.Component {
  //STATE VARIABLES FOR GEOWEATHER COMPONENT
  state = {
    lat: null,
    lon: null,

    area: null,

    weatherData: null,

    forecastData: null,
    errorMessage: null,
    FrostWarning: false,
  };

  // Requesting location from geolocation API
  getPosition = () => {
    return new Promise(function(succ, err) {
      navigator.geolocation.getCurrentPosition(succ, err);
    });
  }

  // Take lat and lon from geolocation API to get Weather and Forecast from OpenWeather API
  getWeatherForecastFromAPI = async (lat,lon) => {
    const weatherAPIcall = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`

    );
    const weatherData = await weatherAPIcall.json();

    // Store values and data from API in state variables
    this.setState({
      lat: lat,
      lon: lon,
      area: weatherData.name,

      weatherData: weatherData
    })


    
  }

  // Take lat and lon from geolocation API to get Forecast from OpenWeather API (same as above function)
  getForecastFromAPI = async (lat,lon) => {
    const forecastAPIcall = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastData = await forecastAPIcall.json();

    this.setState({forecastData: forecastData})
  }
  // Only call when this React Component is properly mounted (initialised and inserted into the document)
  componentDidMount() {
    // Do position API call
    this.getPosition()
    .then((position) => {
      // Immediately get weather and forecast data
      this.getWeatherForecastFromAPI(position.coords.latitude,position.coords.longitude);
      this.getForecastFromAPI(position.coords.latitude,position.coords.longitude);
    }).catch((err) => this.setState({errorMessage: "Failed to access location data"}));

    // Start a timer to only do the API call ever 60000ms (10 minutes)
    this.weatherTimer = setInterval(
      () => this.getWeatherForecastFromAPI(this.state.lat,this.state.lon),600000);
    this.forecastTimer = setInterval(
      () => this.getForecastFromAPI(this.state.lat,this.state.lon),600000);
  }

  // End timers when the component is removed
  componentWillUnmount() {
    clearInterval(this.weatherTimer);
    clearInterval(this.forecastTimer);
  }
  
  // Run every frame
  render() {
    
    // get data from state variables
    const { lat, lon, area, weatherData, forecastData, errorMessage, FrostWarning } = this.state;

    let frost = null;
    if (FrostWarning) {
      frost = (
        <div className='frost-warning'>
          <p>Frost Warning: Temperature expected to reach freezing point, take precautions to protect crops</p>
        </div>
      );
    }
    // only try to access data when it is not null (hasn't arrived from API)
    if (area && weatherData && forecastData) {
      document.getElementById("geoLat").innerHTML = lat;
      document.getElementById("geoLon").innerHTML = lon;
      
      return (
        
        <div className="weather-box">
          {frost}
        </div>
      );      
    }
    else {
      // placeholder if data hasn't been received yet
      return (
        <div>
          {frost}
          {/* {errorMessage == null ? "Loading..." : errorMessage} */}
        </div>
      )
    } 
  }
}

export default GeoWeather

