import "./App.css";
import "./index.css";
import React from "react";
import TodoList from "./components/redux/TodoList";
//import WeatherApp from "./components/WeatherApp";
//import StudentProfiles from "./components/StudentProfiles";

function App() {
  /*
  Note: 
  need to change over to functional component logic to get weather.

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

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
        {/*<StudentProfiles />*/}
        <TodoList />
      </div>
      {/*<WeatherApp location={this.state} />*/}
    </React.Fragment>
  );
}

export default React.memo(App);
