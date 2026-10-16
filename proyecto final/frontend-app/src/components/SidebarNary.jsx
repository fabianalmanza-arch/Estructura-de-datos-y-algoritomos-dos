import React, { useState } from 'react';
import { NaryTree, NaryTreeNode } from 'data-structures-lib';

// 1. Instancia y construcción del Árbol N-ario para el Menú
const menuTree = new NaryTree('Sistema Principal');

// Nivel 1: Secciones principales
const inventoryNode = new NaryTreeNode('Inventario y Recepción', '/inventory', 'BOOK_STACK');
const queueNode = new NaryTreeNode('Atención al Cliente', '/queue', 'ATM_QUEUE');
const catalogNode = new NaryTreeNode('Catálogo e Índices', '/catalog', 'BST_INDEX');
const mediaNode = new NaryTreeNode('Multimedia y Navegación', '/media', 'MEDIA_PLAYER');

// Submenús (Nivel 2) dentro de Inventario
const booksSub = new NaryTreeNode('Pila de Libros (Stack)', '/inventory/books', 'BOOK_STACK');
inventoryNode.addChild(booksSub);

// Submenús (Nivel 2) dentro de Atención al Cliente
const atmSub = new NaryTreeNode('Turnos de Cajero (Queue)', '/queue/atm', 'ATM_QUEUE');
queueNode.addChild(atmSub);

// Submenús (Nivel 2) dentro de Catálogo
const bstSub = new NaryTreeNode('Índice Binario (BST)', '/catalog/bst', 'BST_INDEX');
const searchSub = new NaryTreeNode('Búsqueda Rápida (Trie)', '/catalog/search', 'TRIE_SEARCH');
catalogNode.addChild(bstSub);
catalogNode.addChild(searchSub);

// Submenús (Nivel 2) dentro de Multimedia
const playlistSub = new NaryTreeNode('Reproductor de Música', '/media/songs', 'MUSIC_PLAYER');
const historySub = new NaryTreeNode('Historial Web', '/media/browser', 'BROWSER_HISTORY');
mediaNode.addChild(playlistSub);
mediaNode.addChild(historySub);

// Agregar los nodos principales a la raíz del árbol N-ario
menuTree.root.addChild(inventoryNode);
menuTree.root.addChild(queueNode);
menuTree.root.addChild(catalogNode);
menuTree.root.addChild(mediaNode);

export function SidebarNary({ onSelectComponent }) {
  // Estado para controlar qué menús desplegables están abiertos
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Función recursiva para renderizar el árbol N-ario
  const renderTreeNodes = (nodes) => {
    return (
      <ul style={{ listStyle: 'none', paddingLeft: '15px', margin: '5px 0' }}>
        {nodes.map((node, index) => {
          const hasChildren = node.children && node.children.length > 0;
          const isOpen = openSubmenus[node.title];

          return (
            <li key={index} style={{ marginBottom: '8px' }}>
              <div
                onClick={() => {
                  if (hasChildren) {
                    toggleSubmenu(node.title);
                  }
                  if (node.component && onSelectComponent) {
                    onSelectComponent(node.component);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: '#2a2a2a',
                  color: '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#007bff')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2a2a2a')}
              >
                <span>{node.title}</span>
                {hasChildren && <span>{isOpen ? '▼' : '▶'}</span>}
              </div>

              {/* Renderizado de hijos si existen y la sección está desplegada */}
              {hasChildren && isOpen && renderTreeNodes(node.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      style={{
        width: '260px',
        minHeight: '100vh',
        background: '#181818',
        padding: '20px 15px',
        boxSizing: 'border-box',
        borderRight: '1px solid #333',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3 style={{ color: '#007bff', fontSize: '18px', margin: '0 0 15px 0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        📁 Navegación
      </h3>
      {renderTreeNodes(menuTree.root.children)}
    </aside>
  );
}