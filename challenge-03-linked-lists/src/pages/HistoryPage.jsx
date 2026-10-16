
import { useState } from 'react';
import { DoublyLinkedList } from '../structures/DoublyLinkedList';

const paginasIniciales = [
  { title: 'Google', url: 'https://www.google.com' },
  { title: 'Wikipedia', url: 'https://www.wikipedia.org' },
  { title: 'YouTube', url: 'https://www.youtube.com' },
  { title: 'GitHub', url: 'https://github.com' },
  { title: 'React', url: 'https://react.dev' },
];

function crearHistorial() {
  const lista = new DoublyLinkedList();

  paginasIniciales.forEach((pagina) => {
    lista.append(pagina);
  });

  return lista;
}

export default function HistoryPage() {
  const [historial] = useState(crearHistorial);
  const [indice, setIndice] = useState(0);

  const paginas = historial.toArray();
  const paginaActual = historial.getAt(indice);

  function irAtras() {
    setIndice((actual) => Math.max(0, actual - 1));
  }

  function irAdelante() {
    setIndice((actual) =>
      Math.min(historial.length - 1, actual + 1)
    );
  }

  return (
    <section className="panel">
      <h1>Historial de navegación</h1>

      <p>
        Página {indice + 1} de {historial.length}
      </p>

      {paginaActual && (
        <div className="pagina-actual">
          <h2>{paginaActual.title}</h2>
          <p>{paginaActual.url}</p>
        </div>
      )}

      <div className="botones">
        <button onClick={irAtras} disabled={indice === 0}>
          ← Atrás
        </button>

        <button
          onClick={irAdelante}
          disabled={indice === historial.length - 1}
        >
          Adelante →
        </button>
      </div>

      <h3>Páginas visitadas</h3>

      <ol>
        {paginas.map((pagina, posicion) => (
          <li key={pagina.url}>
            <button
              type="button"
              className="boton-pagina"
              onClick={() => setIndice(posicion)}
              disabled={posicion === indice}
            >
              {pagina.title} — {pagina.url}
              {posicion === indice ? ' (actual)' : ''}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
