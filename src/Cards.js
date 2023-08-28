import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios"; 
import Button from "./Button";
import {v4 as uuid} from "uuid";
import "./Cards.css"

const Deck_API_URL = "https://deckofcardsapi.com/api/deck/";

const Cards = () => {

    const [deckInfo, setDeckInfo] = useState(null);
    const [shownCards, setShownCards] = useState([{imageURL: "https://deckofcardsapi.com/static/img/back.png"}]);

    useEffect(() => {
        async function loadDeck() {
            const res = await axios.get(`${Deck_API_URL}new/shuffle`)
            setDeckInfo(res.data);
        }
        loadDeck();
    }, [])

    const drawCard = async () => {
        try {
            const res = await axios.get(`${Deck_API_URL}${deckInfo.deck_id}/draw`);
            if (res.data.remaining > 0) {
                setShownCards([...shownCards, {imageURL: res.data.cards[0].image}])
            }
            else {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="Cards">
                {
                    shownCards.map(({imageURL}) => {
                        return(<Card key={uuid()} imageURL={imageURL}/>)
                    })
                }
            </div>
            <Button text={"Draw"} htmlClassName={"Button"} clickFunction={drawCard}/>
        </>
    )

}

export default Cards;