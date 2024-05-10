// Filename - App.js

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

import "./App.css";

function App() {
   
        return (
          <><h1>Reddit but better?</h1><Router>
            <div className="App">
              <ul className="App-header">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Layout">
                    Layout
                  </Link>
                </li>
                <li>
                  <Link to="/Layout">
                    Layout
                  </Link>
                </li>
                <li>
                  <Link to="/Layout">
                    Layout
                  </Link>
                </li>

              </ul>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                ></Route>
                <Route
                  path="/Layout"
                  element={<Layout />}
                ></Route>
              </Routes>
            </div>
          </Router></>
        );
    
}

export default App;

