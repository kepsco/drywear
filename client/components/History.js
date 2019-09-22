import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
import Moment from 'react-moment';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevOutfits : [],
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
        prevOutfits.push(<PrevOutfit key={index} item={x} />)
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

function PrevOutfit(props) {
  return (
    <div className="prev-outfit-block">
      <Moment format="MMMM DD, YYYY" className='prev-outfit-date'>{props.item.date}</Moment>
      <img src={props.item.top} className='prev-outfit-item' />
      <img src={props.item.bottom} className='prev-outfit-item' />
      <img src={props.item.shoes} className='prev-outfit-item' />
    </div>
  )
}

export default History;
