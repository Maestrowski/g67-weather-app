import React from 'react'
import "./current-weather.css";

const CurrentWeather = () => {
  return (
    <div className="icon-info-middle">
      <div className='four-block-info'>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/uv.png`}/>
              </div>
            <div className='uv-index-info'>
                <p className='parameter-label'>UV-Index</p>
                <p className='parameter-value'>Low</p>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/humidity.png`}/>
              </div>
            <div className='humidity-info'>
                <p className='parameter-label'>Humidity</p>
                <p className='parameter-value'> 84%</p>
            </div>
          </div>
          <div className="single-block-info">
              <div className='current-icon'> 
                <img src={`icons/wind.png`} />
              </div>
            <div className='wind-info'>
                <p className='parameter-label'>Wind</p>
                <p className='parameter-value'>11km/h</p>
            </div>
          </div>
          <div className="single-block-info">
            <div className='current-icon'> 
                <img src={`icons/clouds.png`}/>
            </div>
            <div className='clouds-info'>
                <p className='parameter-label'>Clouds</p>
                <p className='parameter-value'>90%</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CurrentWeather
