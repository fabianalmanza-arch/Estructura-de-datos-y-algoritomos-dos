
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PageView from './components/PageView';
import menuTree from './structures/MenuTree';
import './App.css';

function buscarPagina(nodo, link) {
  if (nodo.link === link) {
    return nodo;
  }

  for (const hijo of nodo.children) {
    const resultado = buscarPagina(hijo, link);

    if (resultado) {
      return resultado;
    }
  }

  return null;
}

function App() {
  const [activeLink, setActiveLink] = useState('/');
  const paginaActual = buscarPagina(menuTree.root, activeLink);

  function navegar(item) {
    setActiveLink(item.link);
  }

  return (
    <div className="aplicacion">
      <Sidebar
        activeLink={activeLink}
        onNavigate={navegar}
      />

      <main className="area-principal">
        <header className="barra-superior">
          <span>Panel de administración</span>
          <span className="estado">● Sistema activo</span>
        </header>

        {paginaActual && (
          <PageView item={paginaActual} />
        )}
      </main>
    </div>
  );
}

export default App;
