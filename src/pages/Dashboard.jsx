import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const irA = (ruta) => navigate(ruta);

  if (!usuario) return <p>No has iniciado sesión.</p>;

  return (
    <div className="container mt-4">
      <h2>Bienvenido, {usuario.ROL}</h2>
      <div className="row mt-4">

        {/* Común para ambos */}
        {usuario.ROL === "Residente" && (
  <div className="col-md-4 mb-3">
    <div className="card" onClick={() => irA("/")}>
      <div className="card-body text-center">
        <i className="bi bi-person-lines-fill fs-2"></i>
        <h5 className="mt-2">Mi Información Personal</h5>
      </div>
    </div>
  </div>
)}

        <div className="col-md-4 mb-3">
          <div className="card" onClick={() => irA("/avisos")}>
            <div className="card-body text-center">
              <i className="bi bi-megaphone-fill fs-2"></i>
              <h5 className="mt-2">Avisos</h5>
            </div>
          </div>
        </div>

        {usuario.ROL === "Administrador" ? (
          <>
            
            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/admin")}>
                
                <div className="card-body text-center">
                  <i className="bi bi-people-fill fs-2"></i>
                  <h5 className="mt-2">Administradores</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
          <div className="card" onClick={() => irA("/")}>
          <div className="card-body text-center">
            <i className="bi bi-people fs-2"></i>
            <h5 className="mt-2">Residentes</h5>
        </div>
       </div>
    </div>

            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/pagos")}>
                <div className="card-body text-center">
                  <i className="bi bi-credit-card-fill fs-2"></i>
                  <h5 className="mt-2">Pagos</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/tickets")}>
                <div className="card-body text-center">
                  <i className="bi bi-tools fs-2"></i>
                  <h5 className="mt-2">Tickets</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/agendamientos")}>
                <div className="card-body text-center">
                  <i className="bi bi-calendar2-event-fill fs-2"></i>
                  <h5 className="mt-2">Agendamientos</h5>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/MisPagos")}>
                <div className="card-body text-center">
                  <i className="bi bi-receipt fs-2"></i>
                  <h5 className="mt-2">Mis Pagos</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/agendamientos/nuevo")}>
                <div className="card-body text-center">
                  <i className="bi bi-calendar-plus fs-2"></i>
                  <h5 className="mt-2">Agendar Espacio</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card" onClick={() => irA("/ticket/nuevo")}>
                <div className="card-body text-center">
                  <i className="bi bi-exclamation-circle-fill fs-2"></i>
                  <h5 className="mt-2">Reportar Mantenimiento</h5>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
