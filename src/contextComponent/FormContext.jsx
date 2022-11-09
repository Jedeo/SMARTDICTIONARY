import { createContext, useState } from "react";

export const FormContext = createContext()

export const FormProvider = ({children}) => {
    const [searchedWord, setSearchedWord] = useState("")
    const value = [searchedWord, setSearchedWord]
    return <FormContext.Provider value={value}> {children}</FormContext.Provider>

}