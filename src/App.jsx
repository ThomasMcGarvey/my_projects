import "./App.css";
import "./index.css";
//import React, { useEffect, useState } from "react";
import React from "react";
//import WeatherApp from "./components/WeatherApp";
import StudentProfiles from "./components/StudentProfiles";

function App() {
  //const [latitude, setLatitude] = useState();
  //const [longitude, setLongitude] = useState();

  //==========( EFFECT HOOKS )

  // useEffect to handle the changes in students "state" values.
  /*
Note need to change over to functional component

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/

  /*
  // Note: WeatherApp component used for practice.

  componentDidMount = () => {
  };

  setLocation = (position) => {
    console.log("position:", position);
    this.setState(() => {
      let longitude = { ...this.state.location.longitude };
      longitude = position.coords.longitude;
      return { longitude};
    });
  };
*/

  return (
    <React.Fragment>
      <div className="base-bg">
        <StudentProfiles />
      </div>
      {/*<WeatherApp location={this.state} />*/}
    </React.Fragment>
  );
}

export default React.memo(App);
