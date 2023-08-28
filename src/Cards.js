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
    const [deckStatus, setDeckStatus] = useState({buttonText: "Draw", cardsRemaining: null})

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
                setDeckStatus({...deckStatus, cardsRemaining: res.data.remaining})
            }
            else {
                setDeckStatus({...deckStatus, buttonText:"Shuffle", cardsRemaining: res.data.remaining})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const shuffleDeck = () => {
        async function loadDeck() {
            const res = await axios.get(`${Deck_API_URL}new/shuffle`)
            setDeckInfo(res.data);
        }
        loadDeck();
        setShownCards([{imageURL: "https://deckofcardsapi.com/static/img/back.png"}]);
        setDeckStatus({...deckStatus, buttonText:"Draw"})
    }

    const buttonFunction = () => {
        if (deckStatus.buttonText === "Draw") {
            drawCard();
        }
        else if (deckStatus.buttonText === "Shuffle") {
            setDeckStatus({...deckStatus, buttonText:"Shuffling..."})
            shuffleDeck();

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
            <Button text={deckStatus.buttonText} htmlClassName={"Button"} clickFunction={buttonFunction}/>
        </>
    )

}

export default Cards;