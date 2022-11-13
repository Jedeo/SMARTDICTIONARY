import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"
const dictionary = require('../../images/logo.png');
export default function Navigation() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/"> <img src={dictionary} alt="" /> </Link>
      <div>
      <NavLink exact to='/' className="home-button">HOME</NavLink> <NavLink exact to="/wordOfTheDay" className="word-of-the-day-button"> WORD OF THE DAY</NavLink> <NavLink to="/quiz" className="learn-button">LEARN</NavLink>
      </div>
    </nav>
  );
}
