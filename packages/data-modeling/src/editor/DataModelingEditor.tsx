'use client';
import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { Button, SheetContent, Sheet } from '@shared-ui';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCanvasStore, useEditorStore } from '../util/store';
import { useShallow } from 'zustand/react/shallow';
import type { Entity } from '../types';
import type { MarkdownFile, MarkdownList } from '@shared/web/types';
import { createNodeFromEntity } from '../util';
import { useMarkdownStore } from '@shared/web/store';
import { Element } from 'mdx/types';

export default function DataModelingEditor({
  markdowns,
}: {
  markdowns: MarkdownList;
}) {
  const entities = useEditorStore((state) => state.entities);
  const [fieldsAmount, setFieldsAmount] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { nodes, edges, setNodes, setEdges } = useCanvasStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Entity>();

  const onAddEntity = (data: Entity) => {
    const newNode = createNodeFromEntity(data);
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col gap-6 bg-card p-6 h-full border-r border-r-border">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Data Modeling Editor</h1>
          <Button
            onClick={() => setIsSheetOpen(true)}
            variant="outline"
            size="icon"
          >
            <QuestionMarkIcon />
          </Button>
        </div>
        <p className="text-lg">This is a work in progress.</p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Entities</h2>
        <form onSubmit={handleSubmit(onAddEntity)}>
          <div className="flex flex-col gap-4 text-black">
            <input
              type="text"
              placeholder="Entity name"
              {...register('name', { required: true })}
            />
            {Array.from({ length: fieldsAmount }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Field name"
                  {...register(`fields.${index}.name`, { required: true })}
                />
                <select
                  {...register(`fields.${index}.type`, { required: true })}
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                </select>
                <input
                  type="checkbox"
                  {...register(`fields.${index}.required`)}
                />
              </div>
            ))}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setFieldsAmount((prev) => prev + 1)}
              >
                Add Field
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setFieldsAmount((prev) => prev - 1)}
              >
                Remove Field
              </Button>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Add Entity</Button>
            </div>
            {errors.name && (
              <p className="text-red-500">Entity name is required.</p>
            )}
          </div>
        </form>
        <hr />
        <div className="flex flex-col gap-4">
          {entities.map((entity) => (
            <div key={entity.name} className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{entity.name}</h3>
              <div className="flex flex-col gap-2">
                {entity.fields.map((field) => (
                  <div key={field.name} className="flex gap-2">
                    <div className="w-1/4">{field.name}</div>
                    <div className="w-1/4">{field.type}</div>
                    <div className="w-1/4">
                      {field.required ? 'Required' : 'Optional'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DesignDraftSheet isOpen={isSheetOpen} />
    </div>
  );
}

export function DesignDraftSheet({ isOpen }: { isOpen: boolean }) {
  const markdowns = useMarkdownStore((state) => state.markdowns);
  const designDraftMarkdown = markdowns?.DesignDraft;

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side="left"
        className="dark:prose-invert prose overflow-y-scroll min-w-[800px]"
      >
        {designDraftMarkdown}
      </SheetContent>
    </Sheet>
  );
}
