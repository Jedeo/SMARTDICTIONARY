import React, { useState} from "react";
import "./Form.css";
import { Link } from "react-router-dom";

const Form = () => {
  const [word, setWord] = useState("");
  const handleChange = (event) => {
    setWord(event.currentTarget.value)
  };

  const handleSubmit = () => {
    setWord("")
  }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()   
        }     
    }

  return (
    <section className="container">
      <form className="form-container">
        <input
          className="form-input"
          placeholder="Search a Word"
          value={word}
          type="search"
          onChange={(event) => handleChange(event)}
          onKeyDown={(event)=> handleKeyDown(event)}
        />
     {word.length !== 0 && <Link to={`/searchWord/${word}`}><button className="submit-button" type="button" onClick={()=>handleSubmit()}>submit</button></Link>}
      </form>
    </section>
  );
};

export default Form;
