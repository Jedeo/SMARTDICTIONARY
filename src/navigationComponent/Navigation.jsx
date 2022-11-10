import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css"

export default function Navigation() {
  return (
    <nav className="navbar">
      <Link className="home-button" to="/"> HOME </Link>
      <div>
      <Link className="word-of-the-day-button" to="/wordOfTheDay"> WORD OF THE DAY </Link>
      <Link to="/quiz"className="learn-button"> LEARN </Link> 
      </div>
    </nav>
  );
}
