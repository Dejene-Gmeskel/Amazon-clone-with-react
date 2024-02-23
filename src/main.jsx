import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { DataProvider } from './Components/DataProvider/DataProvider.jsx';
import { initialState, reducer } from "../src/Utility/Reducer.js";
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App/>
    </DataProvider>  
  </React.StrictMode>
);
