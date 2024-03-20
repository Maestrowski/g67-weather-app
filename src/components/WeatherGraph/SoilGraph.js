import React from "react";
import "./SoilGraph.css";

const SoilGraph = ({ lat, lon, apiKey }) => {
  const op = "TS0"; // Temperature at 2 meters
  const zoom = 10; // Adjust the zoom level as needed

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
  const tileUrl = `http://maps.openweathermap.org/maps/2.0/weather/${op}/${zoom}/${tileX}/${tileY}?appid=${apiKey}`;

  // Define temperature legend
  const colourScale = [
    { temperature: -5, color: "#008000" },   // Green for very cold temperatures
    { temperature: 0, color: "#FFFF00" },    // Yellow for cold temperatures
    { temperature: 10, color: "#FFA500" },   // Orange for moderate temperatures
    { temperature: 15, color: "#FF0000" },   // Red for warm temperatures
    { temperature: 20, color: "#800000" },   // Maroon for hot temperatures
    { temperature: 25, color: "#AA0080" },   // Brighter purple for very hot temperatures
    { temperature: 30, color: "#0040F0" },   // Brighter navy blue for extremely hot temperatures
    { temperature: 35, color: "#0000FF" },   // Brighter blue for very extremely hot temperatures
  ];
  

  return (
    <div className="weather-graph-container">
      <div className="weather-graph-img-box">
        <img src={tileUrl} className="weather-graph-img" alt="Weather Map" />
      </div>
      <div className="temperature-legend">
        <h3>Soil Temperature</h3>
        <div className="legend-colors">
          {colourScale.map((item, index) => (
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

export default SoilGraph;
