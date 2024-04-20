import type { Element } from 'mdx/types';

export const MarkdownHandle = {
  DesignDraft: 'DesignDraft',
} as const;

type MarkdownHandle = (typeof MarkdownHandle)[keyof typeof MarkdownHandle];

export type MarkdownFile = Element | null;
export type MarkdownList = Record<MarkdownHandle, MarkdownFile>;
