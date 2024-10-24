import React, { createContext, useContext, useEffect, useState } from "react";
import { firebase } from "./config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [initializing]);

  const signIn = async (useremail, password) => {
    try {
      setError(null); // Clear any previous errors
      await firebase.auth().signInWithEmailAndPassword(useremail, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null); // Clear any previous errors
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, signIn, signOut, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
