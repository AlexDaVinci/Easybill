import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import brandWhite from "assets/images/logo-ct.png";
import { AuthProvider } from "AuthContext";
import routes from "routesAdmin";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const shouldShowSidenav =
    pathname !== "/authentication/sign-up" && pathname !== "/authentication/reset-password";

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {shouldShowSidenav && (
          <>
            <Sidenav brand={brandWhite} brandName="EasyBill" routes={routes} />
            <Configurator />
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route path="/authentication/reset-password" />
          <Route path="*" element={<Navigate to="/authentication/sign-up" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
