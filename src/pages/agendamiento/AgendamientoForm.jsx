import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearAgendamiento,
  obtenerAgendamientoPorId,
  actualizarAgendamiento
} from "../../services/agendamientoService";

function AgendamientoForm() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  const [agendamiento, setAgendamiento] = useState({
    IdR: "",
    ESPACIO: "",
    FECHA_RESERVA: "",
    HORA_INICIO: "",
    HORA_FIN: "",
    ESTADO: "Pendiente",
    OBSERVACION: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  useEffect(() => {
    if (esEdicion) {
      obtenerAgendamientoPorId(id).then((res) => {
        const a = res.data;
        setAgendamiento({
          IdR: a.IdR,
          ESPACIO: a.ESPACIO,
          FECHA_RESERVA: a.FECHA_RESERVA.substring(0, 10),
          HORA_INICIO: a.HORA_INICIO,
          HORA_FIN: a.HORA_FIN,
          ESTADO: a.ESTADO,
          OBSERVACION: a.OBSERVACION
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setAgendamiento({ ...agendamiento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const datosFinales = {
    ...agendamiento,
    IdR: usuario.REFERENCIA_ID // Asegura que use el IdR del usuario logueado
  };

  try {
    if (esEdicion) {
      await actualizarAgendamiento({ ID_AGENDAMIENTO: parseInt(id), ...datosFinales });
    } else {
      await crearAgendamiento(datosFinales);
    }
    navigate("/agendamientos");
  } catch (error) {
    console.error("Error al guardar agendamiento:", error);
    alert("Hubo un error al guardar.");
  }
};

  const generarOpcionesHora = () => {
  const opciones = [];
  for (let hora = 0; hora < 24; hora++) {
    for (let min of [0, 30]) {
      const h = hora.toString().padStart(2, "0");
      const m = min.toString().padStart(2, "0");
      opciones.push(
        <option key={`${h}:${m}`} value={`${h}:${m}`}>
          {h}:{m}
        </option>
      );
    }
  }
  return opciones;
};

  return (
    <div className="container mt-4">
      <h2>{esEdicion ? "Editar Agendamiento" : "Nuevo Agendamiento"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        
        {esEdicion ? (
  <div className="col-md-6">
    <label className="form-label">IdR</label>
    <input
      type="text"
      name="IdR"
      value={agendamiento.IdR}
      onChange={handleChange}
      className="form-control"
      disabled
    />
  </div>
) : (
  <div className="col-md-6">
    <label className="form-label">ID Residente</label>
    <input
      type="text"
      className="form-control"
      value={usuario?.REFERENCIA_ID || ""}
      disabled
    />
  </div>
)}

        <div className="col-md-6">
          <label className="form-label">Espacio</label>
          <select
            name="ESPACIO"
            value={agendamiento.ESPACIO}
            onChange={handleChange}
            required
            className="form-select"
>
  <option value="">-- Seleccione un espacio --</option>
  <option value="Piscina">Piscina</option>
  <option value="Salón de eventos">Salón de eventos</option>
  <option value="Parrilla">Parrilla</option>
</select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha Reserva</label>
          <input
            type="date"
            name="FECHA_RESERVA"
            value={agendamiento.FECHA_RESERVA}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Hora Inicio</label>
         <select
            name="HORA_INICIO"
            value={agendamiento.HORA_INICIO}
            onChange={handleChange}
            required
            className="form-select"
        >
  <option value="">-- Hora de inicio --</option>
  {generarOpcionesHora()}
</select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Hora Fin</label>
          <select
            name="HORA_FIN"
            value={agendamiento.HORA_FIN}
            onChange={handleChange}
            required
            className="form-select"
>
  <option value="">-- Hora de fin --</option>
  {generarOpcionesHora()}
</select>
        </div>
        {esEdicion && (
          <div className="col-md-6">
            <label className="form-label">Estado</label>
            <select
              name="ESTADO"
              value={agendamiento.ESTADO}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        )}
        <div className="col-12">
          <label className="form-label">Observación</label>
          <textarea
            name="OBSERVACION"
            value={agendamiento.OBSERVACION}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {esEdicion ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgendamientoForm;
