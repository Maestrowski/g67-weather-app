import "./DailyForecast.css";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DailyForecast = ({ data }) => {
  const todayIndex = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(todayIndex).concat(WEEK_DAYS.slice(0, todayIndex));

  console.log(forecastDays);
  console.log(dayInAWeek);
  return (
    <div className="info-block-bottum">
      <div className="weekly-info-block-left">
        <div className="each-column">
          {forecastDays.map((day, index) => {
            const icon = data && data.icons && data.icons[index] ? data.icons[index].icon : null;
            const temperature = data && data.temperatures ? data.temperatures[index % data.temperatures.length] : null;

            return (
              <div className="column" key={day}>
                <div className="forecast-item">
                  <div className="day">{day}</div>
                  <div className="temperature">{temperature ? `${temperature}°C` : '-'}</div>
                  {icon && <img className="weather-icon" src={icon} alt="Weather Icon" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;


