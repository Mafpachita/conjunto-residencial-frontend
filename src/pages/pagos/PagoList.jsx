import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listarPagos,
  eliminarPago,
  obtenerPagoPorId,
} from "../../services/pagoService";
import "bootstrap-icons/font/bootstrap-icons.css";

function PagoList() {
  const [pagos, setPagos] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");
  const [resultados, setResultados] = useState([]);

  const cargarPagos = async () => {
    try {
      const response = await listarPagos();
      setPagos(response.data);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al cargar pagos", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este pago?")) {
      await eliminarPago(id);
      cargarPagos();
    }
  };

  const handleBuscar = () => {
    const filtrados = pagos.filter((p) =>
      p.ID_PAGO.toString().includes(busquedaId)
    );
    setResultados(filtrados);
  };

  const handleLimpiar = () => {
    setBusquedaId("");
    setResultados(pagos);
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Pagos</h2>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/pago/nuevo" className="btn btn-success">
          <i className="bi bi-cash-coin me-2"></i>Registrar Pago
        </Link>

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
            <th>Residente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Método</th>
            <th>Comprobante</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((pago) => (
            <tr key={pago.ID_PAGO}>
              <td>{pago.ID_PAGO}</td>
              <td>{pago.IdR}</td>
              <td>${pago.MONTO.toFixed(2)}</td>
              <td>{new Date(pago.FECHA_PAGO).toLocaleDateString()}</td>
              <td>{pago.METODO_PAGO}</td>
              <td>{pago.COMPROBANTE}</td>
              <td>{pago.OBSERVACION}</td>
              <td>
                <Link
                  to={`/pago/editar/${pago.ID_PAGO}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  <i className="bi bi-pencil-fill"></i>
                </Link>
                <button
                  onClick={() => handleEliminar(pago.ID_PAGO)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PagoList;
