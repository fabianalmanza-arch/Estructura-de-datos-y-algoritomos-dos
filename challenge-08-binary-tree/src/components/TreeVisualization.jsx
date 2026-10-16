
import Tree from 'react-d3-tree';

export default function TreeVisualization({ data }) {
  if (!data) {
    return <p>El árbol está vacío.</p>;
  }

  return (
    <div className="arbol-visual">
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 350, y: 60 }}
        separation={{ siblings: 1.2, nonSiblings: 1.5 }}
        nodeSize={{ x: 100, y: 90 }}
        collapsible={false}
        zoomable
        draggable
      />
    </div>
  );
}
