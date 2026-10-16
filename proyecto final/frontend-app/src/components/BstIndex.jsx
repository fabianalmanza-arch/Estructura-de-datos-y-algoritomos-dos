import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { BinarySearchTree } from 'data-structures-lib';

// Instancia inicial del Árbol BST con datos numéricos de prueba (IDs de catálogo)
const initialBst = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80, 15, 25, 65, 85].forEach((id) => initialBst.insert(id));

export function BstIndex() {
  const [bst] = useState(initialBst);
  const [treeData, setTreeData] = useState(bst.toD3Format());
  const [newValue, setNewValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Recorridos del Árbol
  const inOrderResult = bst.inOrder().join(' → ');
  const preOrderResult = bst.preOrder().join(' → ');
  const postOrderResult = bst.postOrder().join(' → ');

  // Imprimir recorridos en consola de acuerdo al requerimiento
  console.log('--- RECORRIDOS ÁRBOL BST ---');
  console.log('Inorder:', bst.inOrder());
  console.log('Preorder:', bst.preOrder());
  console.log('Postorder:', bst.postOrder());

  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(newValue, 10);
    if (isNaN(val)) {
      alert('Ingresa un número entero válido.');
      return;
    }

    bst.insert(val);
    setTreeData(bst.toD3Format()); // Actualizar la vista visual del gráfico
    setNewValue('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchValue, 10);
    if (isNaN(val)) return;

    const found = bst.search(bst.root, val);
    setSearchResult(found ? `✓ El código ID ${val} SÍ existe en el índice.` : `✗ El código ID ${val} NO fue encontrado.`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #17a2b8', paddingBottom: '10px' }}>
        🌳 Índice Estructurado del Catálogo (Árbol BST)
      </h2>
      <p style={{ color: '#aaa', fontSize: '14px' }}>
        Estructura jerárquica de búsqueda rápida de identificadores binarios indexados.
      </p>

      {/* Formularios de inserción y búsqueda */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <form onSubmit={handleInsert} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Insertar Código ID</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              placeholder="Ej. 45"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '8px 12px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              + Insertar
            </button>
          </div>
        </form>

        <form onSubmit={handleSearch} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Consultar Existencia</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              placeholder="Buscar ID..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '8px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              🔍 Buscar
            </button>
          </div>
          {searchResult && <p style={{ fontSize: '12px', marginTop: '8px', color: searchResult.includes('SÍ') ? '#28a745' : '#dc3545' }}>{searchResult}</p>}
        </form>
      </div>

      {/* Panel de Recorridos */}
      <div style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', border: '1px solid #333' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#17a2b8' }}>Recorridos del Árbol (Impresos también en la consola)</h4>
        <p style={{ margin: '4px 0' }}><strong>In-Order (Ordenado):</strong> {inOrderResult}</p>
        <p style={{ margin: '4px 0' }}><strong>Pre-Order:</strong> {preOrderResult}</p>
        <p style={{ margin: '4px 0' }}><strong>Post-Order:</strong> {postOrderResult}</p>
      </div>

      {/* Renderizado gráfico con react-d3-tree */}
      <h3 style={{ fontSize: '16px' }}>Representación Visual Gráfica (react-d3-tree)</h3>
      <div style={{ width: '100%', height: '400px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #444', overflow: 'hidden' }}>
        {treeData && (
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="step"
            translate={{ x: 420, y: 50 }}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
          />
        )}
      </div>
    </div>
  );
}