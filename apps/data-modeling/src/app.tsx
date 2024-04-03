import type { OnConnect } from 'reactflow';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useCallback } from 'react';
import {
  Background,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <PanelGroup autoSaveId="dataModelingEditor" direction="horizontal">
      <Panel defaultSize={25}>
        <div className="bg-gray-900 text-gray-50 p-4 h-full border-r border-r-gray-800">
          <h1 className="text-xl font-bold">Data Modeling Editor</h1>
          <p className="text-lg">This is a work in progress.</p>
        </div>
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={75}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background className="bg-gray-950 stroke-gray-900" />
          <MiniMap className="[&>*]:border [&>*]:border-gray-600 [&>*>*]:stroke-gray-400 [&>*>*]:bg-gray-400 [&>*>rect]:fill-gray-900  [&>*>*]:fill-none [&>*]:bg-gray-950" />
        </ReactFlow>
      </Panel>
    </PanelGroup>
  );
}
