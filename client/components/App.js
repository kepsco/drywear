import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
import Outfit from './Outfit';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfits : [],
    }
  }

  componentDidMount() {
   axios.get('/api/outfits')
   .then(response => {
     console.log(response.data)
     this.setState ({
       outfits: response.data
     })
   }).catch(error => {
     console.log(error, '- Get outfit selections');
   })
  }

  render() {
    const outfits = []
    if(this.state.outfits.length > 0){
      this.state.outfits.map((x, index) => {
        outfits.push(<Outfit key={index} item={x} />)
      })
    }

    return (
      <div>
      <h1>Select an outfit</h1>
      <div className="container">
        <div className="outfits-container">
          {outfits}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
