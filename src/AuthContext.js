import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(); // Aquí creas el contexto

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null); // Aquí manejaremos los datos del usuario

  const logIn = (token, user) => {
    setAuthToken(token);
    setUserData(user); // Y aquí los establecemos
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
