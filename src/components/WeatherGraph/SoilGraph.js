import React from "react";
import "./SoilGraph.css";

const SoilGraph = ({ lat, lon, apiKey }) => {
  const op = "TS0"; // Soil temperature at 0-10cm depth
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

  // Define soil temperature legend
  const soilTemperatureLegend = [
    { temperature: -5, color: "#008000" },   // Green for very cold temperatures
    { temperature: 0, color: "#FFFF00" },    // Yellow for cold temperatures
    { temperature: 10, color: "#FFA500" },   // Orange for moderate temperatures
    { temperature: 15, color: "#FF0000" },   // Red for warm temperatures
    { temperature: 20, color: "#800000" },   // Maroon for hot temperatures
    { temperature: 25, color: "#AA0080" },   // Purple for very hot temperatures
    { temperature: 30, color: "#0040F0" },   // Navy blue for extremely hot temperatures
    { temperature: 35, color: "#0000FF" },   // Blue for very extremely hot temperatures
  ];

  return (
    <div className="soil-graph-container">
      <div className="soil-graph-img-box">
        <img src={tileUrl} className="soil-graph-img" alt="Soil Temperature Map" />
      </div>
      <div className="temperature-scale">
        <h3>Soil (0-10cm depth) Temperature Legend</h3>
        <div className="scale-colors">
          {soilTemperatureLegend.map((item, index) => (
            <div
              key={index}
              className="scale-color"
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

