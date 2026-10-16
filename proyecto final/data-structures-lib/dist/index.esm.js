class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(data) {
    const newNode = new ListNode(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

class DoublyNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
class DoublyLinkedList {
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

class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  getItems() {
    return [...this.items].reverse();
  }
}

class Queue {
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

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }
  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) node.left = newNode;else this._insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;else this._insertNode(node.right, newNode);
    }
  }
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }
  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
  search(node, value) {
    if (!node) return false;
    if (value < node.value) return this.search(node.left, value);
    if (value > node.value) return this.search(node.right, value);
    return true;
  }
  toD3Format(node = this.root) {
    if (!node) return null;
    const children = [];
    if (node.left) children.push(this.toD3Format(node.left));
    if (node.right) children.push(this.toD3Format(node.right));
    return {
      name: String(node.value),
      children: children.length > 0 ? children : undefined
    };
  }
}

class NaryTreeNode {
  constructor(title, link = '#', component = null) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }
  addChild(node) {
    this.children.push(node);
  }
}
class NaryTree {
  constructor(rootTitle = 'Root') {
    this.root = new NaryTreeNode(rootTitle);
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let current = this.root;
    for (const char of word.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }
  searchWithPrefix(prefix) {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }
    return this._collectWords(current, prefix.toLowerCase());
  }
  _collectWords(node, prefix, results = []) {
    if (node.isEndOfWord) results.push(prefix);
    for (const char in node.children) {
      this._collectWords(node.children[char], prefix + char, results);
    }
    return results;
  }
}

export { BSTNode, BinarySearchTree, DoublyLinkedList, DoublyNode, LinkedList, ListNode, NaryTree, NaryTreeNode, Queue, Stack, Trie, TrieNode };
//# sourceMappingURL=index.esm.js.map
