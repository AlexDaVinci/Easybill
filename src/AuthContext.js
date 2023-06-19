import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(); // Aquí creas el contexto

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        return JSON.parse(storedUserData);
      } catch (error) {
        console.error("Invalid user data in localStorage:", storedUserData);
      }
    }
    return null;
  });

  const logIn = (token, userData) => {
    setAuthToken(token);
    setUserData(userData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logOut = () => {
    setAuthToken(null);
    setUserData(null); // Y aquí los limpiamos
  };

  return (
    <AuthContext.Provider value={{ authToken, userData, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
