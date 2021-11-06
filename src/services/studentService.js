import axios from "axios";

var endpoint = `https://api.hatchways.io`;

let getStudents = (payload) => {
  const config = {
    method: "GET",
    url: `${endpoint}/assessment/students`,
    data: payload,
    withCredentials: false,
    crossdomain: true,
    /*
      Axios uses: "application/json", ! always preflighted and can cause CORS issues !
      jQuery uses: "application/x-www-form-urlencoded", ! may be not preflighted !
      Note: "application/x-www-form-urlencoded" used for accessability, but normally a 
      service handler and a proxy server would be used to handle "application/json" content.
    */
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //"Content-Type": "application/json",
    },
  };
  return axios(config);
};

export { getStudents };
