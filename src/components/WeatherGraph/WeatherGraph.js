import React from "react";
import "./WeatherGraph.css";

const WeatherGraph = ({ lat, lon, apiKey }) => {
  const layer = "temp_new"; // Change this to the desired weather layer
  const zoom = 3; // Adjust the zoom level as needed

  // Calculate tile coordinates based on latitude and longitude
  const tileX = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const tileY = Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );

  // Construct the tile URL
  const tileUrl = `https://tile.openweathermap.org/map/${layer}/${zoom}/${tileX}/${tileY}.png?appid=${apiKey}`;

  // Construct the target URL dynamically using latitude and longitude
  const targetUrl = `https://zoom.earth/maps/temperature/#view=${lat},${lon},6z/model=icon`;

  return (
    <div className="weather-graph-container">
      <div className="weather-graph-img-box">
        <a href={targetUrl} target="_blank" rel="noopener noreferrer">
          <img src={tileUrl} className="weather-graph-img" alt="Weather Map" />
        </a>
      </div>
    </div>
  );
};

export default WeatherGraph;
