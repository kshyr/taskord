import { DataModeling } from '@data-modeling';
import { MarkdownSetter } from '../../hooks';
import { MDXRemote } from 'next-mdx-remote/rsc';

async function DesignDraft() {
  const res = await fetch(process.env.URL + 'mdx/design-draft.mdx');
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
