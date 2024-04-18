import ReactFlow, { Background, MiniMap } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';
import { useCanvasStore } from '../lib/store';

import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';

export default function DataModelingCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useCanvasStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
      }))
    );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ maxZoom: 0.75 }}
      proOptions={{
        hideAttribution: true,
      }}
    >
      <Background className="bg-background stroke-muted" />
      <MiniMap className="[&>*]:border [&>*]:border-border [&>*>*]:stroke-gray-400 [&>*>*]:bg-gray-400 [&>*>rect]:fill-gray-900  [&>*>*]:fill-none [&>*]:bg-gray-950" />
    </ReactFlow>
  );
}
