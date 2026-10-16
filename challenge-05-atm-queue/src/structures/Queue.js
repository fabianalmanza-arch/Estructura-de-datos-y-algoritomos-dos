
class Queue {
  constructor() {
    this.items = [];
  }

  // Agregar una persona al final de la cola
  enqueue(persona) {
    this.items.push(persona);
  }

  // Retirar la primera persona de la cola
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.shift();
  }

  // Consultar la primera persona sin retirarla
  front() {
    return this.isEmpty() ? null : this.items[0];
  }

  // Comprobar si la cola está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener una copia de las personas
  toArray() {
    return [...this.items];
  }

  // Consultar cuántas personas hay
  get size() {
    return this.items.length;
  }
}

export default Queue;
