import React, { useState } from "react";
import { obtenerPagoPorId } from "../../services/pagoService";

function BuscarPago() {
  const [id, setId] = useState("");
  const [pago, setPago] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      const res = await obtenerPagoPorId(id);
      setPago(res.data);
      setError("");
    } catch (e) {
      setPago(null);
      setError("No se encontró el pago con ese ID.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar Pago por ID</h2>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Ingrese ID de pago"
        className="border px-2 py-1 mr-2"
      />
      <button
        onClick={handleBuscar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {pago && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <p><strong>ID:</strong> {pago.ID_PAGO}</p>
          <p><strong>Residente:</strong> {pago.IdR}</p>
          <p><strong>Monto:</strong> {pago.MONTO}</p>
          <p><strong>Fecha:</strong> {pago.FECHA_PAGO}</p>
          <p><strong>Método:</strong> {pago.METODO_PAGO}</p>
          <p><strong>Comprobante:</strong> {pago.COMPROBANTE}</p>
          <p><strong>Observación:</strong> {pago.OBSERVACION}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarPago;

