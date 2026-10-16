export class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
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
      if (!node.left) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this._insertNode(node.right, newNode);
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
      children: children.length > 0 ? children : undefined,
    };
  }
}