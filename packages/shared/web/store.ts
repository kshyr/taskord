import { Element } from 'mdx/types';
import { create } from 'zustand';
import { MarkdownList } from './types';

type MarkdownStoreState = {
  markdowns: MarkdownList | null;
  setMarkdowns: (markdowns: MarkdownList) => void;
};

export const useMarkdownStore = create<MarkdownStoreState>((set, _get) => ({
  markdowns: null,
  setMarkdowns: (markdowns: MarkdownList) => {
    set({ markdowns });
  },
}));
