
class MenuNode {
  constructor(name, file, link, component) {
    this.name = name;
    this.file = file;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return node;
  }
}

class MenuTree {
  constructor() {
    this.root = new MenuNode(
      'Menú principal',
      'MenuTree.js',
      '/',
      null
    );
  }

  addMenu(parent, name, file, link, component) {
    const node = new MenuNode(name, file, link, component);
    parent.addChild(node);
    return node;
  }
}

const menuTree = new MenuTree();

// Menús principales
const inicio = menuTree.addMenu(
  menuTree.root,
  'Inicio',
  'Home.jsx',
  '/',
  'Home'
);

const usuarios = menuTree.addMenu(
  menuTree.root,
  'Usuarios',
  'Users.jsx',
  '/usuarios',
  'Users'
);

const configuracion = menuTree.addMenu(
  menuTree.root,
  'Configuración',
  'Settings.jsx',
  '/configuracion',
  'Settings'
);

const reportes = menuTree.addMenu(
  menuTree.root,
  'Reportes',
  'Reports.jsx',
  '/reportes',
  'Reports'
);

// Submenús de Usuarios
menuTree.addMenu(
  usuarios,
  'Lista de usuarios',
  'UserList.jsx',
  '/usuarios/lista',
  'UserList'
);

menuTree.addMenu(
  usuarios,
  'Crear usuario',
  'CreateUser.jsx',
  '/usuarios/crear',
  'CreateUser'
);

menuTree.addMenu(
  usuarios,
  'Permisos',
  'Permissions.jsx',
  '/usuarios/permisos',
  'Permissions'
);

// Submenús de Configuración
menuTree.addMenu(
  configuracion,
  'Perfil',
  'Profile.jsx',
  '/configuracion/perfil',
  'Profile'
);

menuTree.addMenu(
  configuracion,
  'Seguridad',
  'Security.jsx',
  '/configuracion/seguridad',
  'Security'
);

// Submenús de Reportes
menuTree.addMenu(
  reportes,
  'Ventas',
  'SalesReport.jsx',
  '/reportes/ventas',
  'SalesReport'
);

menuTree.addMenu(
  reportes,
  'Actividad',
  'ActivityReport.jsx',
  '/reportes/actividad',
  'ActivityReport'
);

export { MenuNode, MenuTree };
export default menuTree;
