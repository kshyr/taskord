import type { Edge, EdgeTypes } from 'reactflow';

export const initialEdges = [
  { id: 'a->b', source: 'a', target: 'b', animated: true }, // {id: 'a->b', source: 'a', target: 'b', animated: true, label: 'a->b
  { id: 'a->c', source: 'a', target: 'c', animated: true },
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
