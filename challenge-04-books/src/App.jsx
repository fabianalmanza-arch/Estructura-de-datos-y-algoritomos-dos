
import { useState } from 'react';
import './App.css';

const librosIniciales = [
  {
    nombre: 'Cien años de soledad',
    isbn: '9780307474728',
    autor: 'Gabriel García Márquez',
    editorial: 'Editorial Sudamericana',
  },
  {
    nombre: 'El principito',
    isbn: '9780156012195',
    autor: 'Antoine de Saint-Exupéry',
    editorial: 'Reynal & Hitchcock',
  },
  {
    nombre: 'Don Quijote de la Mancha',
    isbn: '9788420412146',
    autor: 'Miguel de Cervantes',
    editorial: 'Alfaguara',
  },
];

const formularioInicial = {
  nombre: '',
  isbn: '',
  autor: '',
  editorial: '',
};

function App() {
  const [pilaLibros, setPilaLibros] = useState(librosIniciales);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [mensaje, setMensaje] = useState('');

  // Actualizar los campos del formulario
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });

    setMensaje('');
  }

  // Agregar un nuevo libro (PUSH)
  function agregarLibro(evento) {
    evento.preventDefault();

    const nuevoLibro = {
      nombre: formulario.nombre.trim(),
      isbn: formulario.isbn.trim(),
      autor: formulario.autor.trim(),
      editorial: formulario.editorial.trim(),
    };

    // Validar que no haya campos vacíos
    if (
      !nuevoLibro.nombre ||
      !nuevoLibro.isbn ||
      !nuevoLibro.autor ||
      !nuevoLibro.editorial
    ) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    // Evitar ISBN duplicados
    const libroExiste = pilaLibros.some(
      (libro) => libro.isbn === nuevoLibro.isbn
    );

    if (libroExiste) {
      setMensaje('Ya existe un libro registrado con ese ISBN.');
      return;
    }

    // Agregar el libro al final de la pila
    setPilaLibros((pilaActual) => [
      ...pilaActual,
      nuevoLibro,
    ]);

    // Limpiar el formulario
    setFormulario({ ...formularioInicial });

    setMensaje('¡Libro agregado correctamente!');
  }

  // Retirar el último libro agregado (POP)
  function retirarLibro() {
    if (pilaLibros.length === 0) {
      setMensaje('La pila está vacía. No hay libros para retirar.');
      return;
    }

    const libroRetirado = pilaLibros[pilaLibros.length - 1];

    setPilaLibros((pilaActual) => pilaActual.slice(0, -1));

    setMensaje(`Se retiró el libro: ${libroRetirado.nombre}`);
  }

  return (
    <main className="contenedor">
      <h1>Gestión de una pila de libros</h1>

      <p className="contador">
        Total de libros: {pilaLibros.length}
      </p>

      <section className="formulario-seccion">
        <h2>Registrar un nuevo libro</h2>

        <form onSubmit={agregarLibro}>
          <label htmlFor="nombre">Nombre del libro</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Ej. La vorágine"
            required
          />

          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formulario.isbn}
            onChange={manejarCambio}
            placeholder="Ingrese el ISBN"
            required
          />

          <label htmlFor="autor">Autor</label>
          <input
            id="autor"
            name="autor"
            type="text"
            value={formulario.autor}
            onChange={manejarCambio}
            placeholder="Nombre del autor"
            required
          />

          <label htmlFor="editorial">Editorial</label>
          <input
            id="editorial"
            name="editorial"
            type="text"
            value={formulario.editorial}
            onChange={manejarCambio}
            placeholder="Nombre de la editorial"
            required
          />

          <button type="submit">
            Agregar libro
          </button>
        </form>

        {mensaje && (
          <p role="status" className="mensaje">
            {mensaje}
          </p>
        )}
      </section>

      <section className="libros-seccion">
        <h2>Libros en la pila</h2>

        <button
          type="button"
          onClick={retirarLibro}
          disabled={pilaLibros.length === 0}
        >
          Retirar libro del tope
        </button>

        {pilaLibros.length === 0 ? (
          <p>No hay libros registrados.</p>
        ) : (
          [...pilaLibros].reverse().map((libro, indice) => (
            <article className="libro" key={libro.isbn}>
              <h3>{libro.nombre}</h3>

              <p>
                <strong>ISBN:</strong> {libro.isbn}
              </p>

              <p>
                <strong>Autor:</strong> {libro.autor}
              </p>

              <p>
                <strong>Editorial:</strong> {libro.editorial}
              </p>

              {indice === 0 && (
                <span className="etiqueta">
                  Tope de la pila
                </span>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
