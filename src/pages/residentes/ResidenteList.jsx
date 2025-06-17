import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerResidentes,
  obtenerResidentePorId,
  eliminarResidente,
} from "../../services/residenteService";
import "bootstrap-icons/font/bootstrap-icons.css";

function ResidenteList() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [residentes, setResidentes] = useState([]);
  const [residente, setResidente] = useState(null);

  useEffect(() => {
    if (!usuario) return;

    if (usuario.ROL === "Administrador") {
      cargarTodos();
    } else if (usuario.ROL === "Residente") {
      cargarMisDatos(usuario.REFERENCIA_ID);
    }
  }, []);

  const cargarTodos = async () => {
    try {
      const res = await obtenerResidentes();
      setResidentes(res.data);
    } catch (error) {
      console.error("Error al cargar residentes", error);
    }
  };

  const cargarMisDatos = async (id) => {
    try {
      const res = await obtenerResidentePorId(id);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setResidente(res.data[0]);
      } else {
        console.warn("No se encontró información del residente.");
      }
    } catch (error) {
      console.error("Error al cargar datos del residente", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este residente?")) {
      try {
        await eliminarResidente(id);
        cargarTodos();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      {usuario?.ROL === "Administrador" ? (
        <>
          <h2>Lista de Residentes</h2>
          <Link to="/nuevo" className="btn btn-success mb-3">
            <i className="bi bi-plus-circle me-2"></i>Nuevo Residente
          </Link>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Torre</th>
                <th>Apartamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {residentes.map((r) => (
                <tr key={r.IdR}>
                  <td>{r.IdR}</td>
                  <td>{r.Nombres}</td>
                  <td>{r.Telefono}</td>
                  <td>{r.Correo}</td>
                  <td>{r.Numero_torre}</td>
                  <td>{r.Numero_apartamento}</td>
                  <td>
                    <Link
                      to={`/editar/${r.IdR}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(r.IdR)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : residente ? (
        <>
          <h2>Mi Información Personal</h2>
          <div className="card mt-3">
            <div className="card-body">
              <p><strong>ID Residente:</strong> {residente.IdR}</p>
              <p><strong>Nombre:</strong> {residente.Nombres}</p>
              <p><strong>Teléfono:</strong> {residente.Telefono}</p>
              <p><strong>Correo:</strong> {residente.Correo}</p>
              <p><strong>Torre:</strong> {residente.Numero_torre}</p>
              <p><strong>Apartamento:</strong> {residente.Numero_apartamento}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando tus datos...</p>
      )}
    </div>
  );
}

export default ResidenteList;




