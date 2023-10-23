"use client";
import React, { useState, useEffect, useRef, JSX, ReactNode } from "react";
import { Project } from "@/src/types/types.ts";
import { Badge } from "@/src/components/ui/badge";
import { debounce } from "@/src/utils/general.utils.ts";

function Tag({ children, key }: { children: ReactNode; key?: string }) {
  return (
    <Badge
      key={key}
      variant="outline"
      className="text-sm text-muted-foreground shadow-inner"
    >
      {children}
    </Badge>
  );
}

const ProjectCardTags = ({ tags }: { tags: string[] }) => {
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

    return () => {
      window.removeEventListener("resize", updateVisibleTags);
    };
  }, [tags]);

  return (
    <div className="mt-2 flex w-full justify-end gap-2" ref={containerRef}>
      {visibleTags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      {visibleTags.length < tags.length && (
        <Tag>+{tags.length - visibleTags.length}</Tag>
      )}
    </div>
  );
};
export default ProjectCardTags;
