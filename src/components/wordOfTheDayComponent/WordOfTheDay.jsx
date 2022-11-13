import Word from "../wordComponent/Word";
import React, { useState, useEffect } from "react";
import { wordOfTheDay } from "../../apiCalls/getWords";
import { Redirect } from "react-router-dom";

import "./WordOfTheDay.css"

const WordOfTheDay = ({getErrors}) => {
  const [todayWord, setTodayWord] = useState({
    _id: null,
    examples: [],
    word: "",
    definitions: [],
    note: "",
  });

  const [gotError, setGotError] = useState(false);

  useEffect(() => {
    const word = async () => {
      const details = await wordOfTheDay();
     
      const keys = Object.keys(details);
      if (keys.length > 0) {
        setGotError(false);
        setTodayWord({
          _id: Date.now(),
          examples: details.examples,
          word: details.word,
          definitions: [...details.definitions],
          note: details.note,
        });
      }else{
        getErrors(details)
        setGotError(true);
      }
      
    };
    word();
  }, []);

  const todayDate = new Date();
  const date = todayDate.toDateString();
  const month = date.split(" ");

  return (
    <React.Fragment>
      {gotError === true && <Redirect to="/pageNotfound" />}
      <h1 className="day-title">
        {month[1]} {month[3]} Word Of The Day
      </h1>
      <Word todayWord={todayWord} />
    </React.Fragment>
  );
};

export default WordOfTheDay;
