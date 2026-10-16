export class NaryTreeNode {
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

export class NaryTree {
  constructor(rootTitle = 'Root') {
    this.root = new NaryTreeNode(rootTitle);
  }
}