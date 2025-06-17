import React from "react";
import { Navigate } from "react-router-dom";

const RutaPrivadaRol = ({ children, rolPermitido }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.ROL !== rolPermitido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaPrivadaRol;