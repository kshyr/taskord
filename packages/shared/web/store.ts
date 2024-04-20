import { Element } from 'mdx/types';
import { create } from 'zustand';

type MarkdownFile = Element | null;

type MarkdownStoreState = {
  DesignDraft: MarkdownFile;
  setDesignDraft: (DesignDraft: MarkdownFile) => void;
};

export const useMarkdownStore = create<MarkdownStoreState>((set, get) => ({
  DesignDraft: null,
  setDesignDraft: (DesignDraft: MarkdownFile) => {
    set({ DesignDraft });
  },
}));
