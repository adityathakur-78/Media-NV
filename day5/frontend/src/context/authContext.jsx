"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    const res = await axios.post("http://localhost:5000/login", formData, {
      withCredentials: true,
    });
    setUser(res.data.user);
  };

  const signup = async (formData) => {
    const res = await axios.post("http://localhost:5000/signup", formData, {
      withCredentials: true,
    });
    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
