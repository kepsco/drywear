import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');
import Outfit from './Outfit';
import FeaturedOutfit from './FeaturedOutfit';
import Select from 'react-select';


const options = [
  { value: 'cold', label: 'Cold' },
  { value: 'hot', label: 'Hot' },
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      selected: false,
      weather: null,
      todaysOutfit: [],
    }

    this.handleWeather = this.handleWeather.bind(this);
  }

  componentDidMount() {
    // Check if today's outfit is selected, change select state to true
    axios.get('/api/outfits/today')
    .then(response => {
      this.setState ({
        selected: response.data.today,
        todaysOutfit: response.data.outfit
      })
    }).catch(error => {
      console.log(error, '- Check current date outfit exists');
    })

    // Check if today's outfit is selected, change select state to true
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

  handleWeather(weather) {
    this.setState({ weather });
    axios.post('/api/filterOutfits', {
      weather: weather
    })
    .then(response => {
      this.setState ({
        outfits: response.data
      })
    }).catch(error => {
      console.log(error, '- Cant filter weather on outfits');
    })
  }


  render() {

    const { weather } = this.state;

    const outfits = []
    console.log(this.state.outfits)
    if(this.state.outfits.length > 0){
      this.state.outfits.map((x, index) => {
        outfits.push(<Outfit key={index} item={x} selected={this.state.selected} />)
      })
    }

    const customStyles = {
      control: (base, state) => ({
        ...base,
        '&:hover': { borderColor: 'gray' },
          border: '1px solid lightgray',
          boxShadow: 'none',
      }),
      option: (base, state) => ({
        ...base,
        '&': {
            backgroundColor: 'transparent',
        }, color: 'black'
      })
    };

    return (
      <div>
      { this.state.selected ? (
        <div>
         <h1 className="featured-text">Today's outfit has already been selected</h1>
         <FeaturedOutfit item={this.state.todaysOutfit[0]} selected={this.state.selected} />
        </div>
       ) : (
         <div>
           <h1>Select an outfit</h1>
           <div className="container">
           <div className="select-weather">
              <Select
                value={weather}
                onChange={this.handleWeather}
                options={options}
                styles={customStyles}
              />
            </div>
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
