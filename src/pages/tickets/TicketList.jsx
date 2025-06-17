import React, { useEffect, useState } from "react";
import {
  listarTickets,
  eliminarTicket,
  obtenerTicketPorId, // <--- esta línea debe estar presente
} from "../../services/ticketService";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");

  const cargarTickets = async () => {
    try {
      const response = await listarTickets();
      setTickets(response.data);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al cargar tickets", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este ticket?")) {
      await eliminarTicket(id);
      cargarTickets();
    }
  };

  const handleBuscar = async () => {
    if (busquedaId.trim() === "") return;
    try {
      const response = await obtenerTicketPorId(busquedaId);
      setResultados(response.data ? [response.data] : []);
    } catch {
      setResultados([]);
    }
  };

  const handleLimpiar = () => {
    setBusquedaId("");
    setResultados(tickets);
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Tickets de Mantenimiento</h2>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/ticket/nuevo" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>Nuevo Ticket
        </Link>

        <div className="d-flex">
          <input
            type="text"
            placeholder="Buscar por ID"
            className="form-control me-2"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={handleBuscar}>
            <i className="bi bi-search me-1"></i>Buscar
          </button>
          <button className="btn btn-secondary" onClick={handleLimpiar}>
            <i className="bi bi-x-circle me-1"></i>Limpiar
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Residente</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Observación Admin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((t) => (
            <tr key={t.ID_TICKET}>
              <td>{t.ID_TICKET}</td>
              <td>{t.IdR}</td>
              <td>{t.DESCRIPCION}</td>
              <td>{new Date(t.FECHA_REPORTE).toLocaleDateString()}</td>
              <td>{t.ESTADO}</td>
              <td>{t.OBSERVACION_ADMIN}</td>
              <td>
                <Link
                  to={`/ticket/editar/${t.ID_TICKET}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  <i className="bi bi-pencil-fill"></i>
                </Link>
                <button
                  onClick={() => handleEliminar(t.ID_TICKET)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;


