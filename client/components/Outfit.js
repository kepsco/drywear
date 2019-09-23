import React from 'react';
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
const axios = require('axios');


const Outfit = (props) => {

  const { top, bottom, shoes } = props.item;
  

  function handleClick(topId, bottomId, shoesId) {
    axios.post('/api/outfits', {
      top: topId,
      bottom: bottomId,
      shoes: shoesId,
    })
    .then(response => {
      props.history.push("/history")
    }).catch(error => {
      console.log(error, '- Get outfit selection');
    })

    axios.get('/api/outfits/today')
    .then(response => {
      this.setState ({
        selected: response.data
      })
    }).catch(error => {
      console.log(error, '- Check current date outfit exists');
    })
  }


  return (
    <div className="outfit-block" onClick={() => handleClick(top.id, bottom.id, shoes.id)}>
      <img src={top.image} />
      <img src={bottom.image} className="bottom"/>
      <img src={shoes.image}/>
    </div>
  )
}

export default withRouter(Outfit);
