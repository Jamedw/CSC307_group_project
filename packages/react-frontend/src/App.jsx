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
  const [user, setUser] = useState("")
  const [userCommunities, setUserCommunities] = useState()
  const [message, setMessage] = useState('');

  function Logout(){
    setToken(INVALID_TOKEN)
    setUser("")
    setUserCommunities("")
  }

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
            setUser(payload.user);
            setUserCommunities(payload.communities)
            setToken(payload.token);
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
      element: <Home logout={Logout} user={user} userCommunities={userCommunities} token={token} />,
      children: [
        {
          path: ':communityName',
          element: <Home logout={Logout} user={user} userCommunities={userCommunities} token={token} />,
        },
        {
          path: ':communityName/:postHeader',
          element: <Home logout={Logout}  user={user} userCommunities={userCommunities} token={token} />,
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
