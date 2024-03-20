import React from 'react';
import "./HourForecast.css";

function HourWithOffset (offset, hourNow=new Date().getHours()) {
  return hourNow + offset > 23 ? (hourNow + offset) - 24 : hourNow + offset;
}

{/** Grab data from App.js */}
const HourForecast = ({ data, timezone }) => {
  console.log(data);
  var hourNow = new Date().getHours();
  if (timezone) {
    const now = new Date();
    now.setTime(now.getTime() + (timezone*1000));
    hourNow = now.getHours();
  }

  return (
    <div className="temp-of-day-section">
        <div className="temp-of-day-block">
          <p id="temp-of-day-title">Temperature for the day</p>
          <div className='weather-carousel'>


          {/* Get the weather forecast data */}
          {data.map((day, index) => {
            const icon =
              data && data[index] && data[index].icon
                ? data[index].icon
                : null;
            const temp =
              data && data[index].temp
                ? data[index].temp
                : null;
            
            

            return (
              // Display weather forecast data
              <div className='time-icon-temp'>
                <div id={`tod${index}`} className="time">{index == 0? "Now" : HourWithOffset(index*3,hourNow)+":00"}</div>
                <div className="icon">
                  <img id={`hourlyIcon${index}`}src={icon} />
                </div>
                <div id={`hourlyTemp${index}`} className="temp">{Math.round(temp)}°C</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default HourForecast
