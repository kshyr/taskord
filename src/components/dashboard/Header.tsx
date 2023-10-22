import Breadcrumb from "@/src/components/dashboard/Breadcrumb";
import ProfileDropdown from "@/src/components/general/ProfileDropdown";
import { getProjectNames } from "@/src/graphql/queries.ts";

export default async function Header() {
  const projectNameIds = await getProjectNames();
  return (
    <header className="flex h-10 w-full items-center justify-between">
      <Breadcrumb projectNameIds={projectNameIds} />
      <ProfileDropdown />
    </header>
  );
}
