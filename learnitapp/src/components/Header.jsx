import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <Link to="/" ><img src={logo} alt="logo" className="header__logo" /></Link>
            <span className="header__promo">Just learn it!</span>
            <Link to="/game" ><button className="header__button">Let's game!</button></Link>
        </div >
    );
}