import axios from "axios";

const API_URL = "https://localhost:44383/api/Pago";

// Crear un nuevo pago
export const crearPago = (pago) => {
  return axios.post(`${API_URL}/insertar`, pago);
};

// Obtener todos los pagos
export const listarPagos = () => {
  return axios.get(`${API_URL}/listar`);
};

// Obtener un pago por su ID
export const obtenerPagoPorId = (id) => {
  return axios.get(`${API_URL}/obtener/${id}`);
};

// Actualizar un pago
export const actualizarPago = (pago) => {
  return axios.put(`${API_URL}/actualizar`, pago);
};

// Eliminar un pago por ID
export const eliminarPago = (id) => {
  return axios.delete(`${API_URL}/eliminar/${id}`);
};

export const obtenerPagosPorResidente = (idR) => {
  return axios.get(`https://localhost:44383/api/Pago/residente/${idR}`);
};