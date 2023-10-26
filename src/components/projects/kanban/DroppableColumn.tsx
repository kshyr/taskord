import { useDroppable } from "@dnd-kit/core";
import { StatusValue, Task } from "@/src/types/types.ts";
import { ReactNode } from "react";

type DroppableColumnProps = {
  status: StatusValue;
  children: ReactNode;
};

export function DroppableColumn({ status, children }: DroppableColumnProps) {
  const { isOver, setNodeRef, active, over } = useDroppable({
    id: status,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex h-full flex-col gap-2">
      {children}
    </div>
  );
}
