import type { Node, NodeTypes } from 'reactflow';
import { PositionLoggerNode } from './PositionLoggerNode';

export const initialNodes = [
  {
    id: 'a',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: 50, y: 20 },
    data: { label: 'drag me!' },
  },
  {
    id: 'c',
    type: 'output',
    position: { x: 250, y: 100 },
    data: { label: 'output' },
  },
] satisfies Node[];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
