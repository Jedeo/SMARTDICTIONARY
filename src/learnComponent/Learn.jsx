import React, { useState, useEffect, useContext } from "react";
import Quiz from "../quizComponent/Quiz";

const Learn = ({setNewRound,  newRound}) => {

  return <React.Fragment><Quiz  setNewRound={setNewRound}  newRound={newRound}  /></React.Fragment>;
};

export default Learn;
