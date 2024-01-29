"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, User } from "firebase/auth";
import { auth } from "../firebase/config"
export const AuthContext = createContext({} as any);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Especifica el tipo de currentUser

  const [loading, setLoading] = useState(true);
  

  function signup(auth: Auth, email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(auth: Auth, email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
