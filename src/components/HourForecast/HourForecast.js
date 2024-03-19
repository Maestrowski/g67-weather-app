import React from 'react';
import "./HourForecast.css";

function HourWithOffset (offset, hourNow=new Date().getHours()) {
  return hourNow + offset > 23 ? (hourNow + offset) - 24 : hourNow + offset;
}

{/** Grab data from App.js */}
const HourForecast = ({ data, timezone }) => {
  
  var hourNow = new Date().getHours();
  if (timezone) {
    const now = new Date();
    now.setTime(now.getTime() + (timezone*1000));
    hourNow = now.getHours(); // FIX THIS TO WORK WITH LOCATIONS FROM THE SEARCH BAR
  }
  return (
    <div className="temp-of-day-section">
        <div className="temp-of-day-block">
          Temperature for the day
          {/* <div className='time-icon-temp'>
            <div id="tod0" className="time">Now</div>
            <div className="icon">
              <img id="hourlyIcon0" src={`icons/01d.png`} />
            </div>
          </div> */}
          <div className="weather-details-time">
            <div id="tod0" className="time">Now</div>
            <div id="tod1" className="time">{HourWithOffset(3,hourNow)}:00</div>
            <div id="tod2" className="time">{HourWithOffset(6,hourNow)}:00</div>
            <div id="tod3" className="time">{HourWithOffset(9,hourNow)}:00</div>
            <div id="tod4" className="time">{HourWithOffset(12,hourNow)}:00</div>
            <div id="tod5" className="time">{HourWithOffset(15,hourNow)}:00</div>
            <div id="tod6" className="time">{HourWithOffset(18,hourNow)}:00</div>
            <div id="tod7" className="time">{HourWithOffset(21,hourNow)}:00</div>
            <div id="tod8" className="time">{HourWithOffset(24,hourNow)}:00</div>
          </div>
          <div className="weather-details-icon">
          <div className="icon">
              <img id="hourlyIcon0"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon1"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon2"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon3"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon4"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon5"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon6"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon7"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="hourlyIcon8"src={`icons/01d.png`} />
            </div>
          </div>
          <div className="weather-details-temp">
            <div id="hourlyTemp0" className="temp">5°C</div>
            <div id="hourlyTemp1" className="temp">5°C</div> 
            <div id="hourlyTemp2" className="temp">4°C</div>
            <div id="hourlyTemp3" className="temp">4°C</div>
            <div id="hourlyTemp4" className="temp">3°C</div>
            <div id="hourlyTemp5" className="temp">3°C</div>
            <div id="hourlyTemp6" className="temp">3°C</div>
            <div id="hourlyTemp7" className="temp">2°C</div>
            <div id="hourlyTemp8" className="temp">2°C</div>
          </div>
        </div>
      </div>
  )
}

export default HourForecast
