
import {  type Edge, type Node } from "@xyflow/react";
import type { JsonNodeData } from "./useJsonGraph";



  function visibleSubtree(
     nodeId: string,
     nMap: Map<string, Node<JsonNodeData>>,
     collapsed: Set<string>
   ) {
     const out: string[] = [nodeId];
     const node = nMap.get(nodeId);
     if (!node || !node.data.children || collapsed.has(nodeId)) return out;
     node.data.children.forEach((id) => out.push(...visibleSubtree(id, nMap, collapsed)));
     return out;
   }

export default function useExpandCollapse(allNodes: Node<JsonNodeData>[], allEdges: Edge[], collapsed: Set<string>, toggle: (id: string) => void) {

//   console.log("hello from useExpandCollapse");

    
    
//       const nMap = useMemo(() => new Map(allNodes.map((n) => [n.id, n])), [allNodes]);
    
     
    
//       // ids that should stay visible
//       const visibleIds = useMemo(() => visibleSubtree("root", nMap, collapsed), [collapsed, nMap]);
    
//       const nodes: Node<JsonNodeData>[] = allNodes.map((n) =>
//         visibleIds.includes(n.id)
//           ? { ...n, data: { ...n.data, onToggle: toggle, collapsed: collapsed.has(n.id) } }
//           : { ...n, hidden: true }
//       );
    
//       const edges = allEdges.map((e) =>
//         visibleIds.includes(e.source) && visibleIds.includes(e.target) ? e : { ...e, hidden: true }
//       );
  
 
//   return {
//     nodes,
//     edges,
//     onToggle: toggle 
//   };


 const nMap = new Map(allNodes.map((n) => [n.id, n]));
  const visibleIds = visibleSubtree("root", nMap, collapsed);

  const nodes: Node<JsonNodeData>[] = allNodes.map((n) =>
    visibleIds.includes(n.id)
      ? { ...n, data: { ...n.data, onToggle: toggle, collapsed: collapsed.has(n.id) } }
      : { ...n, hidden: true }
  );

//   const edges = allEdges.map((e) =>
//     visibleIds.includes(e.source) && visibleIds.includes(e.target) ? e : { ...e, hidden: true }
//   );

const edges: Edge[] = allEdges.map((e) => ({
  ...e,
  hidden: !(visibleIds.includes(e.source) && visibleIds.includes(e.target)),
}));

  return { nodes, edges };
}