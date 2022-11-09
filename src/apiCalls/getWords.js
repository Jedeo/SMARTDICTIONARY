
export const wordOfTheDay = async() => {
 const resp = await fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${process.env.REACT_APP_API_KEY}`)
 const word = await resp.json();
 return word
}

export const getSearchedWord  = async (word) => {
    console.log(process.env);
    const resp = await fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${process.env.REACT_APP_API_KEY}`)
    const details = await resp.json()
    console.log(details);
}

