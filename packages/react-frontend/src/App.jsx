// Filename - App.js

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Log_in from "./pages/Log_in.jsx"
import Sign_up from "./pages/Sign_up.jsx"

import "./App.css";

function App() {
   
        return (
          <><h1>Reddit but better?</h1><Router>
            <div className="App">
              <ul className="App-header">
              </ul>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                ></Route>
                <Route
                  path="/Log_in"
                  element={<Log_in />}
                ></Route>
                <Route
                  path="/Sign_up"
                  element={<Sign_up />}
                ></Route>
              </Routes>
            </div>
          </Router></>
        );
    
}

export default App;

