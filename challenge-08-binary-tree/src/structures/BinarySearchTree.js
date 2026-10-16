
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insertar un número en el árbol
  insert(value) {
    if (!Number.isFinite(value)) {
      return false;
    }

    if (this.root === null) {
      this.root = new TreeNode(value);
      return true;
    }

    let current = this.root;

    while (true) {
      if (value === current.value) {
        return false;
      }

      if (value < current.value) {
        if (current.left === null) {
          current.left = new TreeNode(value);
          return true;
        }

        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new TreeNode(value);
          return true;
        }

        current = current.right;
      }
    }
  }

  // Recorrido In-order: izquierda, raíz, derecha
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }

    return result;
  }

  // Recorrido Pre-order: raíz, izquierda, derecha
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }

    return result;
  }

  // Recorrido Post-order: izquierda, derecha, raíz
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }

    return result;
  }

  // Buscar un valor en el árbol
  search(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // Convertir el árbol al formato que utiliza react-d3-tree
  toD3Tree(node = this.root) {
    if (node === null) {
      return null;
    }

    const result = {
      name: String(node.value),
    };

    const children = [];

    if (node.left !== null) {
      children.push(this.toD3Tree(node.left));
    } else if (node.right !== null) {
      children.push({ name: '∅', attributes: { tipo: 'vacío' } });
    }

    if (node.right !== null) {
      children.push(this.toD3Tree(node.right));
    } else if (node.left !== null) {
      children.push({ name: '∅', attributes: { tipo: 'vacío' } });
    }

    if (children.length > 0) {
      result.children = children;
    }

    return result;
  }
}
