import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Residentes
import ResidenteList from "./pages/residentes/ResidenteList";
import ResidenteForm from "./pages/residentes/ResidenteForm";
import BuscarResidente from "./pages/residentes/BuscarResidente";

// Administradores
import AdministradorList from "./pages/administradores/AdministradorList";
import AdministradorForm from "./pages/administradores/AdministradorForm";
import BuscarAdministrador from "./pages/administradores/BuscarAdministrador";
import  MiPerfil from "./pages/administradores/MiPerfil";

// Pagos
import PagoList from "./pages/pagos/PagoList";
import PagoForm from "./pages/pagos/PagoForm";
import BuscarPago from "./pages/pagos/BuscarPago";
import MisPagos from "./pages/pagos/MisPagos";



// Agendamiento
import AgendamientoList from "./pages/agendamiento/AgendamientoList";
import AgendamientoForm from "./pages/agendamiento/AgendamientoForm";
import BuscarAgendamiento from "./pages/agendamiento/BuscarAgendamiento";

// Tickets
import TicketList from "./pages/tickets/TicketList";
import TicketForm from "./pages/tickets/TicketForm";

import AvisoList from "./pages/avisos/AvisoList";
import AvisoForm from "./pages/avisos/AvisoForm";


// Login
import LoginForm from "./pages/login/LoginForm";

// Ruta privada
import RutaPrivada from "./components/RutaPrivada";
import RutaPrivadaRol from "./components/RutaPrivadaRol";

import Dashboard from "./pages/Dashboard";



function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Residentes */}
        <Route path="/" element={<ResidenteList />} />
        <Route path="/nuevo" element={<ResidenteForm />} />
        <Route path="/editar/:id" element={<ResidenteForm />} />
        <Route path="/buscar" element={<BuscarResidente />} />

        {/* Administradores */}
        <Route path="/admin" element={<AdministradorList />} />
        <Route path="/admin/nuevo" element={<AdministradorForm />} />
        <Route path="/admin/editar/:id" element={<AdministradorForm />} />
        <Route path="/admin/buscar" element={<BuscarAdministrador />} />
        <Route path="/admin/perfil" element={<MiPerfil />} />

        {/* Pagos */}
        <Route path="/pagos" element={<PagoList />} />
        <Route path="/pago/nuevo" element={<PagoForm />} />
        <Route path="/pago/editar/:id" element={<PagoForm />} />
        <Route path="/pago/buscar" element={<BuscarPago />} />
        <Route path="/mispagos" element={<MisPagos />} />

        {/* Agendamientos */}
        <Route path="/agendamientos" element={<AgendamientoList />} />
        <Route path="/agendamientos/nuevo" element={<AgendamientoForm />} />
        <Route path="/agendamientos/editar/:id" element={<AgendamientoForm />} />
        <Route path="/agendamientos/buscar" element={<BuscarAgendamiento />} />

        {/* Tickets */}
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/ticket/nuevo" element={<TicketForm />} />
        <Route path="/ticket/editar/:id" element={<TicketForm />} />

        <Route path="/avisos" element={<AvisoList />} />
        <Route path="/avisos/nuevo" element={<AvisoForm />} />
        <Route path="/avisos/editar/:id" element={<AvisoForm />} />

        <Route path="/login" element={<LoginForm />} />

        <Route path="/admin" element={<RutaPrivada><AdministradorList /></RutaPrivada>}/>
        
        <Route
  path="/admin"
  element={
    <RutaPrivadaRol rolPermitido="Administrador">
      <AdministradorList />
    </RutaPrivadaRol>
  }
/>

<Route
  path="/agendamientos/nuevo"
  element={
    <RutaPrivadaRol rolPermitido="Residente">
      <AgendamientoForm />
    </RutaPrivadaRol>
  }
/>

<Route path="/inicio" element={<Dashboard />} />


      </Routes>
    </Router>
  );
}

export default App;


