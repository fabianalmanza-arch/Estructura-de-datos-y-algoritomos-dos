// src/services/TransactionManager.js

export class TransactionManager {
  constructor(storageKey = 'library_system_db') {
    this.storageKey = storageKey;
    this.inTransaction = false;
    this.stagingData = null; // Copia temporal durante la transacción
  }

  // Cargar datos persistidos desde localStorage
  getSnapshot() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Iniciar una transacción de datos
  beginTransaction(currentData) {
    if (this.inTransaction) {
      throw new Error('Ya hay una transacción activa.');
    }
    this.inTransaction = true;
    // Copia profunda para aislamiento
    this.stagingData = JSON.parse(JSON.stringify(currentData));
    return this.stagingData;
  }

  // Confirmar y guardar permanentemente los cambios (COMMIT)
  commit(newData) {
    if (!this.inTransaction) {
      throw new Error('No hay ninguna transacción activa para confirmar.');
    }
    localStorage.setItem(this.storageKey, JSON.stringify(newData));
    this.inTransaction = false;
    this.stagingData = null;
    return true;
  }

  // Cancelar y revertir cambios (ROLLBACK)
  rollback() {
    if (!this.inTransaction) {
      throw new Error('No hay ninguna transacción activa para revertir.');
    }
    this.inTransaction = false;
    const previousSnapshot = this.getSnapshot();
    this.stagingData = null;
    return previousSnapshot;
  }
}

export const dbManager = new TransactionManager();