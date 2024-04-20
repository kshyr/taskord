import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Entity, RFNode } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createNodeFromEntity = (entity: Entity): RFNode => {
  // TODO: Implement the logic to create a node from the entity
  return {
    id: entity.name,
    type: 'position-logger',
    position: { x: 0, y: 0 },
    data: entity,
  };
};
