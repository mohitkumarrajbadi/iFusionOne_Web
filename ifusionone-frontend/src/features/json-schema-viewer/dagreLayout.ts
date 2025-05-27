// dagreLayout.ts
import Dagre from "@dagrejs/dagre";
import {  type Edge, type Node } from "@xyflow/react";


const nodeWidth = 0;
const nodeHeight = 0;

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "LR"
): { nodes: Node[]; edges: Edge[] } => {

  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, ranksep: 120 });

  
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  nodes.forEach((node) => {
    
    dagreGraph.setNode(node.id, {
      ...node,
     
      width: node.width ?? node.measured?.width ?? nodeWidth,
      height: node.height ?? node.measured?.height ?? nodeHeight,
      
      
    });
  });

  Dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const position = dagreGraph.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
