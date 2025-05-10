import React, { useState, useCallback, JSX } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Position,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './SchemaViewer.css';

type NodeType = Node & {
  data: {
    label: string;
    path?: string;
    renderedLabel?: JSX.Element;
  };
  parentId?: string;
};

type EdgeType = Edge;

type NodeMapType = Record<
  string,
  NodeType & { expanded: boolean; children: string[] }
>;

let globalId = 0;
const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

// Track vertical positioning per depth level
const levelIndexMap: Record<number, number> = {};

const createNode = (
  label: string,
  level: number,
  path: string
): NodeType => {
  if (!levelIndexMap[level]) levelIndexMap[level] = 0;

  const id = `node-${globalId++}`;
  const y = levelIndexMap[level] * 100;
  const x = level * 300;

  const node: NodeType = {
    id,
    data: {
      label,
      path,
      renderedLabel: <div title={path}>{label}</div>,
    },
    position: { x, y },
    ...nodeDefaults,
  };

  levelIndexMap[level]++;
  return node;
};

const parseJSONToFlatMap = (
  obj: unknown,
  parentId: string | null = null,
  level: number = 0,
  key: string = '',
  path: string = ''
): (NodeType | EdgeType)[] => {
  const currentPath = path ? `${path}.${key}` : key || 'root';
  const isObject = obj !== null && typeof obj === 'object';
  const label = isObject ? key || 'root' : `${key}: ${String(obj)}`;

  const node = createNode(label, level, currentPath);
  const children: { key: string; value: unknown }[] = [];

  if (isObject && !Array.isArray(obj)) {
    Object.entries(obj).forEach(([k, v]) => children.push({ key: k, value: v }));
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      children.push({ key: `[${i}]`, value: item });
    });
  }

  const childNodes = children.flatMap((child) =>
    parseJSONToFlatMap(child.value, node.id, level + 1, child.key, currentPath)
  );

  const edges = childNodes
    .filter((n): n is NodeType => 'data' in n && 'parentId' in n && n.parentId === node.id)
    .map((child) => ({
      id: `edge-${node.id}-${child.id}`,
      source: node.id,
      target: child.id,
    }));

  return [{ ...node, parentId: parentId ?? undefined }, ...childNodes, ...edges];
};

const SchemaViewer = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [nodeMap, setNodeMap] = useState<NodeMapType>({});

  const handleView = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      globalId = 0;
      Object.keys(levelIndexMap).forEach((k) => delete levelIndexMap[+k]);

      let flatResult: (NodeType | EdgeType)[] = [];

      if (Array.isArray(parsed)) {
        parsed.forEach((item, i) => {
          flatResult.push(
            ...parseJSONToFlatMap(item, null, 0, `${i}`, `root[${i}]`)
          );
        });
      } else {
        const [rootKey, rootVal] = Object.entries(parsed)[0] ?? ['root', parsed];
        flatResult = parseJSONToFlatMap(rootVal, null, 0, rootKey, '');
      }

      const allNodes = flatResult.filter((e): e is NodeType => 'data' in e);
      const allEdges = flatResult.filter((e): e is EdgeType => 'source' in e);

      const nodeMapTemp: NodeMapType = {};
      allNodes.forEach((node) => {
        nodeMapTemp[node.id] = {
          ...node,
          expanded: false,
          children: allEdges.filter((e) => e.source === node.id).map((e) => e.target),
        };
      });

      const rootNodes = allNodes.filter((node) => !node.parentId);
      setNodes(rootNodes);
      setEdges(allEdges);
      setNodeMap(nodeMapTemp);
    } catch {
      alert('Invalid JSON format.');
    }
  }, [jsonInput]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = nodeMap[node.id];
      if (!data || data.expanded) return;

      const newChildren = data.children.map((childId) => nodeMap[childId]);
      const newEdges = newChildren.map((child) => ({
        id: `edge-${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
      }));

      setNodes((prev) => [...prev, ...newChildren]);
      setEdges((prev) => [...prev, ...newEdges]);

      setNodeMap((prev) => ({
        ...prev,
        [node.id]: { ...prev[node.id], expanded: true },
      }));
    },
    [nodeMap]
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '40%', padding: '10px', background: '#f0f0f0' }}>
        <h3>Paste JSON</h3>
        <textarea
          rows={30}
          style={{ width: '100%', fontFamily: 'monospace' }}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here"
        />
        <button onClick={handleView} style={{ marginTop: '10px' }}>
          View
        </button>
      </div>
      <div style={{ width: '60%' }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              label: node.data.renderedLabel || node.data.label,
            },
          }))}
          edges={edges}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default SchemaViewer;
