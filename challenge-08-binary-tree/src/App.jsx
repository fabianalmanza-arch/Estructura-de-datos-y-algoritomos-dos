
import { useEffect, useMemo, useState } from 'react';
import BinarySearchTree from './structures/BinarySearchTree';
import TreeVisualization from './components/TreeVisualization';
import './App.css';

const numerosIniciales = [8, 3, 10, 1, 6, 14, 4];

function App() {
  const arbol = useMemo(() => {
    const nuevoArbol = new BinarySearchTree();

    numerosIniciales.forEach((numero) => {
      nuevoArbol.insert(numero);
    });

    return nuevoArbol;
  }, []);

  const [numeroBusqueda, setNumeroBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const datosArbol = arbol.toD3Tree();

  // Imprimir los recorridos solicitados en la consola
  useEffect(() => {
    console.log('In-order:', arbol.inOrder().join(', '));
    console.log('Pre-order:', arbol.preOrder().join(', '));
    console.log('Post-order:', arbol.postOrder().join(', '));
  }, [arbol]);

  function buscarNumero(evento) {
    evento.preventDefault();

    if (numeroBusqueda.trim() === '') {
      setMensaje('Ingresa un número para buscar.');
      return;
    }

    const valor = Number(numeroBusqueda);

    if (!Number.isFinite(valor)) {
      setMensaje('Ingresa un número válido.');
      return;
    }

    if (arbol.search(valor)) {
      setMensaje(`El número ${valor} sí se encuentra en el árbol.`);
    } else {
      setMensaje(`El número ${valor} no se encuentra en el árbol.`);
    }
  }

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Árbol binario de búsqueda</h1>
        <p>Challenge 08 — Estructuras de datos</p>
      </header>

      <section className="panel">
        <h2>Recorridos del árbol</h2>

        <div className="recorridos">
          <p>
            <strong>In-order:</strong>{' '}
            {arbol.inOrder().join(' → ')}
          </p>

          <p>
            <strong>Pre-order:</strong>{' '}
            {arbol.preOrder().join(' → ')}
          </p>

          <p>
            <strong>Post-order:</strong>{' '}
            {arbol.postOrder().join(' → ')}
          </p>
        </div>

        <p className="ayuda">
          Los mismos recorridos también se imprimen en la consola
          del navegador.
        </p>
      </section>

      <section className="panel">
        <h2>Buscar un número</h2>

        <form className="formulario-busqueda" onSubmit={buscarNumero}>
          <label htmlFor="numeroBusqueda">
            Número que deseas buscar
          </label>

          <input
            id="numeroBusqueda"
            type="number"
            step="any"
            value={numeroBusqueda}
            onChange={(evento) => {
              setNumeroBusqueda(evento.target.value);
              setMensaje('');
            }}
            placeholder="Ej. 6"
          />

          <button type="submit">Buscar en el árbol</button>
        </form>

        {mensaje && (
          <p className="mensaje" role="status">
            {mensaje}
          </p>
        )}
      </section>

      <section className="panel">
        <h2>Representación visual</h2>
        <p className="ayuda">
          Puedes arrastrar el árbol y utilizar el zoom para explorarlo.
        </p>

        <TreeVisualization data={datosArbol} />
      </section>
    </main>
  );
}

export default App;
