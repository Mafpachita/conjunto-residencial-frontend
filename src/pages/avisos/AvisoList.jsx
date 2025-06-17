
import React, { useEffect, useState } from "react";
import {
  listarAvisos,
  eliminarAviso,
  obtenerAvisoPorId,
} from "../../services/avisoService";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function AvisoList() {
  const [avisos, setAvisos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.ROL === "Administrador";

  const cargarAvisos = async () => {
    try {
      const response = await listarAvisos();
      setAvisos(response.data);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al cargar avisos", error);
    }
  };

  const handleBuscar = async () => {
    if (!busquedaId) return;
    try {
      const response = await obtenerAvisoPorId(busquedaId);
      setResultados(response.data ? [response.data] : []);
    } catch {
      setResultados([]);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este aviso?")) return;
    await eliminarAviso(id);
    cargarAvisos();
  };

  const handleLimpiar = () => {
    setBusquedaId("");
    setResultados(avisos);
  };

  useEffect(() => {
    cargarAvisos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Avisos</h2>

      <div className="d-flex justify-content-between mb-3">
        {esAdmin && (
          <Link to="/avisos/nuevo" className="btn btn-success">
            <i className="bi bi-plus-circle me-1"></i>Nuevo Aviso
          </Link>
        )}

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
            <th>Título</th>
            <th>Mensaje</th>
            <th>Publicado</th>
            <th>Administrador</th>
            {esAdmin && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {resultados.map((a) => (
            <tr key={a.ID_AVISO}>
              <td>{a.ID_AVISO}</td>
              <td>{a.TITULO}</td>
              <td>{a.MENSAJE}</td>
              <td>{new Date(a.FECHA_PUBLICACION).toLocaleDateString()}</td>
              <td>{a.IdA}</td>
              {esAdmin && (
                <td>
                  <Link
                    to={`/avisos/editar/${a.ID_AVISO}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button
                    onClick={() => handleEliminar(a.ID_AVISO)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvisoList;

