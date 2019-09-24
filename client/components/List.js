import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Select from 'react-select';
import styles from "../index.css";
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/';

const options = [
  {value: 'top', label: 'Top'},
  {value: 'bottom', label: 'Bottom'},
  {value: 'shoes', label: 'Shoes'},
];

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageUrl: '',
      items :[],
      selected : false,
      type: null,
      color: 'light',
      weather: 'cold',
      isFormal: false,
    }
    this.selectImages = this.selectImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectItemType = this.handleSelectItemType.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setWeather = this.setWeather.bind(this);
    this.setFormal = this.setFormal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/items')
    .then(response => {
      this.setState ({
        selected: response.data
      })
    }).catch(error => {
      console.log(error, '- Check current date outfit exists');
    })
    if (!this.state.selected) {
      axios.get('/api/items')
      .then(response => {
        this.setState ({
          items: response.data
        })
      }).catch(error => {
        console.log(error, '- Get outfit selections');
      })
     }
   }

  selectImages(event) {

    console.log('in selectImages', event.target.files[0].name)

    let image = event.target.files[0];
    console.log(image, image.name);

    if(image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.setState({ image })
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("type", this.state.type.value);
    data.append("color", this.state.color);
    data.append("weather", this.state.weather);
    data.append("isFormal", this.state.isFormal);
    data.append("image", this.state.image);
    // Make an AJAX upload request using Axios
    console.log('data', data, this.state.image);
    axios.post('/api/items', data)
      .then(response => {
        this.setState({
          imageUrl: response.data.imageUrl,
        });
      })
      .catch(err => alert(err.message));
  }

  handleSelectItemType(type) {
    this.setState({ type }, () => console.log('in handleSelectItemType', type))
  }

  setColor(event) {
    event.persist();
    this.setState({color: event.target.value}, () => console.log('in setColor', event.target.value))
  }

  setWeather(event) {
    event.persist();
    this.setState({weather: event.target.value}, () => console.log('in setweather', event.target.value))
  }

  setFormal(event) {
    event.persist();
    if (event.target.value === 'true') {
      this.setState({isFormal: true}, () => console.log('in setisFormal', event.target.value))
    } else {
      this.setState({isFormal: false}, () => console.log('in setisFormal', event.target.value))
    }
  }

  render() {
    const tops = [];
    const bottom =[];
    const shoes =[];
    
    for(let i = 0; i < this.state.items.length; i++){
      //console.log(this.state.items)
      if(this.state.items[i].type === "top")
      tops.push(indvoutfit(this.state.items[i]))
      if(this.state.items[i].type === "bottom")
      bottom.push(indvoutfit(this.state.items[i]))
      if(this.state.items[i].type === "shoes")
      shoes.push(indvoutfit(this.state.items[i]))
      
    }


    const { type } = this.state;

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
        <h1>TOPS</h1>
          <div className ="typegroup"> {tops}</div>
        <h1>BOTTOMS</h1>
          <div className ="typegroup"> {bottom}</div>
        <h1>SHOES</h1>
          <div className ="typegroup"> {shoes}</div>


          <h2>Add New Item</h2>
          <form encType="multipart/form-data" >
          <input type="file" name="image" onChange={this.selectImages} />
          <div className="select-item">
            <Select 
              value={type} 
              onChange={this.handleSelectItemType} 
              options={options} 
              styles={customStyles}
            />
          </div>
          <div className="select-item">
            <input type="radio" value="light" name="color" checked={this.state.color==="light"}  onChange={this.setColor}/> Light
            <input type="radio" value="dark" name="color" checked={this.state.color==="dark"}  onChange={this.setColor}/> Dark
          </div>
          <div className="select-item">
            <input type="radio" value="cold" name="weather" checked={this.state.weather==="cold"} onChange={this.setWeather}/> Cold
            <input type="radio" value="hot" name="weather" checked={this.state.weather==="hot"} onChange={this.setWeather} /> Hot
          </div>
          <div className="select-item">
            <input type="radio" value="true" name="formal" checked={this.state.isFormal} onChange={this.setFormal} /> Formal
            <input type="radio" value="false" name="formal" checked={!this.state.isFormal} onChange={this.setFormal}/> Informal
          </div>
          <button value="Submit" onClick={this.handleSubmit}>Submit</button>
        </form>

        {this.state.imageUrl && ( 
        <div>
          <img src={BASE_URL + this.state.imageUrl} alt="not available"/>
          <br/>
        </div>
        )}

      </div>
    );
  }
}

function indvoutfit(props){
  return  <img className = "listimage" src={props.image} />
}
export default List;
