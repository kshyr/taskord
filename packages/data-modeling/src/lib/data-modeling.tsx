'use client';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import DataModelingEditor from '../editor/DataModelingEditor';
import DataModelingCanvas from '../canvas/DataModelingCanvas';

export function DataModeling() {
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
