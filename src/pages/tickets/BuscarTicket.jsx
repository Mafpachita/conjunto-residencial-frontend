import React, { useState } from "react";
import { obtenerTicketPorId } from "../../services/ticketService";

function BuscarTicket() {
  const [id, setId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    setError("");
    setTicket(null);
    if (!id) return;

    try {
      const response = await obtenerTicketPorId(id);
      setTicket(response.data);
    } catch (err) {
      setError("No se encontró el ticket con ese ID.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Ticket por ID</h2>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Ingrese ID del ticket"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {ticket && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">ID: {ticket.ID_TICKET}</h5>
            <p className="card-text">Residente: {ticket.IdR}</p>
            <p className="card-text">Descripción: {ticket.DESCRIPCION}</p>
            <p className="card-text">
              Fecha Reporte: {new Date(ticket.FECHA_REPORTE).toLocaleString()}
            </p>
            <p className="card-text">Estado: {ticket.ESTADO}</p>
            <p className="card-text">Observación: {ticket.OBSERVACION_ADMIN}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarTicket;
