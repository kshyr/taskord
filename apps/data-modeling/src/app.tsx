import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@shared/components/theme-provider';
import DataModelingEditor, {
  DesignDraftSheet,
} from './editor/DataModelingEditor.js';
import DataModelingCanvas from './canvas/DataModelingCanvas.js';

import 'reactflow/dist/style.css';

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
  return (
    <PanelGroup autoSaveId="dataModelingEditor" direction="horizontal">
      <Panel defaultSize={33}>
        <DataModelingEditor />
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={67}>
        <DataModelingCanvas />
      </Panel>
    </PanelGroup>
  );
}
