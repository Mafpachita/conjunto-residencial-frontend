import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { crearResidente, obtenerResidentePorId, actualizarResidente } from "../../services/residenteService";

function ResidenteForm() {
  const [residente, setResidente] = useState({
    IdR: "",
    Nombres: "",
    Telefono: "",
    Correo: "",
    Numero_apartamento: "",
    Numero_torre: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

 useEffect(() => {
  if (esEdicion) {
    obtenerResidentePorId(id).then((res) => {
      // Aseguramos que cada campo esté definido
      const data = res.data[0];
      setResidente({
        IdR: (data.IdR || "").trim(),
        Nombres: data.Nombres || "",
        Telefono: data.Telefono || "",
        Correo: data.Correo || "",
        Numero_apartamento: data.Numero_apartamento || "",
        Numero_torre: data.Numero_torre || "",
      });
    });
  }
}, [id]);

  const handleChange = (e) => {
    setResidente({ ...residente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    residente.IdR = residente.IdR.trim();
    residente.Nombres = residente.Nombres.trim();
    residente.Telefono = residente.Telefono.trim();
    residente.Correo = residente.Correo.trim();
    residente.Numero_apartamento = residente.Numero_apartamento.trim();
    residente.Numero_torre = residente.Numero_torre.trim();

    if (esEdicion) {
      await actualizarResidente(residente);
    } else {
      await crearResidente(residente);
    }

    navigate("/");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar Residente" : "Nuevo Residente"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="IdR"
          placeholder="ID"
          value={residente.IdR}
          onChange={handleChange}
          disabled={esEdicion}
          required
        />
        <input
          type="text"
          name="Nombres"
          placeholder="Nombres"
          value={residente.Nombres}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Telefono"
          placeholder="Teléfono"
          value={residente.Telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Correo"
          placeholder="Correo"
          value={residente.Correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Numero_apartamento"
          placeholder="Apartamento"
          value={residente.Numero_apartamento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Numero_torre"
          placeholder="Torre"
          value={residente.Numero_torre}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          {esEdicion ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default ResidenteForm;

