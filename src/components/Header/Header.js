import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <div className="top-black-bar">
        <div className="greybar-in-blackbar">
          <div className="location-name">London</div>
          <div className="under-location-name">
            <div className= "temp-under-location">5°C</div>
            <div className="small-icons-under-name">{/*Image(url)*/}</div>
          </div>
        </div>
      </div>
  )
}

export default Header

 