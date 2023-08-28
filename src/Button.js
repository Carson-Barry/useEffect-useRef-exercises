import React from "react";
import "./Button.css"

const Button = ({text, htmlClassName, clickFunction}) => {
    return (
        <button className={htmlClassName} onClick={clickFunction}>{text}</button>
    )
}

export default Button;