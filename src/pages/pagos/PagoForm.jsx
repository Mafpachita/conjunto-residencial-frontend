import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearPago,
  obtenerPagoPorId,
  actualizarPago,
} from "../../services/pagoService";

function PagoForm() {
  const [pago, setPago] = useState({
    IdR: "",
    MONTO: "",
    FECHA_PAGO: "",
    METODO_PAGO: "",
    OBSERVACION: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  useEffect(() => {
    if (esEdicion) {
      obtenerPagoPorId(id).then((res) => {
        const data = res.data;
        setPago({
          IdR: data.IdR || "",
          MONTO: data.MONTO || "",
          FECHA_PAGO: data.FECHA_PAGO?.slice(0, 10) || "",
          METODO_PAGO: data.METODO_PAGO || "",
          OBSERVACION: data.OBSERVACION || "",
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setPago({ ...pago, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (esEdicion) {
      await actualizarPago({ ...pago, ID_PAGO: parseInt(id) });
    } else {
      await crearPago(pago);
    }
    navigate("/pagos");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {esEdicion ? "Editar Pago" : "Registrar Nuevo Pago"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID del Residente</label>
          <input
            type="text"
            className="form-control"
            name="IdR"
            value={pago.IdR}
            onChange={handleChange}
            disabled={esEdicion}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="MONTO"
            value={pago.MONTO}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Pago</label>
          <input
            type="date"
            className="form-control"
            name="FECHA_PAGO"
            value={pago.FECHA_PAGO}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de Pago</label>
          <input
            type="text"
            className="form-control"
            name="METODO_PAGO"
            value={pago.METODO_PAGO}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Observación</label>
          <textarea
            className="form-control"
            name="OBSERVACION"
            value={pago.OBSERVACION}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {esEdicion ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default PagoForm;
