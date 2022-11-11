import React, { useState, useEffect, useContext } from "react";
import Quiz from "../quizComponent/Quiz";
import PropTypes from "prop-types"

const Learn = ({setNewRound,  newRound}) => {

  return <React.Fragment><Quiz  setNewRound={setNewRound}  newRound={newRound}  /></React.Fragment>;
};

export default Learn;

Learn.propTypes = {
    setNewRound: PropTypes.func.isRequired,  
    newRound: PropTypes.object.isRequired
}