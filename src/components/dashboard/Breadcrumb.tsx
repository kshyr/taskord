"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/src/utils/styles.utils";
import { Fragment } from "react";

type BreadcumbProps = {
  projectNameIds?: { id: string; name: string }[];
};

export default function Breadcrumb({ projectNameIds }: BreadcumbProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full gap-2">
      {pathname
        .slice(1)
        .split("/")
        .map((path, index, paths) => (
          <Fragment key={"bread-" + path + index}>
            <Link
              href={`/${paths.slice(0, index + 1).join("/")}`}
              className={cn(
                index === paths.length - 1
                  ? "cursor-default"
                  : "text-muted-foreground",
                index === 0 && "capitalize",
                "font-head text-2xl tracking-wider",
              )}
            >
              {index === 1
                ? projectNameIds?.find((p) => p.id === path)?.name ?? ""
                : path}
            </Link>
            {index === paths.length - 1 || (
              <span className="select-none text-[22px] text-muted-foreground">
                /
              </span>
            )}
          </Fragment>
        ))}
    </div>
  );
}
