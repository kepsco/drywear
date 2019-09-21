import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container">
         <p>Hello World!</p>
         <form>
          <label>
            Image:
            <input type="file" name="image" />
          </label>
          <label>
            Type:
            <input type="file" name="image" />
          </label>
          <label>
            Color:
            <input type="file" name="image" />
          </label>
          <label>
            Weather (sunny, rainy, both):
            <input type="file" name="image" />
          </label>
          <label>
            Temperature (cold, hot):
            <input type="file" name="image" />
          </label>
          <label>
            Formal (true, false):
            <input type="file" name="image" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
