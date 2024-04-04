import type { OnConnect } from 'reactflow';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useCallback } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Background,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { ThemeProvider } from '@shared/components/theme-provider';
import DataModelingEditor, {
  DesignDraftSheet,
} from './editor/DataModelingEditor.js';

import 'reactflow/dist/style.css';

import { initialNodes, nodeTypes } from './canvas/nodes';
import { initialEdges, edgeTypes } from './canvas/edges';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DataModeling />,
      children: [
        {
          path: 'design-draft',
          element: <DesignDraftSheet />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="dataModelingTheme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

function DataModeling() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  return (
    <PanelGroup autoSaveId="dataModelingEditor" direction="horizontal">
      <Panel defaultSize={33}>
        <DataModelingEditor />
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={67}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{
            hideAttribution: true,
          }}
        >
          <Background className="bg-background stroke-muted" />
          <MiniMap className="[&>*]:border [&>*]:border-border [&>*>*]:stroke-gray-400 [&>*>*]:bg-gray-400 [&>*>rect]:fill-gray-900  [&>*>*]:fill-none [&>*]:bg-gray-950" />
        </ReactFlow>
      </Panel>
    </PanelGroup>
  );
}
