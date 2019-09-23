import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";
const axios = require('axios');


class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items :[],
      selected : false
    }
  }
  componentDidMount() {

    axios.get('/api/items')
    .then(response => {
      //console.log(response)
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

    // if(this.state.items.length > 0){
    //   this.state.items.map((x, index) => {
    //     tops.push(< indvoutfit key={index} item={x} items={this.state.items} />)
    //   })
    // }
    return (
      <div>
        <h1>TOPS</h1>
        <div className ="typegroup"> {tops}</div>
        <h1>BOTTOMS</h1>
        <div className ="typegroup"> {bottom}</div>
        <h1>SHOES</h1>
        <div className ="typegroup"> {shoes}</div>
      </div>
    );
  }

}

function indvoutfit(props){
return  <img className = "listimage" src={props.image} />
}
export default List;
