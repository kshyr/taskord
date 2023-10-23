"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/utils/styles.utils.ts";

function Tag({
  children,
  key,
  loading,
}: {
  children: ReactNode;
  key?: string;
  loading?: boolean;
}) {
  return (
    <Badge
      key={key}
      variant="outline"
      className={cn(
        "cursor-pointer text-sm text-muted-foreground shadow-inner",
        "hover:border-muted-foreground hover:text-foreground",
        loading && "animate-pulse",
      )}
    >
      {children}
    </Badge>
  );
}

const ProjectCardTags = ({ tags }: { tags?: string[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  useEffect(() => {
    if (!tags || tags.length === 0) return;

    const updateVisibleTags = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let usedWidth = 0;
      let lastIndex = tags.length;

      for (let i = 0; i < tags.length; i++) {
        const span = document.createElement("span");
        span.textContent = tags[i];
        document.body.appendChild(span);
        const tagWidth = span.offsetWidth;
        document.body.removeChild(span);

        const estimatedBadgeWidth = 100;
        const badgeWidth = i === tags.length - 1 ? 0 : estimatedBadgeWidth;

        if (usedWidth + tagWidth + badgeWidth > containerWidth) {
          lastIndex = i;
          break;
        }

        usedWidth += tagWidth;
      }

      setVisibleTags(tags.slice(0, lastIndex));
    };

    updateVisibleTags();
    window.addEventListener("resize", updateVisibleTags);
    setIsMounted(true);

    return () => {
      window.removeEventListener("resize", updateVisibleTags);
    };
  }, [tags, isMounted]);

  return (
    <div className="mt-2 flex w-full justify-end gap-2" ref={containerRef}>
      {!isMounted ? (
        <Tag loading>...</Tag>
      ) : (
        <>
          {visibleTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags && visibleTags.length < tags.length && (
            <Tag>+{tags.length - visibleTags.length}</Tag>
          )}
        </>
      )}
    </div>
  );
};
export default ProjectCardTags;
