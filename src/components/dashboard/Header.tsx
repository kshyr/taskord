import Image from "next/image";
import Link from "next/link";
import { Bell, MessagesSquare, Settings2 } from "lucide-react";
import Breadcrumb from "@/src/components/dashboard/Breadcrumb";
import ProfileDropdown from "@/src/components/general/ProfileDropdown";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <Breadcrumb />
      <ProfileDropdown />
    </header>
  );
}
