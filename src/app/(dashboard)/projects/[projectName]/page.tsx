import { decodeSlug } from "@/src/utils/general.utils.ts";

export default async function ProjectPage({
  params,
}: {
  params: { projectName: string };
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{decodeSlug(params.projectName)}</h1>
      <p className="font-xl font-normal">This is a project page</p>
    </div>
  );
}
