import React, { useState } from 'react';
import { Stack } from 'data-structures-lib';

// Instancia inicial de la Pila con datos iniciales
const initialStack = new Stack();
initialStack.push({
  name: 'Cien años de soledad',
  isbn: '978-0307474728',
  author: 'Gabriel García Márquez',
  editorial: 'Sudamericana',
});
initialStack.push({
  name: 'Don Quijote de la Mancha',
  isbn: '978-8424116033',
  author: 'Miguel de Cervantes',
  editorial: 'Espasa',
});
initialStack.push({
  name: '1984',
  isbn: '978-0451524935',
  author: 'George Orwell',
  editorial: 'Secker & Warburg',
});

export function BookStack() {
  const [bookStack] = useState(initialStack);
  const [booksList, setBooksList] = useState(bookStack.getItems());

  const [formData, setFormData] = useState({
    name: '',
    isbn: '',
    author: '',
    editorial: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.isbn || !formData.author || !formData.editorial) {
      alert('Por favor completa todos los campos.');
      return;
    }

    bookStack.push({ ...formData });
    setBooksList(bookStack.getItems());
    setFormData({ name: '', isbn: '', author: '', editorial: '' });
  };

  const handlePopBook = () => {
    const removedBook = bookStack.pop();
    if (removedBook) {
      alert(`Se ha procesado y retirado el libro: "${removedBook.name}"`);
      setBooksList(bookStack.getItems());
    } else {
      alert('No hay libros pendientes en la pila de recepción.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
        📥 Recepción y Procesamiento de Ejemplares
      </h2>
      <p style={{ color: '#aaa', fontSize: '14px' }}>
        Registro de ingreso de nuevos libros al lote de procesamiento (Estructura LIFO / Pila).
      </p>

      {/* Formulario */}
      <form onSubmit={handleAddBook} style={{ display: 'grid', gap: '12px', marginBottom: '25px', background: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Ingresar Nuevo Ejemplar</h3>
        <input
          type="text"
          name="name"
          placeholder="Título del libro"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        />
        <input
          type="text"
          name="isbn"
          placeholder="Código ISBN"
          value={formData.isbn}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={formData.author}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        />
        <input
          type="text"
          name="editorial"
          placeholder="Editorial"
          value={formData.editorial}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 18px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Registrar Ejemplar
          </button>
          <button type="button" onClick={handlePopBook} style={{ padding: '10px 18px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            ✓ Procesar Último Registro
          </button>
        </div>
      </form>

      {/* Lista de Libros */}
      <h3 style={{ fontSize: '16px' }}>Lote de Ejemplares Registrados ({booksList.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {booksList.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#888' }}>No hay ejemplares en la cola de recepción.</p>
        ) : (
          booksList.map((book, index) => (
            <div
              key={index}
              style={{
                border: index === 0 ? '2px solid #28a745' : '1px solid #333',
                padding: '14px',
                borderRadius: '6px',
                background: index === 0 ? '#122c19' : '#222',
                color: 'white',
              }}
            >
              {index === 0 && (
                <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', marginRight: '10px' }}>
                  PRÓXIMO A PROCESAR
                </span>
              )}
              <strong>{book.name}</strong> — <span style={{ color: '#bbb' }}>{book.author}</span>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                ISBN: {book.isbn} | Editorial: {book.editorial}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}