export const obtenerUsuarioAutenticado = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
};

export const cerrarSesion = () => {
  localStorage.removeItem("usuario");
};
