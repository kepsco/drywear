import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router'
const axios = require('axios');
import Moment from 'react-moment';

class FeaturedOutfit extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { top_image, bottom_image, shoes_image, date, id, top_id, bottom_id, shoes_id } = this.props.item;

    return (
      <div className="featured-outfit">
        <img src={top_image} className='prev-outfit-item' />
        <img src={bottom_image} className='prev-outfit-item' />
        <img src={shoes_image} className='prev-outfit-item' />
      </div>
    )
  }
}

export default FeaturedOutfit;
