'use client';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import DataModelingEditor from './editor/DataModelingEditor.js';
import DataModelingCanvas from './canvas/DataModelingCanvas.js';

import '@shared/globals.css';
import 'reactflow/dist/style.css';

export default function DataModeling() {
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
