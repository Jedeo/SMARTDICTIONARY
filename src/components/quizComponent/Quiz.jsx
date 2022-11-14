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
  const [click, setClick] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answerMessage, setAnswerMessage] = useState("");

  useEffect(() => {
    const values = Object.values(quizDefs);
    const filteredData1 = values[0]?.filter((value) => value !== undefined);
    const filteredData2 = values[1]?.filter((value) => value !== undefined);
  
    setAnswers({
      answers1: filteredData1?.[count + 1],
      answers2: filteredData2?.[count + 1],
    });
  }, [count]);

  const checkAnswer = (answer) => {
    setClick(true);
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
    setClick(false);

    if (newGame === "New Quiz") {
      setCount(-1);
      setNewGame("Next Word");
      getQuiz();
    }
  };

  const getRound = () => {
    const keys = Object.keys(quizDefs);
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

  return (
    <section className="quiz-container">
      {count !== -1 ? (
        <div className="inner-quiz-container">
          <h4>THE OBJECTIVE: TO ACE THIS DEFINITION QUIZ!</h4>
          <h5 className="num-of-questions">
            QUESTION {getCurrentRound() + 1} OF {getRound()}
          </h5>
          <p className="directions">
            Choose the <em> definition </em> that match:
            <strong>{quizWords[count]}</strong>.
          </p>
          <ul className="quiz-list-container">
            <li
              key={answers?.answers1}
              onClick={(event) => getAnswer(event)}
              className="quiz-answers"
            >
              {answers?.answers1}
            </li>

            <li
              key={answers?.answers2}
              onClick={(event) => getAnswer(event)}
              className="quiz-answers"
            >
              {answers?.answers2}
            </li>
          </ul>

          {click !== false && (
            <button
              className="submit-button"
              type="button"
              onClick={(event) => handleClick(event)}
            >
              {newGame}
            </button>
          )}
        </div>
      ) : (
        <div className="start-game ">
          <h4>Click Start When Ready</h4>
          <button
            className="submit-button"
            type="button"
            onClick={(event) => handleClick(event)}
          >
            Start
          </button>
        </div>
      )}

      {answerMessage.length > 0 && <p className="eval">{answerMessage}</p>}

      {gotError === true && <Redirect to="/pageNotFound"></Redirect>}
    </section>
  );
}

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  gotError: PropTypes.bool,
};
