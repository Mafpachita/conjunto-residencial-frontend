import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://localhost:44383/api/Login/Autenticar", {
        correo,
        contrasena,
});

      const usuario = response.data;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redireccionar según rol
      if (usuario.ROL === "Administrador") {
        navigate("/inicio");

      } else if (usuario.ROL === "Residente") {
        navigate("/inicio");
 // O una página para residentes
      } else {
        setError("Rol no reconocido");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

