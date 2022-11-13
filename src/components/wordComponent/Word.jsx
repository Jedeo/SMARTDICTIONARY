import React from "react";
import "./Word.css";
import PropTypes from "prop-types"

export default function Word ({ todayWord }) {
  const { word, definitions, examples, note } = todayWord;

  const wordDefinitions = definitions.map((definition) => {
    const {text} = definition
    return <li key={text}>{text}</li>;
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
        <h2 className="word-of-the-day">{word}</h2>
        <ul className="list-of-definitions">{wordDefinitions}</ul>

        {note !== undefined && <div className="note">
          <h4>Note: </h4>
          <p className="extra-detail">{note}</p>
        </div> }
      </div>

      <div className="examples">
        <h4 className="word-examples">{`HOW TO USE ${word.toUpperCase()} IN A SENTENCE`}</h4>
        <ul className="list-of-examples">{wordExamples} </ul>
      </div>
    </section>
  );
}

Word.prototype = {
  todayWord: PropTypes.string.isRequired
}