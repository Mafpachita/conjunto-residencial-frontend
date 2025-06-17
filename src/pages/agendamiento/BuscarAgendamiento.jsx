import React, { useState } from "react";
import { obtenerAgendamientoPorId } from "../../services/agendamientoService";

function BuscarAgendamiento() {
  const [id, setId] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    try {
      const res = await obtenerAgendamientoPorId(id);
      setResultado(res.data);
      setError(null);
    } catch (err) {
      setResultado(null);
      setError("No se encontró el agendamiento");
    }
  };

  const handleLimpiar = () => {
    setId("");
    setResultado(null);
    setError(null);
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Agendamiento por ID</h2>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="ID del Agendamiento"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleBuscar}>
          Buscar
        </button>
        <button className="btn btn-secondary ms-2" onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {resultado && (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Agendamiento ID: {resultado.ID_AGENDAMIENTO}</h5>
            <p className="card-text">Residente: {resultado.IdR}</p>
            <p className="card-text">Espacio: {resultado.ESPACIO}</p>
            <p className="card-text">Fecha: {resultado.FECHA_RESERVA}</p>
            <p className="card-text">
              Hora: {resultado.HORA_INICIO} - {resultado.HORA_FIN}
            </p>
            <p className="card-text">Estado: {resultado.ESTADO}</p>
            <p className="card-text">Observación: {resultado.OBSERVACION}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarAgendamiento;
