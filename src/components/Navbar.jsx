import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerUsuarioAutenticado, cerrarSesion } from "../utils/auth";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/logo_transparente.png";


function Navbar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const irADashboard = () => {
    if (usuario?.ROL === "Administrador") {
      navigate("/inicio"); // o puedes usar /dashboard/admin si prefieres separar
    } else if (usuario?.ROL === "Residente") {
      navigate("/inicio");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <button
        className="navbar-brand btn btn-link p-0 border-0 d-flex align-items-center text-white text-decoration-none"
        onClick={irADashboard}
      >
        <img src={logo} alt="Logo" height="40" className="me-2" />
        Conjunto Residencial
      </button>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {usuario && (
  <ul className="navbar-nav me-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/">
        Residentes
      </Link>
    </li>

    {/* Avisos visible para ambos roles */}
    <li className="nav-item">
      <Link className="nav-link" to="/avisos">
        <i className="bi bi-megaphone-fill me-1"></i>Avisos
      </Link>
    </li>

    {usuario.ROL === "Administrador" && (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            Administradores
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pagos">
            Pagos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tickets">
            Tickets
          </Link>
        </li>
      </>
    )}

    {usuario.ROL === "Residente" && (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/agendamientos/nuevo">
            Agendar Espacio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ticket/nuevo">
            Reportar Mantenimiento
          </Link>
        </li>

        <li className="nav-item">
  <Link className="nav-link" to="/mispagos">
    Mis Pagos
  </Link>
</li>
      </>
    )}
  </ul>

        )}

        <ul className="navbar-nav ms-auto">
          {usuario ? (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Iniciar Sesión
              </Link>
            </li>

            
            
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
