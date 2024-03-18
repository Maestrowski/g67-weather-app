import { useState } from "react";
import "./Header.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Header = ({ onSearchChange, cityName, currentTemp, weatherIcon }) => {
  const [search, setSearch] = useState(null);

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
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="top-black-bar">
      <div className="greybar-in-blackbar">
        {/**Display city data */}
        <AsyncPaginate
          placeholder="Search for place"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
        {cityName && <div className="location-name">{cityName}</div>} {/**Display city name in the header*/}
        <div className="under-location-name">
          {currentTemp && <div className="temp-under-location">{Math.round(currentTemp)}°C</div>} {/**Display the current temperature in the header*/}
          {weatherIcon && <div className="small-icons-under-name"> {/**Display the appropriate weather icon in the header */}
            <img src={weatherIcon} alt="Weather Icon" />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Header;
