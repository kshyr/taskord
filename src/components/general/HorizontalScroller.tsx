import { HTMLAttributes, useEffect, useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/src/utils/styles.utils.ts";

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function HorizontalScroller({
  children,
  className,
}: HorizontalScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRightButtonDown, setIsRightButtonDown] = useState<boolean>(false);
  const [initialX, setInitialX] = useState<number>(0);
  const [lastScrollLeft, setLastScrollLeft] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) {
      setIsRightButtonDown(true);
      setInitialX(e.clientX);
      if (containerRef.current) {
        setLastScrollLeft(containerRef.current.scrollLeft);
      }
    }
  };

  const handleMouseUp = () => {
    setIsRightButtonDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isRightButtonDown && containerRef.current) {
      const dx = e.clientX - initialX;
      containerRef.current.scrollLeft = lastScrollLeft - dx;
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ overflow: "auto", whiteSpace: "nowrap" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onContextMenu={handleContextMenu}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
