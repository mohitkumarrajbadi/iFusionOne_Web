
import { type Edge, type Node } from "@xyflow/react";


export interface JsonPropertyData {
  propertyName: string;
  propertyType: string;
  propertyValue: any;
  children: string[];
  //   expanded: boolean;
  //   toggle?: () => void;
}

export interface JsonNodeData extends Record<string, unknown> {
  objProperties: JsonPropertyData[];
  children: string[];
  onToggle?: (id: string) => void;
  collapsed?: boolean;
}

// interface JsonNode extends Node<JsonNodeData> {
//   id: string;
//   data: JsonNodeData;
//   position: { x: number; y: number };
//   type?: string;
// }

// interface JsonEdge {
//     id: string;
//     source: string;
//     target: string;
//     animated?: boolean;
//     sourceHandle?: string;
//     targetHandle?: string;
// }

// function getType(value: any): string {
//   if (value === null) return "null";
//   if (Array.isArray(value)) return "array";
//   return typeof value;
// }

export default function useJsonGraph(json: any) {
  const jsonObj = JSON.parse(json);

  function buildGraph(obj: any,  path = "root") {
    const nodes: Node<JsonNodeData>[] = [];
    const edges: Edge[] = [];

    const nodeData: JsonPropertyData[] = [];
    const children: string[] = [];

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const propertyName = key;

        const propertyType =typeof (obj[key]);
        const propertyValue = obj[key];
        

        nodeData.push({
          propertyName: propertyName,
          propertyType: propertyType,
          propertyValue: propertyValue,
          children: propertyType === "object" && propertyValue !== null ? [`${path}.${key}`] : [],
        });

        if (propertyType === "object" && propertyValue !== null) {
          const childId = `${path}.${key}`;
          children.push(childId);

          edges.push({ id: `${path}-${childId}`, source: path, target: childId });
          const g = buildGraph(propertyValue, childId );
          const childNodes = g.nodes;
          const childEdges = g.edges;
          nodes.push(...childNodes);
          edges.push(...childEdges);
        }
      }
    }

    const nodeId = path;
    nodes.push({
      id: nodeId,
      data: { objProperties: nodeData, children: children },
      position: { x: 0, y: 0 },
      type: "jsonNode",

      hidden: false,
    });

    return { nodes, edges };
  }

  //   const { nodes, edges } = useMemo(() => {
  //     let res = buildGraph(json);
  //     return getLayoutedElements(res.nodes, res.edges);
  //   }, [json]);

  const { nodes, edges } = buildGraph(jsonObj);

  return { nodes, edges };
}
