import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
import Outfit from './Outfit';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      selected: false,
    }
  }

  componentDidMount() {

    axios.get('/api/outfits/today')
    .then(response => {
      console.log(response)
      this.setState ({
        selected: response.data
      })
    }).catch(error => {
      console.log(error, '- Check current date outfit exists');
    })

    if (!this.state.selected) {
       axios.get('/api/outfits')
       .then(response => {
         this.setState ({
           outfits: response.data
         })
       }).catch(error => {
         console.log(error, '- Get outfit selections');
       })
      }
    }

  render() {
    const outfits = []
    console.log(this.state.outfits)
    if(this.state.outfits.length > 0){
      this.state.outfits.map((x, index) => {
        outfits.push(<Outfit key={index} item={x} selected={this.state.selected} />)
      })
    }

    return (
      <div>
      { this.state.selected ? (
         <h1>Today's outfit has already been selected</h1>
       ) : (
         <div>
           <h1>Select an outfit</h1>
           <div className="container">
             <div className="outfits-container">
               {outfits}
             </div>
           </div>
         </div>
      )}
      </div>
    );
  }
}

export default App;
