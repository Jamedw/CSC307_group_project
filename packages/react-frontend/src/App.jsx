// Filename - App.js

import React, { Component } from 'react';
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

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
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
      element: <Signup />,
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
