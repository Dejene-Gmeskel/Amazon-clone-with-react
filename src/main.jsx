import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { DataProvider } from './Components/DataProvider/DataProvider.jsx';
import { initialState, reducer } from "../src/Utility/Reducer.js";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);
