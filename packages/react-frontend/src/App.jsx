// Filename - App.js

import React, { Component , useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Home from './pages/Com_Home_post_pages/Home.jsx';
import Login from './pages/Login_page/Login.jsx';
import Signup from './pages/Signup_page/Signup.jsx';
import './App.css';
import { div } from 'prelude-ls';
import NotFound from './pages/Com_Home_post_pages/NotFound.jsx';

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  function loginUser(creds) {
    const promise = fetch(`http://localhost:8000/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }

  function signupUser(creds) {
    const promise = fetch(`http://localhost:8000/Signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: ':communityName',
          element: <Home />,
        },
        {
          path: ':communityName/:postHeader',
          element: <Home />,
        },
      ],
    },
    {
      path: '/Signup',
      element: <Signup signupUser={signupUser}/>,
    },
    {
      path: '/Login',
      element: <Login loginUser={loginUser} />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
