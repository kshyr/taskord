import { Shared, Button } from '@shared';
import { ModeToggle } from '@shared/components/mode-toggle';

export default function DataModelingEditor() {
  return (
    <div className="flex flex-col gap-6 bg-card p-6 h-full border-r border-r-border">
      <ModeToggle />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Data Modeling Editor</h1>
        <p className="text-lg">This is a work in progress.</p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Nodes</h2>
        <Shared />
        <Button size="default">Click me</Button>
      </div>
    </div>
  );
}
