import { createContext, useState } from "react";

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const [quiz, setQuiz] = useState({quizWords:[], quizDefs: [] })
    const value = [quiz, setQuiz]
    return <QuizContext.Provider value={value}> {children}</QuizContext.Provider>

}