import React, { useState, useEffect, useContext } from "react";
import Quiz from "../quizComponent/Quiz";
import PropTypes from "prop-types"

export default function Learn ({setNewRound,  newRound,  gotError}) {

  return <React.Fragment><Quiz  gotError={gotError} setNewRound={setNewRound}  newRound={newRound}  /></React.Fragment>;
};

Learn.propTypes = {
    setNewRound: PropTypes.func,  
    newRound: PropTypes.object,
    gotError: PropTypes.bool
}

