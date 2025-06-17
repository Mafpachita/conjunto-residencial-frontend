import axios from "axios";

const API_URL = "https://localhost:44383/api/Residente";

// Obtener todos los residentes
export const obtenerResidentes = () => {
  return axios.get(API_URL);
};

// Obtener un residente por ID


export const obtenerResidentePorId = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Crear un nuevo residente
export const crearResidente = (residente) => {
  return axios.post(API_URL, residente);
};

// Actualizar un residente existente
export const actualizarResidente = (residente) => {
  return axios.put(API_URL, residente);
};

// Eliminar un residente
export const eliminarResidente = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
