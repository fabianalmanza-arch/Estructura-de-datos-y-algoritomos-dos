// src/structures/Graph.js
export class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
    if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);

    if (!this.adjacencyList[vertex1].includes(vertex2)) {
      this.adjacencyList[vertex1].push(vertex2);
    }
    if (!this.adjacencyList[vertex2].includes(vertex1)) {
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => v !== vertex2);
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => v !== vertex1);
  }

  // Recorrido en Anchura (BFS)
  bfs(startNode) {
    const queue = [startNode];
    const result = [];
    const visited = {};
    visited[startNode] = true;

    while (queue.length) {
      const current = queue.shift();
      result.push(current);

      this.adjacencyList[current]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  // Recorrido en Profundidad (DFS)
  dfs(startNode) {
    const result = [];
    const visited = {};
    const list = this.adjacencyList;

    function traverse(vertex) {
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);

      list[vertex]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          traverse(neighbor);
        }
      });
    }

    traverse(startNode);
    return result;
  }
}