import Form from "../formComponent/Form";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { wordOfTheDay } from "../../apiCalls/getWords";
import "./Home.css"

const Home = () => {
const [todayWord, setTodayWord] = useState("")
useEffect(()=>{
const requestWord = async ()=> {
 const result = await wordOfTheDay()
 setTodayWord(result.word)
}
requestWord()
},[])

    return(
        <div className="home-container">
            <h1 className="discover"> Discover today's word</h1>
            <Link to="/wordOfTheDay" className="todays-word"> {todayWord} </Link>
            <Form/>
        </div>
    )
}

export default Home