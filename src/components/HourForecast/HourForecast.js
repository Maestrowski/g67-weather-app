import React from 'react';
import "./HourForecast.css";

const HourForecast = () => {
  return (
    <div className="temp-of-day-section">
        <div className="temp-of-day-block">
          Temperature for the day
          <div className="weather-details-time">
            <div className="time">Now</div>
            <div className="time">01</div>
            <div className="time">02</div>
            <div className="time">03</div>
            <div className="time">04</div>
            <div className="time">05</div>
            <div className="time">06</div>
            <div className="time">07</div>
            <div className="time">08</div>
            <div className="time">09</div>
            <div className="time">10</div>
            <div className="time">11</div>
            <div className="time">12</div>
          </div>
          <div className="weather-details-icon">
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img src={`icons/01d.png`} />
            </div>
          </div>
          <div className="weather-details-temp">
          <div className="temp">5°C</div>
            <div className="temp">5°C</div> 
            <div className="temp">4°C</div>
            <div className="temp">4°C</div>
            <div className="temp">3°C</div>
            <div className="temp">3°C</div>
            <div className="temp">3°C</div>
            <div className="temp">2°C</div>
            <div className="temp">2°C</div>
            <div className="temp">3°C</div>
            <div className="temp">4°C</div>
            <div className="temp">5°C</div>
            <div className="temp">5°C</div>
          </div>
        </div>
      </div>
  )
}

export default HourForecast
