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
    <Card className="w-[350px]">
      <Handle type="target" position={Position.Top} />
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4"></div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">{data.label}</Button>
        <Button>Deploy</Button>
      </CardFooter>
      <Handle type="source" isConnectable position={Position.Bottom} />
    </Card>
  );
}
