import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { Button, SheetContent, Sheet } from '@shared';
import DesignDraft from './design-draft.mdx';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCanvasStore from '../lib/store';
import { useShallow } from 'zustand/react/shallow';

const INITIAL_ENTITIES = [
  {
    name: 'User',
    fields: [
      {
        name: 'id',
        type: 'number',
        required: true,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
      },
      {
        name: 'password',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    name: 'Post',
    fields: [
      {
        name: 'id',
        type: 'number',
        required: true,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
      },
    ],
  },
];

export type EntityFormInput = {
  name: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
};

export default function DataModelingEditor() {
  const [entities, setEntities] = useState<EntityFormInput[]>([]);
  const [fieldsAmount, setFieldsAmount] = useState(1);
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
  } = useForm<EntityFormInput>();

  const onAddEntity = (data: EntityFormInput) => {
    setNodes([
      ...nodes,
      {
        id: data.name,
        type: 'position-logger',
        position: { x: 0, y: 0 },
        data,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6 bg-card p-6 h-full border-r border-r-border">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Data Modeling Editor</h1>
          <Link to="/design-draft">
            <Button variant="outline" size="icon">
              <QuestionMarkIcon />
            </Button>
          </Link>
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
      <DesignDraftSheet />
    </div>
  );
}

export function DesignDraftSheet() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesignDraft = location.pathname === '/design-draft';
  const [open, setOpen] = useState(isDesignDraft);

  useEffect(() => {
    setOpen(isDesignDraft);
  }, [isDesignDraft]);

  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        if (open) {
          navigate('/');
        }
      }}
    >
      <SheetContent
        side="left"
        className="dark:prose-invert prose overflow-y-scroll min-w-[800px]"
      >
        <DesignDraft />
      </SheetContent>
    </Sheet>
  );
}
