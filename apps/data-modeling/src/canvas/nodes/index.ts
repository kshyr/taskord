import type { Node, NodeTypes } from 'reactflow';
import { PositionLoggerNode } from './PositionLoggerNode';

export const INITIAL_ENTITIES = [
  {
    name: 'User',
    fields: [
      {
        name: 'id',
        type: 'number',
        required: true,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
      },
      {
        name: 'password',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    name: 'Post',
    fields: [
      {
        name: 'id',
        type: 'number',
        required: true,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
      },
    ],
  },
];

export const initialNodes = INITIAL_ENTITIES.map((entity, index) => ({
  id: entity.name,
  type: 'position-logger',
  data: {
    name: entity.name,
    fields: entity.fields,
  },
  position: { x: 250, y: 50 + index * 100 },
})) satisfies Node[];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
