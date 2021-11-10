import axios from "axios";

var endpoint = `https://api.openweathermap.org/data/2.5/onecall`;
var apiKey = ``;

let getWeatherByCity = (payload) => {
  const config = {
    method: "GET",
    url: `${endpoint}?lat=${payload.latitude}&lon=${payload.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`,
    data: payload,
    withCredentials: false,
    crossdomain: true,
    /*
      Axios uses: "application/json", ! always preflighted and can cause CORS issues !
      jQuery uses: "application/x-www-form-urlencoded", ! may be not preflighted !
    */
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //"Content-Type": "application/json",
    },
  };
  return axios(config);
};

export { getWeatherByCity };
