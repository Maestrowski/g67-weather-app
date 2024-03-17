import "./current-weather.css";

const CurrentWeather = ({data}) => {
  if (!data) {
  return (
    <div className="icon-info-middle">
      <div className='four-block-info'>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/uv.png`}/>
              </div>
            <div className='uv-index-info'>
                <span className='parameter-label'>UV-Index</span>
                <span className='parameter-value'>N/A</span>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/humidity.png`}/>
              </div>
            <div className='humidity-info'>
                <span className='parameter-label'>Humidity</span>
                <span className='parameter-value'>N/A</span>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/wind.png`} />
              </div>
            <div className='wind-info'>
                <span className='parameter-label'>Wind</span>
                <span className='parameter-value'>11 m/s</span>
            </div>
          </div>
          <div className="single-block-info">
            <div className='current-icon'> 
                <img src={`icons/clouds.png`}/>
            </div>
            <div className='clouds-info'>
                <span className='parameter-label'>Clouds</span>
                <span className='parameter-value'>N/A</span>
            </div>
          </div>
      </div>
    </div>
  )
  }

  return (
    <div className="icon-info-middle">
    <div className='four-block-info'>
        <div className="single-block-info">
            <div className='current-icon'> 
              <img src={`icons/uv.png`}/>
            </div>
          <div className='uv-index-info'>
              <span className='parameter-label'>Pressure</span>
              <span className='parameter-value'>{data.main.pressure}hPa</span>
          </div>
        </div>
        <div className="single-block-info">
            <div className='current-icon'> 
              <img src={`icons/humidity.png`}/>
            </div>
          <div className='humidity-info'>
              <span className='parameter-label'>Humidity</span>
              <span className='parameter-value'>{data.main.humidity}%</span>
          </div>
        </div>
        <div className="single-block-info">
            <div className='current-icon'> 
              <img src={`icons/wind.png`} />
            </div>
          <div className='wind-info'>
              <span className='parameter-label'>Wind</span>
              <span className='parameter-value'>{data.wind.speed} m/s</span>
          </div>
        </div>
        <div className="single-block-info">
          <div className='current-icon'> 
              <img src={`icons/clouds.png`}/>
          </div>
          <div className='clouds-info'>
              <span className='parameter-label'>Clouds</span>
              <span className='parameter-value'>{data.clouds.all}%</span>
          </div>
        </div>
    </div>
  </div>
  );
}

export default CurrentWeather;
