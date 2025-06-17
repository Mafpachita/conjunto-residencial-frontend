import React, { useEffect, useState } from "react";
import {
  crearTicket,
  obtenerTicketPorId,
  actualizarTicket,
} from "../../services/ticketService";
import { useNavigate, useParams } from "react-router-dom";

function TicketForm() {
  const [ticket, setTicket] = useState({
    IdR: "",
    DESCRIPCION: "",
    ESTADO: "Pendiente",
    OBSERVACION_ADMIN: "",
  });

  const { id } = useParams();
  const esEdicion = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    if (esEdicion) {
      obtenerTicketPorId(id).then((res) => {
        setTicket(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        await actualizarTicket(ticket);
        alert("Ticket actualizado.");
      } else {
        await crearTicket(ticket);
        alert("Ticket registrado.");
      }

      navigate("/tickets");
    } catch (error) {
      console.error("Error al guardar el ticket", error);
      alert("Ocurrió un error al guardar.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{esEdicion ? "Editar Ticket" : "Nuevo Ticket de Mantenimiento"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {!esEdicion && (
          <>
            <div className="mb-3">
              <label className="form-label">ID Residente</label>
              <input
                type="text"
                name="IdR"
                className="form-control"
                value={ticket.IdR}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="DESCRIPCION"
                className="form-control"
                value={ticket.DESCRIPCION}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </>
        )}

        {esEdicion && (
          <>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                name="ESTADO"
                className="form-control"
                value={ticket.ESTADO}
                onChange={handleChange}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Observación del Administrador</label>
              <textarea
                name="OBSERVACION_ADMIN"
                className="form-control"
                value={ticket.OBSERVACION_ADMIN}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          {esEdicion ? "Actualizar Ticket" : "Registrar Ticket"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
