import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

export type PositionLoggerNodeData = {
  label?: string;
};

export function PositionLoggerNode({
  xPos,
  yPos,
  data,
}: NodeProps<PositionLoggerNodeData>) {
  const x = `${Math.round(xPos)}px`;
  const y = `${Math.round(yPos)}px`;

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="bg-gray-900 rounded-lg border border-gray-700 text-gray-50 py-1 px-2">
      {data.label && <div>{data.label}</div>}

      <div>
        {x} {y}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
