
const contenidoPaginas = {
  Home: {
    titulo: 'Inicio',
    descripcion: 'Bienvenido al panel de administración.',
  },
  Users: {
    titulo: 'Usuarios',
    descripcion: 'Administración de los usuarios del sistema.',
  },
  UserList: {
    titulo: 'Lista de usuarios',
    descripcion: 'Aquí se mostrarán los usuarios registrados.',
  },
  CreateUser: {
    titulo: 'Crear usuario',
    descripcion: 'Aquí podrás registrar nuevos usuarios.',
  },
  Permissions: {
    titulo: 'Permisos',
    descripcion: 'Administración de permisos de acceso.',
  },
  Settings: {
    titulo: 'Configuración',
    descripcion: 'Configura las opciones de la aplicación.',
  },
  Profile: {
    titulo: 'Perfil',
    descripcion: 'Consulta y administra tu perfil.',
  },
  Security: {
    titulo: 'Seguridad',
    descripcion: 'Opciones de seguridad de la cuenta.',
  },
  Reports: {
    titulo: 'Reportes',
    descripcion: 'Consulta los reportes del sistema.',
  },
  SalesReport: {
    titulo: 'Reporte de ventas',
    descripcion: 'Aquí se mostrarán los reportes de ventas.',
  },
  ActivityReport: {
    titulo: 'Reporte de actividad',
    descripcion: 'Aquí se mostrará la actividad del sistema.',
  },
};

export default function PageView({ item }) {
  const contenido = contenidoPaginas[item.component] ?? {
    titulo: item.name,
    descripcion: 'Contenido de la sección seleccionada.',
  };

  return (
    <section className="contenido-pagina">
      <p className="ruta-pagina">{item.link}</p>
      <h1>{contenido.titulo}</h1>
      <p>{contenido.descripcion}</p>

      <div className="tarjeta-informacion">
        <h2>Información de la sección</h2>
        <p><strong>Archivo:</strong> {item.file}</p>
        <p><strong>Componente:</strong> {item.component}</p>
        <p><strong>Enlace:</strong> {item.link}</p>
      </div>
    </section>
  );
}
