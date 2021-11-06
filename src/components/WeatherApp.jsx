import React, { useEffect, useState } from "react";
import * as weatherService from "../services/weatherService.js";

function WeatherApp(props) {
  //==========( STATE HOOKS )

  const [displayWeather, setDisplayWeather] = useState();

  //==========( EFFECT HOOKS )

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Location available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        getWeather(position.coords);
      });
    } else {
      console.log("Location not Available");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //==========( AJAX CALL )

  const getWeather = (values) => {
    weatherService
      .getWeatherByCity(values)
      .then(getWeatherSuccess)
      .catch(getWeatherError);
  };

  const getWeatherSuccess = (response) => {
    let daily = response.data.daily;
    daily.splice(5);
    let mappedWeather = daily.map(mapWeather);
    setDisplayWeather(mappedWeather);
  };

  const getWeatherError = (response) => {
    console.log("Error", response);
  };

  //==========( MAP WEATHER )

  const mapWeather = (day) => (
    <React.Fragment key={`weather${day.dt}`}>
      <div className="col">
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>

        <div className="row">
          <div className="col">{kelvinToFahrenheit(day.temp.max)}&#176;</div>
          <div className="col">{kelvinToFahrenheit(day.temp.min)}&#176;</div>
        </div>
      </div>
    </React.Fragment>
  );

  const kelvinToFahrenheit = (kelvin) => {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  };

  return (
    <div className="container">
      <div className="row">{displayWeather}</div>
    </div>
  );
}

export default React.memo(WeatherApp);
