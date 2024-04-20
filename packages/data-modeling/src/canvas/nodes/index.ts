import type { Node, NodeTypes } from 'reactflow';
import { PositionLoggerNode } from './PositionLoggerNode';
import { Entity } from '@data-modeling/types';

export const INITIAL_ENTITIES: Entity[] = [
  {
    id: '1',
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
    id: '2',
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
