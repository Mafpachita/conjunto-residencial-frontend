import React from "react";
import { Navigate } from "react-router-dom";
import { obtenerUsuarioAutenticado } from "../utils/auth";

const RutaPrivada = ({ children }) => {
  const usuario = obtenerUsuarioAutenticado();
  return usuario ? children : <Navigate to="/login" />;
};

export default RutaPrivada;
