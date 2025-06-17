import React, { useState } from "react";
import { obtenerResidentePorId } from "../../services/residenteService";

function BuscarResidente() {
  const [id, setId] = useState("");
  const [residente, setResidente] = useState(null);
  const [error, setError] = useState("");

  const buscar = async () => {
    try {
      const res = await obtenerResidentePorId(id);
      if (res.data.length > 0) {
        setResidente(res.data[0]);
        setError("");
      } else {
        setResidente(null);
        setError("No se encontró el residente.");
      }
    } catch (err) {
      setError("Error al buscar residente.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar Residente por ID</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Ingrese ID"
        className="border px-2 py-1 mr-2"
      />
      <button
        onClick={buscar}
        className="btn btn-success mb-3"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {residente && (
        <div className="mt-4 border p-4">
          <p><strong>Nombre:</strong> {residente.Nombres}</p>
          <p><strong>Teléfono:</strong> {residente.Telefono}</p>
          <p><strong>Correo:</strong> {residente.Correo}</p>
          <p><strong>Apartamento:</strong> {residente.Numero_apartamento}</p>
          <p><strong>Torre:</strong> {residente.Numero_torre}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarResidente;
