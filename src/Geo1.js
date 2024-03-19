import React from 'react';
import { WEATHER_API_URL, R_GEO_API_URL, WEATHER_API_KEY } from "./components/api";


// const getPosition = () => {
//   return new Promise(function(succ, err) {
//     navigator.geolocation.getCurrentPosition(succ, err);
//   });
// }

class GeoWeather extends React.Component {
  //STATE VARIABLES FOR GEOWEATHER COMPONENT
  state = {
    lat: null,
    lon: null,

    area: null,

    weatherData: null,

    forecastData: null,
    errorMessage: null
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

    console.log("Weather data: ", weatherData);
  }

  // Take lat and lon from geolocation API to get Forecast from OpenWeather API (same as above function)
  getForecastFromAPI = async (lat,lon) => {
    const forecastAPIcall = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastData = await forecastAPIcall.json();

    this.setState({forecastData: forecastData})

    console.log("Forecast data: ", forecastData);
  }

  // Take lat and lon from geolocation API to get Area from OpenWeather Reverse Geocoding API
  getAreaFromAPI = async (lat,lon) => {
    const rGeocodingAPIcall = await fetch(
      `${R_GEO_API_URL}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
    );
    const geoData = await rGeocodingAPIcall[0].json();

    // console.log("Area: ", geoData.name);
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
    // Used to update HTML elements in the rest of App
    function updateAllElementsOfClass(className, str) {
      const elements = document.getElementsByClassName(className);
  
      for (const element of elements) { element.innerHTML = str; }
    };

    function updateAllImagesOfClass(className, imgPath) {
      const elements = document.getElementsByClassName(className);
  
      for (const element of elements) { element.src = imgPath; }
    };

    function updateAllElements(area, dayTemp, icon) {
      console.log(document.getElementsByClassName("location-name"));
      updateAllElementsOfClass("location-name",area);
      updateAllElementsOfClass("temp-under-location",dayTemp+"&deg;C");
      updateAllImagesOfClass("current-weather-icon", icon);
    }

    const iconPath = "icons/";

    // get data from state variables
    const { lat, lon, area, weatherData, forecastData, errorMessage } = this.state;


    // only try to access data when it is not null (hasn't arrived from API)
    if (area && weatherData && forecastData) {

      const dayTemp = Math.round(weatherData.main.temp);
      const icon = iconPath +weatherData.weather[0].icon+ ".png";

      document.getElementById("geoLat").innerHTML = lat;
      document.getElementById("geoLon").innerHTML = lon;

    
      const forecastTempElement = "forecast-temp";
      for (var i = 0; i < 8; i++) {
        //document.getElementById(forecastTempElement + i).innerHTML = 
        // console.log(Math.round(forecastData.list[i].main.temp));
      }

      // test data output
      // return (
      //   <div className="weather-box">
      //     <div className="weather-item">{area}</div>      
      //     <div className="weather-item">{dayTemp} &deg;C</div>    
      //     <div>
      //       <img className="weather-icon" src={iconPath+icon} alt="weather icon"/>
      //     </div>    
      //   </div>
      // );      
    }
    else {
      // placeholder if data hasn't been received yet
      // return (
      //   <div>{errorMessage == null ? "Loading..." : errorMessage}</div>
      // )

      return(<></>)
    } 
  }
}

export default GeoWeather
  //   export const 

  // // export async function getPosition() {
  // //   const positionPromise = await getCoords();
  // //   let lat = await positionPromise.coords.latitude;
  // //   let lon = await positionPromise.coords.longitude;

  // //   //console.log([lat,lon]);
  // //   return [lat,lon];
  // // }

  // export async function getCity() {
  //   const [lat,lon] = await getPosition();

  //   const geoCall = await fetch(`${GEO_API_URL}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`);
  //   const json = await geoCall.json();
  //   return json[0].name;
  // }

