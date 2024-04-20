'use client';

import { useMarkdownStore } from '@shared/web/store';
import { useEffect } from 'react';
export function useSetMarkdown({ markdown }) {
  const setDesignDraft = useMarkdownStore((state) => state.setDesignDraft);

  useEffect(() => {
    setDesignDraft(markdown);
  });
}

export function MarkdownSetter({ markdown }) {
  useSetMarkdown({ markdown });
  return null;
}
