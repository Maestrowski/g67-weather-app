import React from 'react';
import { WEATHER_API_URL, R_GEO_API_URL, WEATHER_API_KEY } from "./components/api";


// const getPosition = () => {
//   return new Promise(function(succ, err) {
//     navigator.geolocation.getCurrentPosition(succ, err);
//   });
// }

class GeoWeather extends React.Component {
  state = {
    lat: null,
    lon: null,

    area: null,

    weatherData: null,

    forecastData: null,
    errorMessage: undefined
  };

  getPosition = () => {
    return new Promise(function(succ, err) {
      navigator.geolocation.getCurrentPosition(succ, err);
    });
  }

  getWeatherForecastFromAPI = async (lat,lon) => {
    const weatherAPIcall = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const weatherData = await weatherAPIcall.json();

    this.setState({
      lat: lat,
      lon: lon,
      area: weatherData.name,

      weatherData: weatherData
    })

    console.log("Weather data: ", weatherData);
  }

  getForecastFromAPI = async (lat,lon) => {
    const forecastAPIcall = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastData = await forecastAPIcall.json();

    this.setState({forecastData: forecastData})

    console.log("Forecast data: ", forecastData);
  }

  getAreaFromAPI = async (lat,lon) => {
    const rGeocodingAPIcall = await fetch(
      `${R_GEO_API_URL}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
    );
    const geoData = await rGeocodingAPIcall[0].json();

    // console.log("Area: ", geoData.name);
  }

  componentDidMount() {
    this.getPosition()
    .then((position) => {
      this.getWeatherForecastFromAPI(position.coords.latitude,position.coords.longitude);
      this.getForecastFromAPI(position.coords.latitude,position.coords.longitude);
    }).catch((err) => console.log(err.message));

    this.weatherTimer = setInterval(
      () => this.getWeatherForecastFromAPI(this.state.lat,this.state.lon),60000);
    this.forecastTimer = setInterval(
      () => this.getForecastFromAPI(this.state.lat,this.state.lon),60000);
  }

  componentWillUnmount() {
    clearInterval(this.weatherTimer);
    clearInterval(this.forecastTimer);
  }

  render() {
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

    const { lat, lon, area, weatherData, forecastData } = this.state;
    if (area && weatherData && forecastData) {

      const dayTemp = Math.round(weatherData.main.temp);
      const icon = iconPath +weatherData.weather[0].icon+ ".png";
    
      const forecastTempElement = "forecast-temp";
      for (var i = 0; i < 8; i++) {
        //document.getElementById(forecastTempElement + i).innerHTML = 
        // console.log(Math.round(forecastData.list[i].main.temp));
      }

      return (
        <div className="weather-box">
          <div className="weather-item">{area}</div>      
          <div className="weather-item">{dayTemp} &deg;C</div>    
          <div>
            <img className="weather-icon" src={iconPath+icon} alt="weather icon"/>
          </div>    
        </div>
      );      
    }
    else {
      return (
        <div>Loading...</div>
      )
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

