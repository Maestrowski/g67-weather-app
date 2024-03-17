import { useState } from "react";
import "./Header.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Header = ({ onSearchChange, cityName, currentTemp, weatherIcon }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
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

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="top-black-bar">
      <div className="greybar-in-blackbar">
        <AsyncPaginate
          placeholder="Search for place"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
        <div className="location-name">{cityName}</div>
        <div className="under-location-name">
          <div className="temp-under-location">{Math.round(currentTemp)}°C</div>
          <div className="small-icons-under-name">
            <img src={weatherIcon} alt="Weather Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
