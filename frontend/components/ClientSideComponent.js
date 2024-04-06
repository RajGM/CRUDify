"use client"
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import AuthForm from './AuthForm'; // Assume this is the utility function or integrate it directly
import app from '../utils/firebase'; // Adjust the import path based on your file structure
import GetUserToken from './GetUserToken'; // Assume this is the utility function or integrate it directly
import GetJokesByUserName from './GetJokesByUserName';
import PostJoke from './PostJoke';
import GetAllJokes from './GetAllJokes';

const ClientSideComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user)
        const token = await GetUserToken();
        setToken(token);
      } else {
        setIsLoggedIn(false);
        setToken(null);
      }
    });
  }, [auth]);

  return (
    <div>
      {isLoggedIn && token ? (
        <>
          <GetJokesByUserName token={token} />
          <PostJoke token={token} />
        </>
      ) : (
        <AuthForm />
      )}
      <GetAllJokes user={user}/>
    </div>
  );
};

export default ClientSideComponent;