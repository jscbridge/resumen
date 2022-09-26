import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Bateria from "./components/Bateria";
import Main from './components/Main';
import Barra from "./components/Barra";

import './App.scss';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Bateria />
        <Main />
     
      </BrowserRouter>
    </div>
  );

}

export default App;
