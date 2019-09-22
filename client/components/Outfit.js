import React from 'react';

function Outfit(props) {
  return (
    <div className="outfit-block">
      <img src={props.item.top.image} />
      <img src={props.item.bottom.image} className="bottom"/>
      <img src={props.item.shoes.image}/>
    </div>
  )
}

export default Outfit;
