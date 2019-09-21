import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "../index.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : ["D.R.Y. WEAR"],
      outfits : ["top","bottom","shoe"]
      
    }
  }

  componentDidMount() {
    this.setState ({
      outfits : [{top: "topObj", bottom: "bottomObj", shoe: "shoeObj"}, {top: "top", bottom: "bottom", shoe: "shoe"}, {top: "top", bottom: "bottom", shoe: "shoe"},
      {top: "top", bottom: "bottom", shoe: "shoe"}, {top: "top", bottom: "bottom", shoe: "shoe"}]
    })
  }
  //history()
  render() {
    const otherBar = this.state.outfits.map( elem => {
        return (
          <div className = "items">  
          <Main top= {elem.top} bottom={elem.bottom} shoe={elem.shoe}/>
          </div>
           )    
    })
    return (
      <div className = "container">
         <h1>"Dry Wear"</h1>
         <Main top = {this.state.outfits[0].top} bottom={this.state.outfits[0].bottom} shoe={this.state.outfits[0].shoe}/>
          <button>
           SELECT OUTFIT
         </button> 
    <div className = "otherOutfits">
    {otherBar}
    </div>
      </div>
    );
  }
}
function Main(props) {
  return (
    <div className = "mainoutfit"> 
      <h3>{props.top}</h3> 
      <h3>{props.bottom}</h3>
      <h3>{props.shoe}</h3>
    </div>
  )
}

export default App;
