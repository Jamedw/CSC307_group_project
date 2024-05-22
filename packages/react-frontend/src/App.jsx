

// Filename - App.js

import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    createBrowserRouter,
    RouterProvider,
    useParams,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
import "./App.css";
import { div } from "prelude-ls";
import NotFound from "./pages/NotFound.jsx";



function App() {
  const router = createBrowserRouter ([
    {
      path : "/",
      element: <Home />,
      children: 
        [
          {
          path: ":communityName",
          element: <Home />,
          },
          {
          path: ":communityName/:postHeader",
          element : <Home />  
          }
        ]    
      },
      {
        path: "/Signup",
        element: <Signup />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound />
      }])

    return (
      <RouterProvider router={router} />
    );
    
}


export default App

