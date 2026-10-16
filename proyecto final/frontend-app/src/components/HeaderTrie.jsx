import React, { useState, useEffect } from 'react';
import { Trie } from 'data-structures-lib';

// Instancia del Trie
const systemTrie = new Trie();

// Diccionario de términos clave mapeados a sus vistas en la app
const searchMap = {
  catalogo: 'BST_INDEX',
  arboles: 'BST_INDEX',
  bst: 'BST_INDEX',
  libros: 'BOOK_STACK',
  pila: 'BOOK_STACK',
  stack: 'BOOK_STACK',
  inventario: 'BOOK_STACK',
  turnos: 'ATM_QUEUE',
  ventanilla: 'ATM_QUEUE',
  cajero: 'ATM_QUEUE',
  cola: 'ATM_QUEUE',
  atencion: 'ATM_QUEUE',
  musica: 'MEDIA_PLAYER',
  reproductor: 'MEDIA_PLAYER',
  navegador: 'MEDIA_PLAYER',
  historial: 'MEDIA_PLAYER',
  listas: 'MEDIA_PLAYER',
};

// Insertar las palabras clave en el Trie
Object.keys(searchMap).forEach((word) => systemTrie.insert(word));

export function HeaderTrie({ onSelectSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length > 0) {
      const results = systemTrie.searchWithPrefix(query.trim());
      setSuggestions(results);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSelect = (word) => {
    setQuery(word);
    setShowDropdown(false);
    
    // Obtener la vista asociada a la palabra y cambiar de pantalla
    const targetComponent = searchMap[word.toLowerCase()];
    if (targetComponent && onSelectSearch) {
      onSelectSearch(targetComponent);
    }
  };

  return (
    <header
      style={{
        background: '#1a1a1a',
        borderBottom: '1px solid #333',
        padding: '12px 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>⚡</span>
        <h1 style={{ margin: 0, fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>
          Sistema de Estructuras de Datos
        </h1>
      </div>

      {/* BARRA DE BÚSQUEDA PREDICTIVA (TRIE) */}
      <div style={{ position: 'relative', width: '320px' }}>
        <input
          type="text"
          placeholder="🔍 Buscar término o módulo (Trie)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          style={{
            width: '100%',
            padding: '8px 14px',
            borderRadius: '20px',
            border: '1px solid #444',
            background: '#2a2a2a',
            color: '#fff',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {/* DROPDOWN DE SUGERENCIAS */}
        {showDropdown && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#252525',
              border: '1px solid #444',
              borderRadius: '8px',
              marginTop: '5px',
              listStyle: 'none',
              padding: '6px 0',
              margin: '5px 0 0 0',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '13px',
                    color: '#ddd',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#007bff')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <strong>{item.substring(0, query.length)}</strong>
                  {item.substring(query.length)}
                </li>
              ))
            ) : (
              <li style={{ padding: '8px 14px', fontSize: '12px', color: '#888' }}>
                Sin coincidencias en el Trie
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}