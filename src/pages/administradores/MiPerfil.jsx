import React, { useEffect, useState } from "react";
import { obtenerAdministradorPorId } from "../../services/administradorService";

function MiPerfil() {
  const [admin, setAdmin] = useState(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (usuario && usuario.REFERENCIA_ID) {
      obtenerAdministradorPorId(usuario.REFERENCIA_ID)
        .then((res) => setAdmin(res.data))
        .catch((err) => console.error("Error al obtener datos:", err));
    }
  }, []);

  if (!admin) {
    return (
      <div className="container mt-4">
        <h2>Mi Información Personal</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Mi Información Personal</h2>
      <div className="card mt-3">
        <div className="card-body">
          <p><strong>ID Administrador:</strong> {admin.IdA}</p>
          <p><strong>Nombre:</strong> {admin.Nombres}</p>
          <p><strong>Teléfono:</strong> {admin.Telefono}</p>
          <p><strong>Correo:</strong> {admin.Correo}</p>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
