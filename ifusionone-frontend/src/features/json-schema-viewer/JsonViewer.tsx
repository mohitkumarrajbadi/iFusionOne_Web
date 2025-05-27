import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import useExpandCollapse from "./useExpandCollapse";
import useJsonGraph, { type JsonNodeData } from "./useJsonGraph";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import JsonNode from "./components/JsonNode";

import useExpandCollapse from "./useExpandCollapse";
import { getLayoutedElements } from "./dagreLayout";

const nodeTypes: NodeTypes = {
  jsonNode: JsonNode,
};

function JsonViewer({ json }: { json: string }) {
  const g = React.useMemo(() => useJsonGraph(json), [json]);

  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  // Handler to toggle collapse
  const toggle = useCallback((id: string) => {
    console.log("toggled");
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Compute visible nodes/edges based on collapsed state
  const { nodes, edges } = useMemo(
    () => useExpandCollapse(g.nodes, g.edges, collapsed, toggle),
    [g.nodes, g.edges, collapsed, toggle]
  );

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const [layouted, setLayouted] = useState(false);

  // Sync rfNodes/rfEdges with computed nodes/edges
  useEffect(() => {
    // merge rfNodes with new nodes
    let newNodes: Node<JsonNodeData>[] = nodes.map((node) => {
      let rfNode = rfNodes.find((n) => n.id === node.id);
      if (rfNode) {
        return {
          ...rfNode,
          ...node,
        };
      }

      return node;
    });

    let newEdges: Edge[] = edges.map((edge) => {
      let rfEdge = rfEdges.find((e) => e.id === edge.id);
      if (rfEdge) {
        return {
          ...rfEdge,
          ...edge,
        };
      }
      return edge;
    });

    setLayouted(false); // Reset layout state on node changes
    setRfNodes(newNodes as Node<JsonNodeData>[]);
    setRfEdges(newEdges);
  }, [nodes, edges, setRfNodes, setRfEdges]);

  useEffect(() => {
    if (!layouted) {
      // console.log("Nodes before layout:", rfNodes);
      //   console.log("hey");
      // Check if all nodes have measured dimensions
      const allNodesMeasured = rfNodes.every(
        (node) => node.measured?.width && node.measured?.height
      );

      if (allNodesMeasured) {
        console.log("Applying layout...");

        // const visibleNodes = rfNodes.filter((n) => !n.hidden);
        // const visibleEdges = rfEdges.filter((e) => !e.hidden);

        const { nodes, edges } = getLayoutedElements(rfNodes, rfEdges);

        // // Merge layouted positions back into the full node list
        // const allNodes = nodes.map((node) => {
        //   const layouted = nodes.find((n) => n.id === node.id);
        //   return layouted ? { ...node, position: layouted.position } : node;
        // });

        // const allEdges = edges.map((edge) => {
        //   const layouted = edges.find((e) => e.id === edge.id);
        //   return layouted ? { ...edge, source: layouted.source, target: layouted.target } : edge;
        // });

        setRfNodes(nodes as Node<JsonNodeData>[]);
        setRfEdges(edges);
        setLayouted(true); // Prevent re-layouting
      }
    }
  }, [rfNodes, rfEdges, layouted]);

  // console.log(rfNodes);

  //   console.log("Graph:", g);

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={(changes) => {
            onNodesChange(changes);

            // setLayouted(false); // Reset layout state on node changes
          }}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#f5f5f5" />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </>
  );
}

export default {
  name: "JSON Schema Viewer",
  route: "/json-schema-viewer",
  component: JsonViewer,
  icon: "🔍",
};
