import React from "react";
import { Link } from "react-router-dom";
import "./Slider1Card.scss"

const Slider1Card = (card) => {
  return (
    <Link className="link" to="/gigs">   
      <div className="sliderCard">
        <img src={card.image} alt="" />
        <div className="info">
          <img src={card.pp} alt="" />
          <div className="texts">
            <h2>{card.cat}</h2>
            <span>{card.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Slider1Card;
