"use client";
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
import { useState } from "react";

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
  const [targetNavPath, setTargetNavPath] = useState(pathname);
  const navPath = pathname.slice(1).split("/")[0];

  return (
    <nav className="flex flex-col gap-3">
      {navItems.map((item, i) => {
        const isActive = item.path.slice(1) === navPath;
        const isLoading = item.path.slice(1) === targetNavPath && !isActive;

        return (
          <Link href={item.path} key={i} passHref={true}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full",
                isActive || "text-muted-foreground",
                isLoading && "animate-pulse",
              )}
              onClick={() => setTargetNavPath(item.path.slice(1))}
            >
              <div className="flex w-full items-center gap-3.5">
                {item.icon}
                <span className="text-[15px] font-semibold tracking-wide">
                  {item.name}
                </span>
              </div>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

export default Sidebar;
