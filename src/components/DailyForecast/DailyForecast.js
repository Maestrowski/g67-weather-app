import "./DailyForecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DailyForecast = () => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek > 0? dayInAWeek-1: 6, WEEK_DAYS.length)
  .concat(WEEK_DAYS.slice(0, dayInAWeek > 0? dayInAWeek: 7));

  console.log(forecastDays);
  console.log(dayInAWeek);
  return (
      <div className="info-block-bottum">
        <div className="weekly-info-block-left">
          <div className="each-column">
            <div class="column">Today</div>
            <div class="column">{forecastDays[1]}</div>
            <div class="column">{forecastDays[2]}</div>
            <div class="column">{forecastDays[3]}</div>
            <div class="column">{forecastDays[4]}</div>
            <div class="column">{forecastDays[5]}</div>
            <div class="column">{forecastDays[6]}</div>
            <div class="column">{forecastDays[7]}</div>
          </div>
          <div class="each-column">
            <div id="forecast-temp0" class="column">4°C</div>
            <div id="forecast-temp2" class="column">5°C</div>
            <div id="forecast-temp3" class="column">5°C</div>
            <div id="forecast-temp4" class="column">3°C</div>
            <div id="forecast-temp4" class="column">6°C</div>
            <div id="forecast-temp5" class="column">6°C</div>
            <div id="forecast-temp6" class="column">7°C</div>
            <div id="forecast-temp7" class="column">7°C</div>
          </div>
        </div>
        </div>
  )
}

export default DailyForecast;
