"use client";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  Home,
  ListTodo,
  Settings2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils/styles.utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Home size={20} />,
  },
  {
    name: "My Projects",
    path: "/projects",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "My Tasks",
    path: "/tasks",
    icon: <ListTodo size={20} />,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <Calendar size={20} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings2 size={20} />,
  },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-full flex-col border-r p-4">
      <div className="flex items-center justify-center">
        <Image
          src="/static/icons/logo.svg"
          width={52}
          height={52}
          alt="logo"
          draggable={false}
        />
        <h1 className="hidden select-none font-head text-3xl sm:block">
          taskord
        </h1>
      </div>
      <nav className="mt-8 flex flex-col gap-3">
        {navItems.map((item, i) => (
          <Link href={item.path} key={i} passHref={true}>
            <Button
              variant={item.path === pathname ? "default" : "ghost"}
              className={cn(
                "w-full",
                item.path === pathname || "text-muted-foreground",
              )}
            >
              <div className="flex w-full items-center gap-3.5">
                {item.icon}
                <span className="text-[15px] font-semibold tracking-wide">
                  {item.name}
                </span>
              </div>
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
