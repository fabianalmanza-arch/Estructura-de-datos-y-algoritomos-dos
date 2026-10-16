
import { useState } from 'react';
import { SinglyLinkedList } from '../structures/SinglyLinkedList';

const cancionesIniciales = [
  { title: 'Vivir mi vida', artist: 'Marc Anthony' },
  { title: 'La camisa negra', artist: 'Juanes' },
  { title: 'Bailando', artist: 'Enrique Iglesias' },
  { title: 'Despacito', artist: 'Luis Fonsi' },
  { title: 'Robarte un beso', artist: 'Carlos Vives' },
];

function crearListaCanciones() {
  const lista = new SinglyLinkedList();

  cancionesIniciales.forEach((cancion) => {
    lista.append(cancion);
  });

  return lista;
}

export default function SongsPage() {
  const [lista] = useState(crearListaCanciones);
  const [indice, setIndice] = useState(0);

  const canciones = lista.toArray();
  const cancionActual = lista.getAt(indice);

  function anterior() {
    setIndice((actual) => Math.max(0, actual - 1));
  }

  function siguiente() {
    setIndice((actual) =>
      Math.min(lista.length - 1, actual + 1)
    );
  }

  return (
    <section className="panel">
      <h1>Lista enlazada de canciones</h1>
      <p>
        Canción {indice + 1} de {lista.length}
      </p>

      {cancionActual && (
        <div className="cancion">
          <h2>{cancionActual.title}</h2>
          <p>Artista: {cancionActual.artist}</p>
        </div>
      )}

      <div className="botones">
        <button onClick={anterior} disabled={indice === 0}>
          Anterior
        </button>

        <button
          onClick={siguiente}
          disabled={indice === lista.length - 1}
        >
          Siguiente
        </button>
      </div>

      <h3>Canciones disponibles</h3>
      <ol>
        {canciones.map((cancion, posicion) => (
          <li key={cancion.title}>
            {cancion.title} — {cancion.artist}
            {posicion === indice ? ' ▶' : ''}
          </li>
        ))}
      </ol>
    </section>
  );
}
