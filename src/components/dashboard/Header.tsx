import Image from "next/image";
import Link from "next/link";
import { Bell, MessagesSquare, Settings2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b-2 bg-black px-4 py-2">
      <div className="flex items-center justify-center">
        <Image src="/static/icons/logo.svg" width={64} height={64} alt="logo" />
        <h1 className="font-head hidden text-4xl sm:block">taskord</h1>
      </div>
      <div className="flex items-center gap-8">
        <nav className="flex items-center justify-between gap-8">
          <ul className="flex h-full items-center justify-center gap-4">
            <li>
              <Link href="/" className="mr-8">
                dashboard
              </Link>
            </li>
            <li>
              <Link href="/">
                <MessagesSquare className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Bell className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Settings2 className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="bg-lightblue h-12 w-12 rounded-full"></div>
      </div>
    </header>
  );
}
