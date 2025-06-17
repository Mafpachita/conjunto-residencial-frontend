import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crearAdministrador, obtenerAdministradorPorId, actualizarAdministrador } from "../../services/administradorService";

function AdministradorForm() {
  const { id } = useParams();
  const esEdicion = !!id;
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    IdA: "",
    Nombres: "",
    Telefono: "",
    Correo: "",
  });

  useEffect(() => {
    if (esEdicion) {
      obtenerAdministradorPorId(id).then((res) => {
        const data = res.data[0]; // Ajusta si tu backend devuelve otro formato
        setAdmin({
          IdA: data.IdA || "",
          Nombres: data.Nombres || "",
          Telefono: data.Telefono || "",
          Correo: data.Correo || "",
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (esEdicion) {
      await actualizarAdministrador(admin);
    } else {
      await crearAdministrador(admin);
    }
    navigate("/admin");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar Administrador" : "Nuevo Administrador"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="IdA"
          value={admin.IdA}
          onChange={handleChange}
          placeholder="ID"
          disabled={esEdicion}
          required
        />
        <input
          type="text"
          name="Nombres"
          value={admin.Nombres}
          onChange={handleChange}
          placeholder="Nombres"
          required
        />
        <input
          type="text"
          name="Telefono"
          value={admin.Telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <input
          type="email"
          name="Correo"
          value={admin.Correo}
          onChange={handleChange}
          placeholder="Correo"
          required
        />
        <button type="submit" className="btn btn-primary">
          {esEdicion ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default AdministradorForm;
