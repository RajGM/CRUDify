"use client";
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../utils/firebase';
import GetUserToken from './GetUserToken';
import AuthForm from './AuthForm';
import PostJoke from './PostJoke';
import GetAllJokes from './GetAllJokes';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom, isLoggedInAtom } from '../context/userAtoms';

const ClientSideComponent = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await GetUserToken(); // Ensure this function is implemented to get the token
        setUser(firebaseUser); // Update the atom instead of local state
        setToken(token); // Update the atom instead of local state
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [setUser, setToken]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <PostJoke token={token} />
          <div className="text-center mt-4"> {/* Center the button */}
            <button
              onClick={() => { setUser(null); setToken(null); }}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300">
              Logout
            </button>
          </div>
          <GetAllJokes user={user} />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default ClientSideComponent;
