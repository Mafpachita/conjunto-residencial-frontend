import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearAviso,
  obtenerAvisoPorId,
  actualizarAviso,
} from "../../services/avisoService";

function AvisoForm() {
  const [aviso, setAviso] = useState({
    IdA: "",
    TITULO: "",
    MENSAJE: "",
  });

  const { id } = useParams();
  const esEdicion = !!id;
  const navigate = useNavigate();

  useEffect(() => {
  if (esEdicion) {
    obtenerAvisoPorId(id).then((res) => {
      console.log("📦 Aviso a editar:", res.data);
      setAviso(res.data);
    });
  }
}, [id]);

  const handleChange = (e) => {
    setAviso({ ...aviso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (esEdicion) {
        await actualizarAviso({ ...aviso, ID_AVISO: parseInt(id) });
        alert("Aviso actualizado correctamente");
      } else {
        await crearAviso(aviso);
        alert("Aviso creado exitosamente");
      }
      navigate("/avisos");
    } catch (error) {
      console.error("Error al guardar el aviso:", error);
      alert("Ocurrió un error al guardar.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{esEdicion ? "Editar Aviso" : "Nuevo Aviso"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID Administrador</label>
          <input
            type="text"
            className="form-control"
            name="IdA"
            value={aviso.IdA}
            onChange={handleChange}
            required
            disabled={esEdicion}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            name="TITULO"
            value={aviso.TITULO}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            name="MENSAJE"
            value={aviso.MENSAJE}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {esEdicion ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default AvisoForm;

