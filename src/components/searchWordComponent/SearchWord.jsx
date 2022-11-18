import React, { useContext, useState, useEffect } from "react";
import { getWordDefinition, getExamples } from "../../apiCalls/getWords";
import Word from "../wordComponent/Word";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

export default function SearchWord ({ getErrors,word }) {
  const [details, setDetails] = useState({
    _id: null,
    examples: [],
    word: "",
    definitions: [],
    gotInfo: false,
  });

  const [gotError, setGotError] = useState(false)

  useEffect(() => {
    const getSearched = async () => {
      const defs = await getWordDefinition(word.toLowerCase());
      console.log(defs);
      const examples = await getExamples(word.toLowerCase());

      const wordKeys = Object.keys(defs);
      const examplesKeys = Object.keys(examples);
      if (wordKeys.length > 0 && examplesKeys.length > 0) {
        return defs.map((word) => {
          setDetails({
            _id: word.id,
            examples: examples.examples,
            word: word.word,
            definitions: [{ id: Date.now(), text: defs[0].text }],
            gotInfo: true,
          });

          setGotError(false)
        });
        
      } else {
        setGotError(true)
        getErrors(defs)
      }
    };
    getSearched();
  }, [word]);

  return <section>
    {details.gotInfo === true && <Word todayWord={details} />}
    {gotError === true && <React.Fragment> Error <Redirect to="/pageNotFound"/> </React.Fragment>}
   
  </section>;
};

SearchWord.propTypes = {
    getErrors: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired

  };


