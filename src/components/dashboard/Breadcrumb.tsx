"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/src/utils/styles.utils";

export default function Breadcrumb() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {pathname
        .slice(1)
        .split("/")
        .map((path, index, paths) => (
          <>
            <Link
              href={`/${paths.slice(0, index + 1).join("/")}`}
              className={cn(
                index === paths.length - 1
                  ? "cursor-default"
                  : "text-muted-foreground",
                "font-head text-xl capitalize tracking-wider",
              )}
            >
              {path}
            </Link>
            {index === paths.length - 1 || (
              <span className="text-[22px] text-muted-foreground">/</span>
            )}
          </>
        ))}
    </div>
  );
}
