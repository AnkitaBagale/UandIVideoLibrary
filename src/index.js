import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { StateContextProvider } from "./Context";
import { LanguageContextProvider } from './Context/language-context';



ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <StateContextProvider> 
        <App />
      </StateContextProvider>
    </LanguageContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


