import { Card, CardContent, CardHeader, CardTitle } from '@shared-ui';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { Entity } from '../../types';

export function PositionLoggerNode({ data }: NodeProps<Entity>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <Card className="w-[350px]">
      <Handle type="target" position={Position.Top} />
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.fields?.map((field) => {
          return (
            <div key={data.name + field.name}>
              <span>{field.name}</span>
              <span>{field.type}</span>
              <span>{field.required}</span>
            </div>
          );
        })}
      </CardContent>
      <Handle type="source" isConnectable position={Position.Bottom} />
    </Card>
  );
}
