export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
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