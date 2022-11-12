import React from "react";
import "./Word.css";
import PropTypes from "prop-types"

export default function Word ({ todayWord }) {
  const { word, definitions, examples, note } = todayWord;
  const wordDefinitions = definitions.map((definition) => {
    return <li key={definition.text}>{definition.text}</li>;
  });

  const wordExamples = examples.map((example) => {
    return (
      <li key={Date.now()* Math.random()}>
        {example.text} -{example.title}
      </li>
    );
  });

  return (
    <section key={Date.now()} className="container">
      <div className="word-and-definition">
        <h2>{word}</h2>
        <ul>{wordDefinitions}</ul>

        {note !== undefined && <div className="note">
          <h4>Note: </h4>
          {note}
        </div> }
      </div>

      <div className="examples">
        <h4>{`HOW TO USE ${word.toUpperCase()} IN A SENTENCE`}</h4>
        <ul>{wordExamples} </ul>
      </div>
    </section>
  );
}

Word.prototype = {
  todayWord: PropTypes.string.isRequired
}