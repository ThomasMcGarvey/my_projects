import "./App.css";
import "./index.css";
import React from "react";
//import WeatherApp from "./components/WeatherApp";
import StudentProfiles from "./components/StudentProfiles";

class App extends React.Component {
  state = {
    location: {
      latitude: "",
      longitude: "",
    },
  };

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

  render() {
    return (
      <React.Fragment>
        <div className="base-bg">
          <StudentProfiles />
        </div>
        {/*<WeatherApp location={this.state} />*/}
      </React.Fragment>
    );
  }
}

export default App;
