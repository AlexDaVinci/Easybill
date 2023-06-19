import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(); // Aquí creas el contexto

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const logIn = (token) => {
    setIsAuthenticated(true);
    setAuthToken(token);
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
