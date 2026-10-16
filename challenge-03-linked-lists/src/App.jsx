
import { useState } from 'react';
import SongsPage from './pages/SongsPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  const [paginaActual, setPaginaActual] = useState('canciones');

  return (
    <main className="aplicacion">
      <nav className="navegacion">
        <button
          type="button"
          onClick={() => setPaginaActual('canciones')}
          disabled={paginaActual === 'canciones'}
        >
          Lista de canciones
        </button>

        <button
          type="button"
          onClick={() => setPaginaActual('historial')}
          disabled={paginaActual === 'historial'}
        >
          Historial web
        </button>
      </nav>

      {paginaActual === 'canciones' ? (
        <SongsPage />
      ) : (
        <HistoryPage />
      )}
    </main>
  );
}

export default App;
