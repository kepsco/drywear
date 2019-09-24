import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router'
const axios = require('axios');
import Moment from 'react-moment';

class PreviousOutfit extends Component {

  constructor(props) {
    super(props);

    this.deleteOutfit = this.deleteOutfit.bind(this);
  }

  deleteOutfit(outfit_id, top_id, bottom_id, shoes_id) {
    axios.post('/api/remove', {
      id: outfit_id,
      topId: top_id,
      bottomId: bottom_id,
      shoesId: shoes_id,
    })
    .then(response => {
      // this.setState ({
      //   prevOutfits: response.data
      // })
      this.props.handleDeletePrevOutfit(response.data)
      console.log('Outfit deleted!')
    }).catch(error => {
      console.log(error, '- Get previous outfits');
    })
  }

  render() {

    const { top_image, bottom_image, shoes_image, date, id, top_id, bottom_id, shoes_id } = this.props.item;

    return (
      <div className="prev-outfit-block">
        <Moment format="MMMM DD, YYYY" className='prev-outfit-date'>{date}</Moment>
        <img src={top_image} className='prev-outfit-item' />
        <img src={bottom_image} className='prev-outfit-item' />
        <img src={shoes_image} className='prev-outfit-item' />
        <div className="prev-outfit-delete" onClick={() => this.deleteOutfit(id, top_id, bottom_id, shoes_id)}>DELETE</div>
      </div>
    )
  }
}

export default PreviousOutfit;
