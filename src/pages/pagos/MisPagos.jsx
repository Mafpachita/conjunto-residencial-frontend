import React, { useEffect, useState } from "react";
import { obtenerPagosPorResidente, obtenerPagoPorId } from "../../services/pagoService";
import "bootstrap-icons/font/bootstrap-icons.css";

function MisPagos() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [pagos, setPagos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");

  useEffect(() => {
    if (usuario && usuario.REFERENCIA_ID) {
      cargarMisPagos(usuario.REFERENCIA_ID);
    }
  }, []);

  const cargarMisPagos = async (idR) => {
  try {
    const res = await obtenerPagosPorResidente(idR); // ✅ esta línea es clave
    setPagos(res.data);
    setResultados(res.data);
  } catch (err) {
    console.error("Error al cargar pagos del residente", err);
  }
};

  const handleBuscar = async () => {
    if (busquedaId.trim() === "") return;
    try {
      const res = await obtenerPagoPorId(busquedaId);
      if (res.data && res.data.IdR === usuario.REFERENCIA_ID) {
        setResultados([res.data]);
      } else {
        setResultados([]);
      }
    } catch {
      setResultados([]);
    }
  };

  const handleLimpiar = () => {
    setBusquedaId("");
    setResultados(pagos);
  };

  return (
    <div className="container mt-4">
      <h2>Mis Pagos Registrados</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <input
            type="text"
            placeholder="Buscar por ID de Pago"
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
      <th>Monto</th>
      <th>Fecha</th>
      <th>Método</th>
      <th>Comprobante</th>
      <th>Observación</th>
    </tr>
  </thead>
  <tbody>
    {resultados.length > 0 ? (
      resultados.map((pago) => (
        <tr key={pago.ID_PAGO}>
          <td>{pago.ID_PAGO}</td>
          <td>${pago.MONTO.toFixed(2)}</td>
          <td>{new Date(pago.FECHA_PAGO).toLocaleDateString()}</td>
          <td>{pago.METODO_PAGO}</td>
          <td>{pago.COMPROBANTE}</td>
          <td>{pago.OBSERVACION}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center">
          No se encontraron pagos.
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
}

export default MisPagos;