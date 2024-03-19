import { useState } from "react";
import "./Header.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";
import GeoWeather from "../../GeoWeather";
import React from "react";

const Header = ({ onSearchChange, onUseLocation, cityName, currentTemp, weatherIcon }) => {
  const [search, setSearch] = useState(null);
  const [useLocation, setUseLocation] = useState(false);

  {/** Load all the cities to select */}

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  {/**Let the user select the city */}

  const handleOnChange = (searchData) => {
    setUseLocation(false);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const handleUseLocation = (locationData) => {
    setUseLocation(true);
    setSearch("");
    onUseLocation();
  };

  return (
    <div className="anim-background">
      <div className="top-black-bar">
        <p hidden id="geoLat"></p>
        <p hidden id="geoLon"></p>
        <div className="greybar-in-blackbar">
            <div className="location" />
              {/**Display city data */}
              <AsyncPaginate
                placeholder="Search for place"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
              />
          <div/>
          {cityName && <div className="location-name">{cityName}</div>} {/**Display city name in the header*/}
          <div className="under-location-name">
            {currentTemp && <div id="temp-under-location" className="temp">{Math.round(currentTemp)}°C</div>} {/**Display the current temperature in the header*/}
            {weatherIcon && <div id="small-icons-under-name" className="weather-icon"> {/**Display the appropriate weather icon in the header */}
              <img src={weatherIcon} alt="Weather Icon" />
            </div>}
          </div>
          <button className="use-location-button" onClick={handleUseLocation}>Use Location</button> 
        </div>
      </div>
    </div>
  );
};

export default Header;
