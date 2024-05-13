<<<<<<< HEAD
// Filename - App.js

=======
//
>>>>>>> eb95b05 (merged homepage with login and signup)
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
<<<<<<< HEAD
import Home from "./pages/Home";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"

=======
import Home from "./pages/Home.jsx";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
>>>>>>> eb95b05 (merged homepage with login and signup)
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
<<<<<<< HEAD
                  path="/Log_in"
                  element={<Login />}
                ></Route>
                <Route
                  path="/Sign_up"
=======
                  path="/Login"
                  element={<Login />}
                ></Route>
                <Route
                  path="/Signup"
>>>>>>> eb95b05 (merged homepage with login and signup)
                  element={<Signup />}
                ></Route>
              </Routes>
            </div>
          </Router></>
        );
    
}
<<<<<<< HEAD

export default App;

=======
export default App
>>>>>>> eb95b05 (merged homepage with login and signup)
