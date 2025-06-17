import axios from "axios";

const API_URL = "https://localhost:44383/api/Administrador";

// Obtener todos los administradores
export const obtenerAdministradores = () => {
  return axios.get(API_URL);
};

// Obtener un administrador por su ID
export const obtenerAdministradorPorId = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Crear un nuevo administrador
export const crearAdministrador = (administrador) => {
  return axios.post(API_URL, administrador);
};

// Actualizar un administrador existente
export const actualizarAdministrador = (administrador) => {
  return axios.put(API_URL, administrador);
};

// Eliminar un administrador por ID
export const eliminarAdministrador = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
