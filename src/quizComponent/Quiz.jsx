import React, { useState, useContext} from "react";
import { QuizContext } from "../context/quizContext/QuizContext";
import PropTypes from 'prop-types';

import "./Quiz.css";

export default function Quiz({setNewRound,  newRound}) {
  const [quiz] = useContext(QuizContext);
  const { quizWords, quizDefs } = quiz;

  const [newGame, setNewGame] = useState("Next Word");
  const [count, setCount] = useState(1);
  const [answerMessage, setAnswerMessage] = useState("")

  const keys = Object.keys(quizDefs);
  const values = Object.values(quizDefs);
  const  shortest = values.sort((a,b) => a.length - b.length )

  const checkAnswer = (answer) => {
    if (quizDefs[quizWords[count]].includes(answer)) {
      setAnswerMessage("Great Job") 
    } else{
     setAnswerMessage(`Looks like you got this one wrong the right answer is - ${quizDefs[quizWords[count]][0]}`)
    }
  };

  const getAnswer = (event) => {
    checkAnswer(event.currentTarget.innerText);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setCount(count + 1);
    setAnswerMessage("")
    checkEndOfGame()
    if(newGame === "New Quiz"){
        setNewRound(true)
        setCount(1)
        setNewGame("Next Word")
    }
  };
  console.log(newRound, {count}, {newGame});
  const getRound = () => {
    return shortest[0]?.length;
  };

  const getCurrentRound = () => {
    return count;
  };

  const checkEndOfGame = () => {
    if (count === getRound()) {
      setNewGame("New Quiz");
    }
  };

  const getRandomAnswer = (number) => {
    const keysDef = quizDefs[keys[number]];
    return keysDef?.[count];
  };

  return (
    <section className="quiz-container">
      {newGame !== "New Quiz" ? (
        <div className="inner-quiz-container">
          <h4>THE OBJECTIVE: TO ACE THIS DEFINITION QUIZ!</h4>
          <h5 className="num-of-questions">
            QUESTION {getCurrentRound()} OF {getRound()}
          </h5>
          <p className="directions">
            Choose the <em> definition </em> that match:
            <strong>{quizWords[count]}</strong>.
          </p>
          <ul className="quiz-list-container">
            <li onClick={(event) => getAnswer(event)} className="quiz-answers">
              {getRandomAnswer(0)}
            </li>
            <li onClick={(event) => getAnswer(event)} className="quiz-answers">
             
              {getRandomAnswer(1)}
            </li>
            <li onClick={(event) => getAnswer(event)} className="quiz-answers">
             
              {getRandomAnswer(2)}
            </li>
          </ul>

          <button
            className="submit-button"
            type="button"
            onClick={(event) => handleClick(event)}
          >
            {newGame}
          </button>
         
        </div>
      ) : (
        <div className="end-game">
         
          <h4>
            Great Job Lets keep on practicing you will be great in no time
          </h4>
          <button
            className="submit-button"
            type="button"
            onClick={(event) => handleClick(event)}
          >
            {newGame}
          </button>
        </div>
      )}

      {answerMessage.length > 0 && <p>{answerMessage}</p>}
    </section>
  );
}

Quiz.propTypes = {
    setNewRound: PropTypes.func.isRequired,
    newRound: PropTypes.object.isRequired
  };