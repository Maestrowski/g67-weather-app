import React from "react";
import "./WeatherGraph.css";

const WeatherGraph = ({ lat, lon, apiKey }) => {
  const op = "TA2";
  const zoom = 5; // Adjust the zoom level as needed

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
  const tileUrl = `https://tile.openweathermap.org/map/${op}/${zoom}/${tileX}/${tileY}.png?appid=${apiKey}`;
  console.log(tileUrl)

  return (
    <div className="weather-graph-container">
      <div className="weather-graph-img-box">
          <img src={tileUrl} className="weather-graph-img" alt="Weather Map" />
      </div>
      <div className="temperature-legend">
        <h3>Temperature Scale</h3>
        <div className="legend-colors">
          {temperatureScale.map((item, index) => (
            <div
              key={index}
              className="legend-color"
              style={{ backgroundColor: item.color }}
            >
              {item.temperature}°C
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherGraph;

