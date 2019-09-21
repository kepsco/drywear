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
      </div>
    );
  }
}

export default App;
