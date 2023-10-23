import Breadcrumb from "@/src/components/dashboard/Breadcrumb";
import ProfileDropdown from "@/src/components/general/ProfileDropdown";
import { getProjectNames } from "@/src/graphql/queries.ts";
import { getUserSession } from "@/src/utils/auth.utils.ts";

export default async function Header() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }

  const projectNameIds = await getProjectNames(session);
  return (
    <header className="flex h-10 w-full items-center justify-between">
      <Breadcrumb projectNameIds={projectNameIds} />
      <ProfileDropdown />
    </header>
  );
}
