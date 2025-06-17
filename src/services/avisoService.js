// src/services/avisoService.js
import axios from "axios";


const API_URL = "https://localhost:44383/api/Aviso";

// Crear nuevo aviso
export const crearAviso = (aviso) => {
  return axios.post(`${API_URL}/Insertar`, aviso);
};

// Obtener todos los avisos
export const listarAvisos = () => {
  return axios.get(`${API_URL}/Listar`);
};

// Obtener aviso por ID
export const obtenerAvisoPorId = (id) => {
  return axios.get(`${API_URL}/Obtener/${id}`);
};

// Actualizar aviso
export const actualizarAviso = (aviso) => {
  return axios.put(`${API_URL}/Actualizar`, aviso);
};

// Eliminar aviso
export const eliminarAviso = (id) => {
  return axios.delete(`${API_URL}/Eliminar/${id}`);
};


