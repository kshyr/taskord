import Breadcrumb from "@/src/components/dashboard/Breadcrumb";
import ProfileDropdown from "@/src/components/general/ProfileDropdown";

export default function Header() {
  return (
    <header className="flex h-10 w-full items-center justify-between">
      <Breadcrumb />
      <ProfileDropdown />
    </header>
  );
}
