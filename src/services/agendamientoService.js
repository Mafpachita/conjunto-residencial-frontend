import axios from "axios";

const API_URL = "https://localhost:44383/api/Agendamiento";

// Insertar nuevo agendamiento
export const crearAgendamiento = (agendamiento) => {
  return axios.post(`${API_URL}/Insertar`, agendamiento);
};

// Listar todos los agendamientos
export const listarAgendamientos = () => {
  return axios.get(`${API_URL}/Listar`);
};

// Obtener agendamiento por ID
export const obtenerAgendamientoPorId = (id) => {
  return axios.get(`${API_URL}/Obtener/${id}`);
};

// Actualizar agendamiento
export const actualizarAgendamiento = (agendamiento) => {
  return axios.put(`${API_URL}/Actualizar`, agendamiento);
};

// Eliminar agendamiento
export const eliminarAgendamiento = (id) => {
  return axios.delete(`${API_URL}/Eliminar/${id}`);
};
