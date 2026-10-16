import React, { useState } from 'react';
import { Queue } from 'data-structures-lib';

// Instancia inicial con datos de prueba (Mock Data)
const initialQueue = new Queue();

const now = new Date();
initialQueue.enqueue({
  name: 'Carlos Mendoza',
  serviceType: 'Préstamo de Libro',
  arrivalDate: new Date(now.getTime() - 15 * 60000).toISOString(),
});
initialQueue.enqueue({
  name: 'Ana María Gómez',
  serviceType: 'Devolución de Ejemplar',
  arrivalDate: new Date(now.getTime() - 10 * 60000).toISOString(),
});
initialQueue.enqueue({
  name: 'Roberto Silva',
  serviceType: 'Renovación de Membresía',
  arrivalDate: new Date(now.getTime() - 5 * 60000).toISOString(),
});

export function AtmQueue() {
  const [queue] = useState(initialQueue);
  const [peopleList, setPeopleList] = useState(queue.getItems());

  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Préstamo de Libro',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Por favor ingrese el nombre del usuario.');
      return;
    }

    const newPerson = {
      name: formData.name,
      serviceType: formData.serviceType,
      arrivalDate: new Date().toISOString(),
    };

    queue.enqueue(newPerson);
    setPeopleList(queue.getItems());
    setFormData({ name: '', serviceType: 'Préstamo de Libro' });
  };

  const handleServePerson = () => {
    const served = queue.dequeue();
    if (served) {
      alert(`Atendiendo a: ${served.name} — Trámite: ${served.serviceType}`);
      setPeopleList(queue.getItems());
    } else {
      alert('No hay usuarios esperando en la cola de ventanilla.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
        🎫 Atención en Ventanilla (Gestión de Turnos)
      </h2>
      <p style={{ color: '#aaa', fontSize: '14px' }}>
        Control de usuarios en espera para trámites en la biblioteca (Estructura FIFO / Cola por fecha de llegada).
      </p>

      {/* Formulario de registro */}
      <form onSubmit={handleAddPerson} style={{ display: 'grid', gap: '12px', marginBottom: '25px', background: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Generar Turno de Atención</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre del usuario / estudiante"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        />
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        >
          <option value="Préstamo de Libro">Préstamo de Libro</option>
          <option value="Devolución de Ejemplar">Devolución de Ejemplar</option>
          <option value="Renovación de Membresía">Renovación de Membresía</option>
          <option value="Consulta Bibliográfica">Consulta Bibliográfica</option>
        </select>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 18px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Solicitar Turno
          </button>
          <button type="button" onClick={handleServePerson} style={{ padding: '10px 18px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            ▶ Atender Siguiente Usuario
          </button>
        </div>
      </form>

      {/* Lista en Pantalla */}
      <h3 style={{ fontSize: '16px' }}>Usuarios en Espera ({peopleList.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {peopleList.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#888' }}>No hay turnos pendientes en ventanilla.</p>
        ) : (
          peopleList.map((person, index) => (
            <div
              key={index}
              style={{
                border: index === 0 ? '2px solid #17a2b8' : '1px solid #333',
                padding: '14px',
                borderRadius: '6px',
                background: index === 0 ? '#112d32' : '#222',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                {index === 0 && (
                  <span style={{ background: '#17a2b8', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginRight: '10px' }}>
                    EN VENTANILLA
                  </span>
                )}
                <strong>{person.name}</strong>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                  Llegada: {new Date(person.arrivalDate).toLocaleTimeString()} ({new Date(person.arrivalDate).toLocaleDateString()})
                </div>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '14px', color: '#28a745' }}>
                {person.serviceType}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}