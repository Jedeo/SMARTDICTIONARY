import React, { useState, useEffect, useContext } from "react";
import Quiz from "../quizComponent/Quiz";
import PropTypes from "prop-types"

export default function Learn ({setNewRound,  newRound}) {

  return <React.Fragment><Quiz  setNewRound={setNewRound}  newRound={newRound}  /></React.Fragment>;
};

Learn.propTypes = {
    setNewRound: PropTypes.func,  
    newRound: PropTypes.object
}

