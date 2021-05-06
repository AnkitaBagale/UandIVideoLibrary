import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();



export const LanguageContextProvider = ({children}) =>{
    const [language, setLanguage] = useState("English");

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguageContext = () => useContext(LanguageContext);