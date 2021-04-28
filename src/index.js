import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"; 
import { App } from './App';
import { AuthenticationProvider, StateContextProvider } from "./Context";
import { LanguageContextProvider } from './Context';



ReactDOM.render(
  <React.StrictMode>
    <LanguageContextProvider>
      <Router>
        <AuthenticationProvider>
          <StateContextProvider> 
            <App />
          </StateContextProvider>
        </AuthenticationProvider>
      </Router>
    </LanguageContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


