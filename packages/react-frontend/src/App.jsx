
// Filename - App.js

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import "./App.css";

function App() {
   
        return (
          <Router>
            <div className="app-container">
              <Routes>
              <Route
                  path="/"
                  element={<Home />}
                ></Route>
                <Route
                  path="/Login"
                  element={<Login />}
                ></Route>
                <Route
                  path="/Signup"
                  element={<Signup />}
                ></Route>
              </Routes>
            </div>
          </Router>
        );
    
}

export default App

