import React, {useState} from "react";
import Card from "./Card"

const Cards = () => {

    const [cards, setCards] = useState([]);

    return (
        cards.map(({suit, value}) => {
            <Card suit={suit} value={value}/>
        })
    )

}

export default Cards;