import "./current-weather.css";



const CurrentWeather = ({ data }) => {


  const LowHumidity = 55;

  const HighWind = 10;

  const HumidityLevel = data.main.humidity <= LowHumidity; // Check if humidity is less than or equal to 55%

  const WindLevel = data.wind.speed > HighWind; // Check if wind is greater than 20 m/s

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
              {HumidityLevel && <span className="HumidityWarning">Make sure to water your crops today!!</span>}
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
              <p></p>
              {WindLevel && <span className="High-Wind">
                <b>WARNING: </b>Take extra care of crops and plants today</span>}
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
