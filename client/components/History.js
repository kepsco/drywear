import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
import Moment from 'react-moment';
import PreviousOutfit from './PreviousOutfit';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevOutfits: [],
    }
  }

  componentDidMount() {
   axios.get('/api/history')
   .then(response => {
     this.setState ({
       prevOutfits: response.data
     })
   }).catch(error => {
     console.log(error, '- Get previous outfits');
   })
  }


  render() {

    const prevOutfits = []
    console.log(this.state.prevOutfits)
    if (this.state.prevOutfits.length > 0){
      this.state.prevOutfits.map((x, index) => {
        prevOutfits.push(<PreviousOutfit key={index} item={x} history={this.state.prevOutfits} />)
      })
    }

    return (
      <div>
        <div className="main-outfit">
        </div>
        <div className="previous-outfits">
          {prevOutfits}
        </div>
      </div>
    );
  }
}



export default History;
