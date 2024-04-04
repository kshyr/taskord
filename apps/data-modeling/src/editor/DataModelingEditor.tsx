import { QuestionMarkIcon } from '@radix-ui/react-icons';
import { Button, SheetContent, Sheet } from '@shared';
import DesignDraft from './design-draft.mdx';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const entities = [
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

export default function DataModelingEditor() {
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
