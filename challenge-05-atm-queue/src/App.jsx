
import { useState } from 'react';
import Queue from './structures/Queue';
import './App.css';

function fechaHaceMinutos(minutos) {
  return new Date(Date.now() - minutos * 60000).toISOString();
}

const personasIniciales = [
  {
    id: 1,
    nombre: 'Ana Martínez',
    monto: 200000,
    fechaLlegada: fechaHaceMinutos(30),
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    monto: 350000,
    fechaLlegada: fechaHaceMinutos(20),
  },
  {
    id: 3,
    nombre: 'María López',
    monto: 150000,
    fechaLlegada: fechaHaceMinutos(10),
  },
];

function App() {
  const [personas, setPersonas] = useState(personasIniciales);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Crear una cola con las personas actuales
  function crearCola(datos = personas) {
    const cola = new Queue();

    datos.forEach((persona) => cola.enqueue(persona));

    return cola;
  }

  // Ordenar por fecha de llegada, de la más antigua a la más reciente
  const personasOrdenadas = [...personas].sort(
    (a, b) =>
      new Date(a.fechaLlegada).getTime() -
      new Date(b.fechaLlegada).getTime()
  );

  function agregarPersona(evento) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();
    const montoNumerico = Number(monto);

    if (!nombreLimpio || !Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      setMensaje('Ingresa un nombre y un monto válido mayor que cero.');
      return;
    }

    const nuevaPersona = {
      id: Date.now(),
      nombre: nombreLimpio,
      monto: montoNumerico,
      fechaLlegada: new Date().toISOString(),
    };

    const cola = crearCola();
    cola.enqueue(nuevaPersona);

    setPersonas(cola.toArray());
    setNombre('');
    setMonto('');
    setMensaje('¡Persona agregada a la cola correctamente!');
  }

  function atenderPersona() {
    const cola = crearCola(personasOrdenadas);
    const atendida = cola.dequeue();

    if (!atendida) {
      setMensaje('La cola está vacía. No hay personas para atender.');
      return;
    }

    setPersonas(cola.toArray());
    setMensaje(`Turno atendido: ${atendida.nombre}.`);
  }

  const siguientePersona = personasOrdenadas[0];

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Cola de personas - Cajero ATM</h1>
        <p>Administración de turnos de atención</p>
      </header>

      <section className="resumen">
        <h2>Personas en espera: {personasOrdenadas.length}</h2>

        {siguientePersona ? (
          <p>
            <strong>Siguiente turno:</strong> {siguientePersona.nombre}
          </p>
        ) : (
          <p>No hay personas esperando.</p>
        )}

        <button
          type="button"
          onClick={atenderPersona}
          disabled={personasOrdenadas.length === 0}
        >
          Atender siguiente persona
        </button>
      </section>

      <section className="formulario-seccion">
        <h2>Registrar una persona</h2>

        <form onSubmit={agregarPersona}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Ej. Pedro Gómez"
            required
          />

          <label htmlFor="monto">Monto que desea retirar (COP)</label>
          <input
            id="monto"
            type="number"
            min="1"
            step="1"
            value={monto}
            onChange={(evento) => setMonto(evento.target.value)}
            placeholder="Ej. 250000"
            required
          />

          <button type="submit">Agregar a la cola</button>
        </form>

        {mensaje && (
          <p className="mensaje" role="status">
            {mensaje}
          </p>
        )}
      </section>

      <section className="cola-seccion">
        <h2>Cola de atención</h2>

        {personasOrdenadas.length === 0 ? (
          <p>La cola está vacía.</p>
        ) : (
          <ol className="lista-personas">
            {personasOrdenadas.map((persona, indice) => (
              <li key={persona.id} className="persona">
                <div className="persona-titulo">
                  <h3>{persona.nombre}</h3>

                  {indice === 0 && (
                    <span className="etiqueta">Siguiente turno</span>
                  )}
                </div>

                <p>
                  <strong>Monto:</strong>{' '}
                  {persona.monto.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0,
                  })}
                </p>

                <p>
                  <strong>Fecha de llegada:</strong>{' '}
                  {new Date(persona.fechaLlegada).toLocaleString('es-CO')}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

export default App;
