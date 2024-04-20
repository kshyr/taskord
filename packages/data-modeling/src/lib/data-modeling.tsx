'use client';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import DataModelingEditor from '../editor/DataModelingEditor';
import DataModelingCanvas from '../canvas/DataModelingCanvas';

import { MarkdownList } from '@shared/web/types';

export function DataModeling({ markdowns }: { markdowns: MarkdownList }) {
  return (
    <PanelGroup autoSaveId="dataModelingEditor" direction="horizontal">
      <Panel defaultSize={33}>
        <DataModelingEditor markdowns={markdowns} />
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={67}>
        <DataModelingCanvas />
      </Panel>
    </PanelGroup>
  );
}
