'use client';

import { useMarkdownStore } from '@shared/web/store';
import { MarkdownFile, MarkdownHandle } from '@shared/web/types';
import { useEffect } from 'react';

export function MarkdownSetter({
  markdown,
  handle,
}: {
  markdown: MarkdownFile;
  handle: MarkdownHandle;
}) {
  const markdowns = useMarkdownStore((state) => state.markdowns);
  const setMarkdowns = useMarkdownStore((state) => state.setMarkdowns);

  useEffect(() => {
    setMarkdowns({ ...markdowns, [handle]: markdown });
  }, [markdown, handle]);
  return null;
}
