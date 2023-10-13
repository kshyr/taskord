import Image from "next/image";
import Link from "next/link";
import { Bell, MessagesSquare, Settings2 } from "lucide-react";
import Breadcrumb from "@/src/components/dashboard/Breadcrumb";

export default function Header() {
  return (
    <header className="flex w-full items-center">
      <Breadcrumb />
    </header>
  );
}
