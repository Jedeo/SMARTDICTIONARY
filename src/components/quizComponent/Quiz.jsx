import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { QuizContext } from "../../context/quizContext/QuizContext";
import PropTypes from "prop-types";

import "./Quiz.css";

export default function Quiz({ getQuiz, gotError }) {
  const [quiz] = useContext(QuizContext);
  const { quizWords, quizDefs } = quiz;
  const [newGame, setNewGame] = useState("Next Word");
  const [count, setCount] = useState(-1);
  const [answerMessage, setAnswerMessage] = useState("");
  const keys = Object.keys(quizDefs);
  

  useEffect(() => {
    getQuiz(true)
  }, [newGame]);

  const checkAnswer = (answer) => {
    if (quizDefs[quizWords[count]].includes(answer)) {
      setAnswerMessage("Great Job");
    } else {
      setAnswerMessage(
        `Looks like you got this one wrong the right answer is - ${
          quizDefs[quizWords[count]][0]
        }`
      );
    }
  };

  const getAnswer = (event) => {
    checkAnswer(event.currentTarget.innerText);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setCount(count + 1);
    setAnswerMessage("");
    checkEndOfGame();
    if (newGame === "New Quiz") {
      setCount(-1);
      setNewGame("Next Word");
      getQuiz(false)
      getQuiz(true)
    }
  };

  const getRound = () => {
    return keys.length;
  };

  const getCurrentRound = () => {
    return count;
  };

  const checkEndOfGame = () => {
    
    if (count + 2 === getRound()) {
      setNewGame("New Quiz");
    }
  };

  const getRandomAnswer = (number) => {
    const keysDef = quizDefs[keys[number]];
    return keysDef?.[count];
  };
  
  return (
    <section className="quiz-container">
        { count !== -1 ? <div className="inner-quiz-container">
          <h4>THE OBJECTIVE: TO ACE THIS DEFINITION QUIZ!</h4>
          <h5 className="num-of-questions">
            QUESTION {getCurrentRound() + 1} OF {getRound()}
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
          </ul>

          <button
            className="submit-button"
            type="button"
            onClick={(event) => handleClick(event)}
          >
            {newGame}
          </button>
        </div> :  <div> 
        <h4>Read?</h4>
          <button
            className="submit-button"
            type="button"
            onClick={(event) => handleClick(event)}
          >
            Start
          </button></div>}

      {answerMessage.length > 0 && <p>{answerMessage}</p>}

      {gotError === true && <Redirect to="/pageNotFound"></Redirect>}
    </section>
  );
}

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  gotError: PropTypes.bool,
};
