const checkError = async (resp) => {
  try {
    if (!resp.ok) {
      console.log("here");
      const message = `An error has occurred: ${resp.status}`
      throw new Error(message);
    }
    const details = await resp.json();
    return details;
  } catch (err) {
    return err;
  }
};

export const wordOfTheDay = async () => {
  const resp = await fetch(
    `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return checkError(resp)
};

export const getExamples = async (word) => {
  const resp = await fetch(
    `https://api.wordnik.com/v4/word.json/${word}/examples?includeDuplicates=false&useCanonical=false&limit=5&api_key=${process.env.REACT_APP_API_KEY}`
  );
  return checkError(resp)
};

export const getWordDefinition = async (word) => {
  const resp = await fetch(
    `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${process.env.REACT_APP_API_KEY}`
  );
  return checkError(resp)
};

export const getQuizWords = async () => {
  const resp = await fetch(
    `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&limit=6&api_key=${process.env.REACT_APP_API_KEY}`
  );

  return checkError(resp)
};
