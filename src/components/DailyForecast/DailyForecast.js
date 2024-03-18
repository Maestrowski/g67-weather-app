import "./DailyForecast.css";

const WEEK_DAYS = [, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

{/** Grab data from App.js */}
const DailyForecast = ({ data,timezone }) => { 

{/** Find todays day from the system */}

var todayIndex = new Date().getDay();
if (timezone) {
  const now = new Date(); 
  now.setTime(now.getTime() + (timezone*1000));
  const todayIndex = now.getDay(); // FIX THIS TO WORK WITH LOCATIONS FROM THE SEARCH BAR
}
  console.log(todayIndex);

{/** Put the days in correct order, if its Wednesday today Wednesday will be on top */}
const forecastDays = WEEK_DAYS.slice(todayIndex).concat(WEEK_DAYS.slice(0, todayIndex)); 

  return (
    <div className="info-block-bottum">
      <div className="weekly-info-block-left">
        <div className="each-column">
          {/**Get the weather forecast data */}
          {forecastDays.map((day, index) => { 
            const icon = data && data.icons && data.icons[index] ? data.icons[index].icon : null;
            const temperature = data && data.temperatures ? data.temperatures[index % data.temperatures.length] : null;
            {/**Display weather forecast data */}
            return (
              <div className="column" key={day}> 
                <div className="forecast-item">
                  <div className="current-day">{day}</div> {/**Display the day */}
                  <div className="temp">{temperature ? `${temperature}°C` : '-'}</div> {/**Display the weather */}
                  {icon && <img className="weather-icon" src={icon} alt="Weather Icon" />} {/**Display the appropriate icon */}
                  {icon ? null : <p>ICON NOT SHOWING</p> }
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


