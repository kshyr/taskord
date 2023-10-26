import { useDroppable } from "@dnd-kit/core";

export function DroppableColumn(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full">
      {props.children}
    </div>
  );
}
