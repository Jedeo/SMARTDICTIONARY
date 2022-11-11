import "./App";
import React, { useContext, useState, useEffect } from "react";
import { getWordDefinition, getQuizWords } from "../apiCalls/getWords";
import { Route, Switch } from "react-router-dom";
import Home from "../HomeComponent/Home";
import { QuizContext } from "../context/quizContext/QuizContext";
import WordOfTheDay from "../wordOfTheDayComponent/WordOfTheDay";
import Navigation from "../navigationComponent/Navigation";
import SearchWord from "../searchWordComponent/SearchWord";
import Form from "../formComponent/Form";
import Learn from "../learnComponent/Learn";
import PageNotFound from "../pageNotFound/PageNotFound";

function App() {
  const [words, setWords] = useState([]);
  const [quiz, setQuiz] = useContext(QuizContext);
  const [newRound, setNewRound] = useState({ newGame: false });

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const getLearningWords = async () => {
      const quizWords = await getQuizWords();

      if (Object.keys(quizWords).length > 0) {
        setWords([...quizWords]);
      } else {
        setErrMessage(quizWords);
      }
    };
    getLearningWords();
  }, [newRound]);

  useEffect(() => {
    const getDif = async () => {
      const allDefs = {};
      const allWords = [];
      words.map(async (word) => {
        const results = await getWordDefinition(word.word);

        if (Object.keys(results).length > 0) {
          results.map((result) => {
            const keys = Object.keys(allDefs);
            if (!keys.includes(result.word)) {
              allWords.push(result.word);
              allDefs[result.word] = [result.text];
            }
            allDefs[result.word].push(result.text);
          });
        } else {
          setErrMessage(results);
        }
      });
      setQuiz({ quizWords: allWords, quizDefs: allDefs });
    };
    getDif();
  }, [words]);

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <React.Fragment>
                {" "}
                <Home />{" "}
              </React.Fragment>
            );
          }}
        />

        <Route
          path="/wordOfTheDay"
          render={() => {
            return <WordOfTheDay />;
          }}
        />

        <Route
          path={"/learn"}
          render={(match) => {
            return (
              <Learn
                 setNewRound={setNewRound}
                 quiz={quiz}
                 newRound={newRound}
              />
            );
          }}
        />

        <Route
          path={`/searchWord/:id`}
          render={({ match }) => {
            const word = match.params.id;
            return (
              <React.Fragment>
                {" "}
                <Form />{" "}
                <SearchWord setErrMessage={setErrMessage} word={word} />{" "}
              </React.Fragment>
            );
          }}
        />

        <Route
          path="/pageNotFound"
          render={() => {
            console.log(errMessage);
            return <PageNotFound errMessage={errMessage} />;
          }}
        />

        <PageNotFound />
      </Switch>
    </div>
  );
}

export default App;
