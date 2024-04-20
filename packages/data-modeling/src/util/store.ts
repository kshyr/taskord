import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import type { Entity } from '../types';

import { INITIAL_ENTITIES, initialNodes } from '../canvas/nodes';
import { initialEdges } from '../canvas/edges';

type CanvasStoreState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export const useCanvasStore = create<CanvasStoreState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
}));

type EditorStoreState = {
  entities: Entity[];
  setEntities: (entities: Entity[]) => void;
};

export const useEditorStore = create<EditorStoreState>((set) => ({
  entities: INITIAL_ENTITIES,
  setEntities: (entities: Entity[]) => {
    set({ entities });
  },
}));
