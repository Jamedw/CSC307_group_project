// Filename - App.js

import React, { Component, useState } from 'react';
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
import NotFound from './pages/Com_Home_post_pages/NotFound.jsx';

function App() {
  const INVALID_TOKEN = 'INVALID_TOKEN';
  const [token, setToken] = useState(INVALID_TOKEN);
  const [userID, setUserID] = useState(false)
  const [message, setMessage] = useState('');
  const [loggedIn, setloggedIn] = useState(false)


  let API_PREFIX = 'http://localhost:3000';

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(payload => {
            setUserID(payload.user._id)
            setToken(payload.token)
            setloggedIn(true)
          });
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch(error => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
      .then(response => {
        if (response.status === 201) {
          response.json().then(payload => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch(error => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home loggedIn={loggedIn} token={token} />,
      children: [
        {
          path: ':communityName',
          element: <Home loggedIn={loggedIn}  token={token} />,
        },
        {
          path: ':communityName/:postHeader',
          element: <Home loggedIn={loggedIn}  token={token} />,
        },
      ],
    },
    {
      path: '/Signup',
      element: <Signup signupUser={signupUser} />,
    },
    {
      path: '/Login',
      element: <Login token={token} loginUser={loginUser} />,
    },
    {
      path: 'NotFound',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
