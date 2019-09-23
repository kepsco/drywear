import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfits : [],
      mainOutfit: [],
    }
  }

  componentDidMount() {
   axios.get('/api/outfits')
   .then(response => {
     console.log(response.data);
     this.setState ({
       outfits: response.data
     })
   }).catch(error => {
     console.log(error, '- Error');
   })
  }


  render() {
    const outfits = []
    console.log(this.state.outfits)
    if(this.state.outfits.length > 0){
      this.state.outfits.map(x => {
        //console.log(x.top.image)
        outfits.push(<Outfit item={x} />)
      })
    }

    return (
      <div className = "container">
        <div className = "otherOutfits">
          {outfits}
        </div>
      </div>
    );
  }
}

function Outfit(props) {
  return (
    <div className="outfit-block">
      <img src={props.item.top.image} />
      <img src={props.item.bottom.image} className="bottom"/>
      <img src={props.item.shoes.image}/>
    </div>
  )
}

export default App;
