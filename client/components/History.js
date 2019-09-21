import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');



class History extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        History
      </div>
    );
  }

}

export default History;
