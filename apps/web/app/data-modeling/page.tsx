import { DataModeling } from '@data-modeling';
import DesignDraft from './design-draft.mdx';

import styles from './page.module.css';
import { MarkdownFile } from '@shared/web/types';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <>
      <DesignDraft />
      <DataModeling markdowns={{ DesignDraft: <DesignDraft /> }} />
    </>
  );
}
