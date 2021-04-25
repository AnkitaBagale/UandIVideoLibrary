import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"; 
import { App } from './App';
import { StateContextProvider } from "./Context";
import { LanguageContextProvider } from './Context';



ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <StateContextProvider> 
        <Router>
          <App />
        </Router>
      </StateContextProvider>
    </LanguageContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


