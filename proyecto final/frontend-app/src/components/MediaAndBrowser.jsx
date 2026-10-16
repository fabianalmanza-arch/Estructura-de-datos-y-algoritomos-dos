import React, { useState } from 'react';
import { LinkedList, DoublyLinkedList } from 'data-structures-lib';

// 1. Inicialización del Reproductor (Singly LinkedList)
const initialPlaylist = new LinkedList();
initialPlaylist.append({ title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' });
initialPlaylist.append({ title: 'Hotel California', artist: 'Eagles', duration: '6:30' });
initialPlaylist.append({ title: 'Imagine', artist: 'John Lennon', duration: '3:04' });
initialPlaylist.append({ title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' });

// 2. Inicialización del Navegador Web (Doubly LinkedList)
const initialBrowser = new DoublyLinkedList();
initialBrowser.visit({ title: 'Google - Buscador', url: 'https://www.google.com' });
initialBrowser.visit({ title: 'GitHub - Mi Repositorio', url: 'https://github.com' });
initialBrowser.visit({ title: 'React Documentation', url: 'https://react.dev' });

export function MediaAndBrowser() {
  // Estados para el Reproductor (Singly)
  const [playlist] = useState(initialPlaylist);
  const [songsList] = useState(playlist.toArray());
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Estados para el Navegador (Doubly)
  const [browser] = useState(initialBrowser);
  const [currentPage, setCurrentPage] = useState(browser.current ? browser.current.data : null);
  const [newUrl, setNewUrl] = useState('');

  // Lógica del Reproductor
  const handleNextSong = () => {
    if (currentSongIndex < songsList.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); // Reiniciar al inicio
    }
  };

  // Lógica del Navegador Web
  const handleVisitUrl = (e) => {
    e.preventDefault();
    if (!newUrl) return;

    const pageData = {
      title: newUrl.replace('https://', '').replace('http://', ''),
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
    };

    browser.visit(pageData);
    setCurrentPage(browser.current.data);
    setNewUrl('');
  };

  const handleGoBack = () => {
    const prevPage = browser.goBack();
    if (prevPage) {
      setCurrentPage(prevPage);
    } else {
      alert('No hay páginas anteriores en el historial.');
    }
  };

  const handleGoForward = () => {
    const nextPage = browser.goForward();
    if (nextPage) {
      setCurrentPage(nextPage);
    } else {
      alert('No hay páginas siguientes en el historial.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #e83e8c', paddingBottom: '10px' }}>
        🎵 Multimedia y Navegación (Listas Enlazadas)
      </h2>

      {/* SECCIÓN 1: REPRODUCTOR DE MÚSICA (Singly LinkedList) */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#e83e8c' }}>
          🎧 Reproductor de Canciones (Singly LinkedList)
        </h3>
        <p style={{ color: '#aaa', fontSize: '13px' }}>
          Reproducción secuencial ordenada mediante apuntadores de nodo simple (`next`).
        </p>

        {/* Canción en reproducción */}
        <div style={{ background: '#2d2d2d', padding: '15px', borderRadius: '6px', marginBottom: '15px', borderLeft: '4px solid #e83e8c' }}>
          <span style={{ fontSize: '11px', background: '#e83e8c', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
            REPRODUCIENDO AHORA
          </span>
          <h4 style={{ margin: '8px 0 4px 0', fontSize: '18px' }}>{songsList[currentSongIndex]?.title}</h4>
          <p style={{ margin: 0, color: '#bbb', fontSize: '14px' }}>
            {songsList[currentSongIndex]?.artist} — <small>{songsList[currentSongIndex]?.duration}</small>
          </p>
        </div>

        <button
          onClick={handleNextSong}
          style={{ padding: '10px 20px', background: '#e83e8c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ▶ Siguiente Canción
        </button>

        {/* Lista completa de canciones */}
        <h4 style={{ marginTop: '20px', fontSize: '14px' }}>Lista de Reproducción:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {songsList.map((song, index) => (
            <li
              key={index}
              style={{
                padding: '8px 12px',
                marginBottom: '4px',
                background: index === currentSongIndex ? '#3a1e2f' : '#252525',
                borderRadius: '4px',
                fontSize: '13px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{index + 1}. <strong>{song.title}</strong> - {song.artist}</span>
              <span style={{ color: '#888' }}>{song.duration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* SECCIÓN 2: NAVEGADOR WEB (Doubly LinkedList) */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#17a2b8' }}>
          🌐 Navegador Web (Doubly LinkedList)
        </h3>
        <p style={{ color: '#aaa', fontSize: '13px' }}>
          Navegación bidireccional entre páginas visitadas mediante apuntadores (`prev` y `next`).
        </p>

        {/* Barra de Navegación con Botones Atrás/Adelante */}
        <form onSubmit={handleVisitUrl} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          <button
            type="button"
            onClick={handleGoBack}
            style={{ padding: '8px 15px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ◀ Atrás
          </button>
          <button
            type="button"
            onClick={handleGoForward}
            style={{ padding: '8px 15px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Adelante ▶
          </button>
          <input
            type="text"
            placeholder="Escribe una URL (ej. wikipedia.org)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
          />
          <button
            type="submit"
            style={{ padding: '8px 15px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Ir
          </button>
        </form>

        {/* Renderizado de la Página Actual */}
        <div style={{ background: '#252525', padding: '20px', borderRadius: '6px', textAlign: 'center', border: '1px dashed #444' }}>
          <span style={{ fontSize: '12px', color: '#17a2b8' }}>PÁGINA ACTUAL</span>
          <h3 style={{ margin: '8px 0', fontSize: '20px' }}>{currentPage ? currentPage.title : 'Sin vista'}</h3>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{currentPage ? currentPage.url : ''}</p>
        </div>
      </div>
    </div>
  );
}