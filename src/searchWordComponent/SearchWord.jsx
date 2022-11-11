import React, { useContext, useState, useEffect } from "react";
import { getWordDefinition, getExamples } from "../apiCalls/getWords";
import Word from "../wordComponent/Word";
import { Redirect } from "react-router-dom";

const SearchWord = ({ setErrMessage,word }) => {
  const [details, setDetails] = useState({
    _id: null,
    examples: [],
    word: [],
    definitions: [],
    gotInfo: false,
  });

  const [gotError, setGotError] = useState(false)

  useEffect(() => {
    const getSearched = async () => {
      const words = await getWordDefinition(word.toLowerCase());
      const examples = await getExamples(word.toLowerCase());

      const wordKeys = Object.keys(words);
      const examplesKeys = Object.keys(examples);
      console.log(wordKeys, examplesKeys);
      if (wordKeys.length > 0 && examplesKeys.length > 0) {
        return words.map((word) => {
          setDetails({
            _id: word.id,
            examples: examples.examples,
            word: word.word,
            definitions: [{ id: Date.now(), text: word.text }],
            gotInfo: true,
          });

          setGotError(false)
        });
        
      } else {
        console.log("else");
        setGotError(true)
        setErrMessage(words)
      }
    };
    getSearched();
  }, [word]);

  return <section>
    {details.gotInfo === true && <Word todayWord={details} />}
    {gotError === true && <React.Fragment> Error <Redirect to="/pageNotFound"/> </React.Fragment>}
   
  </section>;
};

export default SearchWord;
