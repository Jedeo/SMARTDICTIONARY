import Word from "../wordComponent/Word";
import React, { useState, useEffect } from "react";
import { wordOfTheDay } from '../apiCalls/getWords';

const WordOfTheDay = () => {
  const [todayWord, setTodayWord] = useState({
    _id: null,
    examples: [],
    word: "",
    definitions: [],
    note: "",
  });

  useEffect(() => {
    const word = async () => {
      const details = await wordOfTheDay();
      setTodayWord({
        _id: Date.now(),
        examples: details.examples,
        word: details.word,
        definitions: [...details.definitions],
        note: details.note,
      });
    };
    word();
  }, []);

  const todayDate = new Date();
  const date = todayDate.toDateString();
  const month = date.split(" ");
  
  return (
    <React.Fragment>
      <h1>
        {month[1]} {month[3]} Word Of The Day
      </h1>
      <Word todayWord={todayWord} />
    </React.Fragment>
  );
};

export default WordOfTheDay;
