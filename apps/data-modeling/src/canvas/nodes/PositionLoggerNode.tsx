import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared';
import type { NodeProps } from 'reactflow';
import { Handle, Position, HandleProps } from 'reactflow';
import { EntityFormInput } from '../../editor/DataModelingEditor';

export function PositionLoggerNode({
  xPos,
  yPos,
  data,
}: NodeProps<EntityFormInput>) {
  const x = `${Math.round(xPos)}px`;
  const y = `${Math.round(yPos)}px`;

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
