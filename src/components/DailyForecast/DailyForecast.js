import "./DailyForecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DailyForecast = () => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
      <div className="info-block-bottum">
        <div className="weekly-info-block-left">
          <div className="each-column">
            <div class="column">Today</div>
            <div class="column">Monday</div>
            <div class="column">Tuesday</div>
            <div class="column">Wednesday</div>
            <div class="column">Thursday</div>
            <div class="column">Friday</div>
            <div class="column">Saturday</div>
            <div class="column">Sunday</div>
          </div>
          <div class="each-column">
            <div class="column">4°C</div>
            <div class="column">5°C</div>
            <div class="column">5°C</div>
            <div class="column">3°C</div>
            <div class="column">6°C</div>
            <div class="column">6°C</div>
            <div class="column">7°C</div>
            <div class="column">7°C</div>
          </div>
        </div>
        </div>
  )
}

export default DailyForecast;
