import type { Node } from 'reactflow';

import { nodeTypes } from '../canvas/nodes';

export type Entity = {
  id: string;
  name: string;
  fields: Field[];
};

export type Field = {
  name: string;
  type: FieldType;
  required: boolean;
};

export const FieldType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATETIME: 'datetime',
  ENUM: 'enum',
  RELATION: 'relation',
  LIST: 'list',
} as const;
export type FieldType = (typeof FieldType)[keyof typeof FieldType];

export type NodeType = keyof typeof nodeTypes;

export interface RFNode extends Node {
  type: NodeType;
}
