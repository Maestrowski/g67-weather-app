import React from 'react';
import "./HourForecast.css";

const HourForecast = () => {
  const hourNow = new Date().getHours(); // FIX THIS TO WORK WITH LOCATIONS FROM THE SEARCH BAR

  return (
    <div className="temp-of-day-section">
        <div className="temp-of-day-block">
          Temperature for the day
          <div className="weather-details-time">
            <div id="tod0" className="time">Now</div>
            <div id="tod1" className="time">{hourNow + 1 > 23 ? (hourNow + 1) - 23 : hourNow +1}</div>
            <div id="tod2" className="time">{hourNow + 2 > 23 ? (hourNow + 2) - 23 : hourNow +2}</div>
            <div id="tod3" className="time">{hourNow + 3 > 23 ? (hourNow + 3) - 23 : hourNow +3}</div>
            <div id="tod4" className="time">{hourNow + 4 > 23 ? (hourNow + 4) - 23 : hourNow +4}</div>
            <div id="tod5" className="time">{hourNow + 5 > 23 ? (hourNow + 5) - 23 : hourNow +5}</div>
            <div id="tod6" className="time">{hourNow + 6 > 23 ? (hourNow + 6) - 23 : hourNow +6}</div>
            <div id="tod7" className="time">{hourNow + 7 > 23 ? (hourNow + 7) - 23 : hourNow +7}</div>
            <div id="tod8" className="time">{hourNow + 8 > 23 ? (hourNow + 8) - 23 : hourNow +8}</div>
            <div id="tod9" className="time">{hourNow + 9 > 23 ? (hourNow + 9) - 23 : hourNow +9}</div>
            <div id="tod10" className="time">{hourNow + 10 > 23 ? (hourNow + 10) - 23 : hourNow +10}</div>
            <div id="tod11" className="time">{hourNow + 11 > 23 ? (hourNow + 11) - 23 : hourNow +11}</div>
            <div id="tod12" className="time">{hourNow + 12 > 23 ? (hourNow + 12 ) - 23 : hourNow +12}</div>
          </div>
          <div className="weather-details-icon">
            <div className="icon">
              <img id="dailyIcon0" src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon1"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon2"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon3"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon4"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon5"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon6"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon7"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon8"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon9"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon10"src={`icons/01d.png`} />
            </div>
            <div className="icon">
              <img id="dailyIcon11"src={`icons/01d.png`} />
            </div>
          </div>
          <div className="weather-details-temp">
          <div id="dailyTemp0" className="temp">5°C</div>
            <div id="dailyTemp0" className="temp">5°C</div> 
            <div id="dailyTemp1" className="temp">4°C</div>
            <div id="dailyTemp2" className="temp">4°C</div>
            <div id="dailyTemp3" className="temp">3°C</div>
            <div id="dailyTemp4" className="temp">3°C</div>
            <div id="dailyTemp5" className="temp">3°C</div>
            <div id="dailyTemp6" className="temp">2°C</div>
            <div id="dailyTemp7" className="temp">2°C</div>
            <div id="dailyTemp8" className="temp">3°C</div>
            <div id="dailyTemp9" className="temp">4°C</div>
            <div id="dailyTemp10" className="temp">5°C</div>
            <div id="dailyTemp11" className="temp">5°C</div>
          </div>
        </div>
      </div>
  )
}

export default HourForecast
