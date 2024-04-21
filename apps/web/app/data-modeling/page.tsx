import { DataModeling } from '@data-modeling';
import { BASE_URL } from '@shared/web/constants';
import { MarkdownSetter } from '../../hooks';
import { MDXRemote } from 'next-mdx-remote/rsc';

async function DesignDraft() {
  const url = BASE_URL ?? 'http://localhost:3000/';
  const res = await fetch(url + 'mdx/design-draft.mdx');
  const markdown = await res.text();
  return <MDXRemote source={markdown} />;
}

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <>
      <MarkdownSetter markdown={<DesignDraft />} handle="DesignDraft" />
      <DataModeling markdowns={{ DesignDraft: <DesignDraft /> }} />
    </>
  );
}
