// src/pages/administradores/AdministradorList.jsx
import React, { useEffect, useState } from "react";
import { obtenerAdministradores, eliminarAdministrador } from "../../services/administradorService";
import { Link } from "react-router-dom";

function AdministradorList() {
  const [administradores, setAdministradores] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cargarAdministradores = async () => {
    try {
      const response = await obtenerAdministradores();
      setAdministradores(response.data);
    } catch (error) {
      console.error("Error al cargar administradores", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este administrador?")) {
      await eliminarAdministrador(id);
      cargarAdministradores();
    }
  };

  useEffect(() => {
    cargarAdministradores();
  }, []);

  if (!usuario) return null;

  return (
    <div className="container mt-4">
      <h2>Información Personal</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p><strong>ID Administrador:</strong> {usuario.REFERENCIA_ID}</p>
          <p><strong>Correo:</strong> {usuario.CORREO}</p>
        </div>
      </div>

      <Link
        to={`/admin/editar/${usuario.REFERENCIA_ID}`}
        className="btn btn-primary mb-3"
      >

      <i className="bi bi-pencil-square me-1"></i>Editar mi información
      </Link>

      {usuario.ROL === "Administrador" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Lista de Administradores</h2>
            <Link to="/admin/nuevo" className="btn btn-success">
              <i className="bi bi-plus-circle me-2"></i>Nuevo Administrador
            </Link>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((a) => (
                <tr key={a.IdA}>
                  <td>{a.IdA}</td>
                  <td>{a.Nombres}</td>
                  <td>{a.Telefono}</td>
                  <td>{a.Correo}</td>
                  <td>
                    <Link
                      to={`/admin/editar/${a.IdA}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button
                      onClick={() => handleEliminar(a.IdA)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AdministradorList;

