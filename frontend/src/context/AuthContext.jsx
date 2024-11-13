// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Data, setData] = useState(null); 

  const login = (data) => {
    setIsAuthenticated(true);
    setData(data);  
  };

  const logout = () => {
    setIsAuthenticated(false);
    setData(null);  // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, Data, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};