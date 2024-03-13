import React from 'react';
import "./HourForecast.css";

const HourForecast = () => {
  return (
    <div class="temp-of-day-section">
        <div class="temp-of-day-block">
          Temperature for the day
          <div class="weather-details-time">
            <div class="time">Now</div>
            <div class="time">01</div>
            <div class="time">02</div>
            <div class="time">03</div>
            <div class="time">04</div>
            <div class="time">05</div>
            <div class="time">06</div>
            <div class="time">07</div>
            <div class="time">08</div>
            <div class="time">09</div>
            <div class="time">10</div>
            <div class="time">11</div>
            <div class="time">12</div>
          </div>
          <div class="weather-details-icon">
            <div className=''>{/*icons here*/}</div>
          </div>
          <div class="weather-details-temp">
            {/*Temperatures here*/}
          </div>
        </div>
      </div>
  )
}

export default HourForecast
