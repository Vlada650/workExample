import React from "react";
import logo from "../assets/images/logo.png"

export default function Footer() {
    return (
        <div className="footer">
            <img src={logo} className="footer__logo" alt="logo" />
            <span className="footer__promo">Изучай новые слова каждый день!</span>
            <div className="footer__info">2021</div>
        </div>
    );
}