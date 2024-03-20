import "./DailyForecast.css";
import "../Header/current-weather/current-weather.css";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Define a default weather icon URL
const DEFAULT_ICON = `icons/unknown.png`; // Adjust the path as per your project structure

const DailyForecast = ({ data, timezone }) => {
  // Find today's day from the system
  console.log(data);
  var todayIndex = new Date().getDay();
  if (timezone) {
    const now = new Date();
    now.setTime(now.getTime() + timezone * 1000);
    todayIndex = now.getDay();
  }

  // Put the days in correct order, if it's Wednesday today Wednesday will be on top
  const forecastDays = (WEEK_DAYS.slice(todayIndex).concat(
    WEEK_DAYS.slice(0, todayIndex)).slice(0,5)
  );

  const dayIndexFromFlatIndex = (todayIndex, flatIndex) => {
    return ((todayIndex)-1 + flatIndex > 6? ((todayIndex)-1 + flatIndex)-7 : (todayIndex)-1 + flatIndex);
  } 

  console.log(forecastDays);

  return (
    <div className="weekly-info-block-left">
      <div className="inner-flex">
        <div className="each-column">
          {/* Get the weather forecast data */}
          {forecastDays.map((day, index) => {
            const icon =
              data && data.icons && data.icons[todayIndex] && data.icons[(todayIndex+index)%7].icon
                ? data.icons[(todayIndex+index)%7].icon
                : null;

                console.log(icon);
            const temperature =
              data && data.temperatures
                ? data.temperatures[(todayIndex+index-1) % data.temperatures.length]
                : null;

                console.log(todayIndex+index %7);

            // Display weather forecast data
            return (
              <div className="column" key={day}>
                <div className="day">{day}</div> {/* Display the day */}
                <div className="temp">
                  {temperature !== null ? `${temperature}°C` : "-"}
                </div>{" "}
                {/* Display the temperature */}
                {
                  <img
                    className="weather-icon"
                    src={icon ? icon : DEFAULT_ICON} // Use default icon if icon is null
                    alt="Weather Icon"
                  />
                }{" "}
                {/* Display the weather icon */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;
