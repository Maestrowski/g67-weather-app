import React from "react";
import "./WeatherGraph.css";

const WeatherGraph = ({ lat, lon, apiKey }) => {
  const op = "TA2"; // Temperature at 2 meters
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
  const tileUrl = `http://maps.openweathermap.org/maps/2.0/weather/${op}/${zoom}/${tileX}/${tileY}?appid=${apiKey}&fill_bound=true&opacity=0.6&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014`;

  // Define temperature legend
  const temperatureLegend = [
    { temperature: -65, color: "#821692" },
    { temperature: -55, color: "#821692" },
    { temperature: -45, color: "#821692" },
    { temperature: -40, color: "#821692" },
    { temperature: -30, color: "#8257db" },
    { temperature: -20, color: "#208cec" },
    { temperature: -10, color: "#20c4e8" },
    { temperature: 0, color: "#23dddd" },
    { temperature: 10, color: "#c2ff28" },
    { temperature: 20, color: "#fff028" },
    { temperature: 25, color: "#ffc228" },
    { temperature: 30, color: "#fc8014" },
  ];

  return (
    <div className="weather-graph-container">
      <div className="weather-graph-img-box">
        <img src={tileUrl} className="weather-graph-img" alt="Weather Map" />
      </div>
      <div className="temperature-legend">
        <h3>Temperature Scale</h3>
        <div className="legend-colors">
          {temperatureLegend.map((item, index) => (
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
