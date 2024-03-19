import "./current-weather.css";



const CurrentWeather = ({ data }) => {

  const CloudWarningLevel = 60;

  const HighHumidity = 55;

  const CloudWarning = data.clouds.all > CloudWarningLevel;

  const HumidityLevel = data.main.humidity >= HighHumidity;

  return (
    <div className="icon-info-middle">
      <div className="inner-flex">
        <div className="four-block-info">
          {/**Display current pressuer data */}
          <div className="single-block-info">
            <div className="current-icon">
              <img src={`icons/pressure.png`} />
            </div>
            <div className="pressure-info">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure}hPA </span>
            </div>
          </div>
          {/**Display current humidity data */}
          <div className="single-block-info">
            <div className="current-icon">
              <img src={`icons/humidity.png`} />
            </div>
            <div className="humidity-info">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
          </div>
          {/**Display current wind speed data */}
          <div className="single-block-info">
            <div className="current-icon">
              <img src={`icons/wind.png`} />
            </div>
            <div className="wind-info">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
          </div>
          {/**Display current cloud percentage data */}
          <div className="single-block-info">
            <div className="current-icon">
              <img src={`icons/clouds.png`} />
            </div>
            <div className="clouds-info">
              <span className="parameter-label">Clouds</span>
              <span className="parameter-value">{data.clouds.all}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
};

export default CurrentWeather;
