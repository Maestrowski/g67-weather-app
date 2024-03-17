import "./DailyForecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DailyForecast = () => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
      <div className="info-block-bottum">
        <div className="weekly-info-block-left">
          <div className="each-column">
            <div className="column">Today</div>
            <div className="column">Tuesday</div>
            <div className="column">Wednesday</div>
            <div className="column">Thursday</div>
            <div className="column">Friday</div>
            <div className="column">Saturday</div>
            <div className="column">Sunday</div>
          </div>
          <div className="each-column">
            <div className="column">4°C</div>
            <div className="column">5°C</div>
            <div className="column">3°C</div>
            <div className="column">6°C</div>
            <div className="column">6°C</div>
            <div className="column">7°C</div>
            <div className="column">7°C</div>
          </div>
        </div>
        </div>
  )
}

export default DailyForecast;
