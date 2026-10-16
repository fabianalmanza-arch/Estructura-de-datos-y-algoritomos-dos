export class DoublyNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  visit(data) {
    const newNode = new DoublyNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
      return;
    }
    this.current.next = newNode;
    newNode.prev = this.current;
    this.tail = newNode;
    this.current = newNode;
  }

  goBack() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current ? this.current.data : null;
  }

  goForward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current ? this.current.data : null;
  }
}