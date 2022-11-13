import "./App";
import React, { useState} from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../HomeComponent/Home";
import WordOfTheDay from "../wordOfTheDayComponent/WordOfTheDay";
import Navigation from "../navigationComponent/Navigation";
import SearchWord from "../searchWordComponent/SearchWord";
import Form from "../formComponent/Form";
import Learn from "../learnComponent/Learn";
import PageNotFound from "../pageNotFound/PageNotFound";
import { render } from '@testing-library/react';

function App() {
  const [errMessage, setErrMessage] = useState("");
  
  const getErrors = (errors) => {
    setErrMessage(errors)
  }

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
        exact
          path="/wordOfTheDay"
          render={() => {
            return <WordOfTheDay getErrors={getErrors}/>;
          }}
        />

        <Route
          path={"/quiz"}
          render={(match) => {
            return (
              <Learn
              getErrors={getErrors}
            
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
                <SearchWord  getErrors={getErrors} word={word} />{" "}
              </React.Fragment>
            );
          }}
        />

        <Route
          path="/pageNotFound"
          render={() => {
            return <PageNotFound errMessage={errMessage} />;
          }}
        />

        <Route path="*" render={() => <PageNotFound errMessage={errMessage}/>} />
      </Switch>
    </div>
  );
}

export default App;
