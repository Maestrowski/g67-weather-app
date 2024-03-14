import { GEO_API_URL, WEATHER_API_KEY } from "./api";

function getCoords() {
    return new Promise(function(succ, err) {
      navigator.geolocation.getCurrentPosition(succ, err);
    });
  }

export async function getPosition() {
    const positionPromise = await getCoords();
    let lat = await positionPromise.coords.latitude;
    let lon = await positionPromise.coords.longitude;

    //console.log([lat,lon]);
    return [lat,lon];
}

export async function getCity() {
    const [lat,lon] = await getPosition();

    const geoCall = await fetch(`${GEO_API_URL}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`);
    const json = await geoCall.json();
    return json[0].name;
}

