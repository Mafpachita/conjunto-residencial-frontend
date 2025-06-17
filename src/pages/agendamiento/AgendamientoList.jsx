import React, { useEffect, useState } from "react";
import {
  listarAgendamientos,
  obtenerAgendamientoPorId,
  eliminarAgendamiento,
} from "../../services/agendamientoService";
import { Link } from "react-router-dom";

function AgendamientoList() {
  const [agendamientos, setAgendamientos] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");

  const cargarAgendamientos = async () => {
    const res = await listarAgendamientos();
    setAgendamientos(res.data);
  };

  const buscarPorId = async () => {
    if (busquedaId.trim() === "") {
      cargarAgendamientos();
      return;
    }


    try {
      const res = await obtenerAgendamientoPorId(busquedaId);
      setAgendamientos(res.data ? [res.data] : []);
    } catch (error) {
      alert("No se encontró agendamiento con ese ID");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este agendamiento?")) {
      await eliminarAgendamiento(id);
      cargarAgendamientos();
    }
  };

  useEffect(() => {
    cargarAgendamientos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Agendamientos</h2>

      <div className="input-group mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID"
          value={busquedaId}
          onChange={(e) => setBusquedaId(e.target.value)}
        />
        <button onClick={buscarPorId} className="btn btn-primary">
          Buscar
        </button>
      </div>

      <Link to="/agendamientos/nuevo" className="btn btn-success mb-3">
        + Nuevo Agendamiento
      </Link>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Residente</th>
            <th>Espacio</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Estado</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agendamientos.map((a) => (
            <tr key={a.ID_AGENDAMIENTO}>
              <td>{a.ID_AGENDAMIENTO}</td>
              <td>{a.IdR}</td>
              <td>{a.ESPACIO}</td>
              <td>{a.FECHA_RESERVA?.substring(0, 10)}</td>
              <td>{a.HORA_INICIO}</td>
              <td>{a.HORA_FIN}</td>
              <td>{a.ESTADO}</td>
              <td>{a.OBSERVACION}</td>
              <td>
                <Link
                  to={`/agendamientos/editar/${a.ID_AGENDAMIENTO}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleEliminar(a.ID_AGENDAMIENTO)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgendamientoList;
