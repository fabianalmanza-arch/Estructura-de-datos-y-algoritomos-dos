import React, { useState } from 'react';
import { dbManager } from '../services/TransactionManager';

export function TransactionPanel({ currentBooks, onUpdateBooks }) {
  const [inTx, setInTx] = useState(false);
  const [txLog, setTxLog] = useState([]);
  const [backupData, setBackupData] = useState(null);

  const handleStartTransaction = () => {
    try {
      const staging = dbManager.beginTransaction(currentBooks);
      setBackupData(currentBooks);
      setInTx(true);
      setTxLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] 🟢 BEGIN TRANSACTION: Copia de seguridad creada.`]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCommit = () => {
    try {
      dbManager.commit(currentBooks);
      setInTx(false);
      setBackupData(null);
      setTxLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ✅ COMMIT: Cambios guardados permanentemente en LocalStorage.`]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRollback = () => {
    try {
      const restoredData = dbManager.rollback();
      if (restoredData && onUpdateBooks) {
        onUpdateBooks(restoredData);
      } else if (backupData && onUpdateBooks) {
        onUpdateBooks(backupData);
      }
      setInTx(false);
      setBackupData(null);
      setTxLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] 🔴 ROLLBACK: Cambios descartados. Estado restaurado.`]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ background: '#181818', padding: '15px', borderRadius: '8px', border: '1px solid #444', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: '#007bff' }}>💾 Control de Transacciones de Base de Datos</h4>
        <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '4px', background: inTx ? '#28a745' : '#6c757d' }}>
          {inTx ? 'TRANSACCIÓN EN CURSO (PENDING)' : 'MODO LECTURA / AUTO-COMMIT'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button
          onClick={handleStartTransaction}
          disabled={inTx}
          style={{ padding: '8px 14px', background: inTx ? '#444' : '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: inTx ? 'not-allowed' : 'pointer' }}
        >
          ▶ Iniciar Transacción (BEGIN)
        </button>
        <button
          onClick={handleCommit}
          disabled={!inTx}
          style={{ padding: '8px 14px', background: !inTx ? '#444' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: !inTx ? 'not-allowed' : 'pointer' }}
        >
          ✓ Confirmar (COMMIT)
        </button>
        <button
          onClick={handleRollback}
          disabled={!inTx}
          style={{ padding: '8px 14px', background: !inTx ? '#444' : '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: !inTx ? 'not-allowed' : 'pointer' }}
        >
          ↩ Revertir (ROLLBACK)
        </button>
      </div>

      {/* Bitácora de Transacciones */}
      {txLog.length > 0 && (
        <div style={{ marginTop: '12px', background: '#111', padding: '10px', borderRadius: '4px', fontSize: '12px', color: '#aaa', maxHeight: '100px', overflowY: 'auto' }}>
          {txLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      )}
    </div>
  );
}