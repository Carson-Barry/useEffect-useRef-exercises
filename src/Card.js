import React from "react";
import "./Card.css";

const Card = ({imageURL}) => {

    return (
        <img 
            className="Card"
            src={imageURL}
        />
    )
}

export default Card;