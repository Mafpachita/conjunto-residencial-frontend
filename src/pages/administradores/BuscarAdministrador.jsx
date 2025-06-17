import React, { useState } from "react";
import { obtenerAdministradorPorId } from "../../services/administradorService";

function BuscarAdministrador() {
  const [id, setId] = useState("");
  const [resultado, setResultado] = useState(null);

  const buscar = async () => {
    try {
      const res = await obtenerAdministradorPorId(id);
      setResultado(res.data[0] || null);
    } catch (error) {
      console.error("Error al buscar administrador:", error);
      setResultado(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Buscar Administrador por ID</h2>
      <input
        type="text"
        placeholder="Ingrese IdA"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button onClick={buscar} className="btn btn-success mb-3">
        Buscar
      </button>

      {resultado && (
        <div className="mt-4 border p-3">
          <p><strong>ID:</strong> {resultado.IdA}</p>
          <p><strong>Nombre:</strong> {resultado.Nombres}</p>
          <p><strong>Teléfono:</strong> {resultado.Telefono}</p>
          <p><strong>Correo:</strong> {resultado.Correo}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarAdministrador;
