import React, { useState } from 'react';
import { Graph } from 'data-structures-lib';

// Instancia inicial del Grafo representando la Red de Bibliotecas y Conexiones de Rutas
const initialGraph = new Graph();

// 1. Agregar Nodos (Sedes de Bibliotecas)
const initialNodes = ['Sede Central', 'Sede Norte', 'Sede Sur', 'Sede Occidente', 'Biblioteca Biomédica'];
initialNodes.forEach((node) => initialGraph.addVertex(node));

// 2. Agregar Aristas (Rutas / Enlaces Interbibliotecarios)
initialGraph.addEdge('Sede Central', 'Sede Norte');
initialGraph.addEdge('Sede Central', 'Sede Sur');
initialGraph.addEdge('Sede Central', 'Sede Occidente');
initialGraph.addEdge('Sede Norte', 'Biblioteca Biomédica');
initialGraph.addEdge('Sede Sur', 'Biblioteca Biomédica');

export function LibraryNetwork() {
  const [graph] = useState(initialGraph);
  const [adjacencyList, setAdjacencyList] = useState({ ...graph.adjacencyList });

  // Estados para agregar nuevas sedes o conexiones
  const [newVertex, setNewVertex] = useState('');
  const [fromVertex, setFromVertex] = useState('Sede Central');
  const [toVertex, setToVertex] = useState('Sede Norte');

  // Estados para recorridos de Grafo (BFS y DFS)
  const [startNode, setStartNode] = useState('Sede Central');
  const [traversalResult, setTraversalResult] = useState('');

  const handleAddVertex = (e) => {
    e.preventDefault();
    if (!newVertex.trim()) return;

    graph.addVertex(newVertex.trim());
    setAdjacencyList({ ...graph.adjacencyList });
    setNewVertex('');
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    if (!fromVertex || !toVertex || fromVertex === toVertex) {
      alert('Selecciona dos sedes distintas para conectar.');
      return;
    }

    graph.addEdge(fromVertex, toVertex);
    setAdjacencyList({ ...graph.adjacencyList });
  };

  const handleBFS = () => {
    const path = graph.bfs(startNode);
    setTraversalResult(`Recorrido en Anchura (BFS) desde "${startNode}": ${path.join(' ➔ ')}`);
  };

  const handleDFS = () => {
    const path = graph.dfs(startNode);
    setTraversalResult(`Recorrido en Profundidad (DFS) desde "${startNode}": ${path.join(' ➔ ')}`);
  };

  const vertices = Object.keys(adjacencyList);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #ffc107', paddingBottom: '10px' }}>
        🕸️ Red Interbibliotecaria y Rutas de Préstamo (Grafo)
      </h2>
      <p style={{ color: '#aaa', fontSize: '14px' }}>
        Modelo de Grafo no dirigido mediante lista de adyacencia para interconectar sedes y calcular rutas de transferencia de libros.
      </p>

      {/* Formularios para modificar el Grafo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        
        {/* Agregar Nueva Sede */}
        <form onSubmit={handleAddVertex} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>+ Registrar Nueva Sede (Nodo)</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ej. Sede Ingenierías"
              value={newVertex}
              onChange={(e) => setNewVertex(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '8px 12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Agregar
            </button>
          </div>
        </form>

        {/* Agregar Ruta entre Sedes */}
        <form onSubmit={handleAddEdge} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>🔗 Crear Ruta / Enlace (Arista)</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <select
              value={fromVertex}
              onChange={(e) => setFromVertex(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
            >
              {vertices.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <select
              value={toVertex}
              onChange={(e) => setToVertex(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
            >
              {vertices.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Conectar Sedes
          </button>
        </form>
      </div>

      {/* Algoritmos de Recorrido BFS / DFS */}
      <div style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #333' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#17a2b8' }}>🔍 Algoritmos de Exploración de Rutas (BFS / DFS)</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ fontSize: '13px' }}>Sede de Origen:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
          >
            {vertices.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <button onClick={handleBFS} style={{ padding: '6px 12px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Ejecutar BFS (Anchura)
          </button>
          <button onClick={handleDFS} style={{ padding: '6px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Ejecutar DFS (Profundidad)
          </button>
        </div>
        {traversalResult && (
          <div style={{ padding: '10px', background: '#11222b', borderLeft: '3px solid #17a2b8', borderRadius: '4px', fontSize: '13px', color: '#fff' }}>
            {traversalResult}
          </div>
        )}
      </div>

      {/* Visualización de la Lista de Adyacencia del Grafo */}
      <h3 style={{ fontSize: '16px' }}>Representación de la Lista de Adyacencia del Grafo</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
        {vertices.map((node) => (
          <div key={node} style={{ background: '#1a1a1a', padding: '12px', borderRadius: '6px', border: '1px solid #333' }}>
            <strong style={{ color: '#ffc107', fontSize: '15px' }}>🏛️ {node}</strong>
            <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#aaa' }}>
              Conectado con ({adjacencyList[node]?.length || 0}):
            </p>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: '13px', color: '#ddd' }}>
              {adjacencyList[node] && adjacencyList[node].length > 0 ? (
                adjacencyList[node].map((neighbor, idx) => <li key={idx}>➔ {neighbor}</li>)
              ) : (
                <li style={{ color: '#666', listStyle: 'none', marginLeft: '-18px' }}>Sin conexiones activas</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}