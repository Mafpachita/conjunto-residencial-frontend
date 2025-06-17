
import axios from "axios";

const API_URL = "https://localhost:44383/api/TicketMantenimiento";

// Crear un nuevo ticket
export const crearTicket = (ticket) => {
  return axios.post(API_URL, ticket);
};

// Obtener todos los tickets
export const listarTickets = () => {
  return axios.get(API_URL);
};

// Obtener un ticket por ID
export const obtenerTicketPorId = (id) => {
  return axios.get(`${API_URL}/obtener/${id}`);
};

// (Opcional) Actualizar ticket
export const actualizarTicket = (ticket) => {
  return axios.put(`${API_URL}/actualizar`, ticket); // Si habilitas esto en el backend
};

// (Opcional) Eliminar ticket
export const eliminarTicket = (id) => {
  return axios.delete(`${API_URL}/eliminar/${id}`); // Si habilitas esto en el backend
};

