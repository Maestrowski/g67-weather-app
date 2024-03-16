import React from 'react'
import "./current-weather.css";

const CurrentWeather = () => {
  return (
    <div className="icon-info-middle">
      <div className='four-block-info'>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img className='current-uv-icon' src={`icons/uv.png`}/>
              </div>
            <div className='uv-index-info'>
                <span className='parameter-label'>UV-Index</span>
                <span className='parameter-value'>Low</span>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img className='current-humidity-icon' src={`icons/humidity.png`}/>
              </div>
            <div className='humidity-info'>
                <span className='parameter-label'>Humidity</span>
                <span className='parameter-value'> 84%</span>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img className='current-wind-icon' src={`icons/wind.png`} />
              </div>
            <div className='wind-info'>
                <span className='parameter-label'>Wind</span>
                <span className='parameter-value'>11km/h</span>
            </div>
          </div>
          <div className="single-block-info">
            <div className='current-icon'> 
                <img className='current-weather-icon' src={`icons/clouds.png`}/>
            </div>
            <div className='clouds-info'>
                <span className='parameter-label'>Clouds</span>
                <span className='parameter-value'>90%</span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CurrentWeather
