import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(); // Aquí creas el contexto

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = () => {
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
