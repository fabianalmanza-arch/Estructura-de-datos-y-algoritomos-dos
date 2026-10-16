export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
    this.items.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
  }

  dequeue() {
    return this.items.shift();
  }

  getItems() {
    return [...this.items];
  }
}