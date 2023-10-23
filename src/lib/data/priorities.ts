import { PriorityValue } from "@/src/types/types.ts";
import { ChevronDown, ChevronUp, Equal, LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

export type Priority = {
  value: PriorityValue;
  label: string;
  icon: LucideIcon;
  className: HTMLAttributes<HTMLElement>["className"];
};

const priorities: Priority[] = [
  {
    value: PriorityValue.HIGH,
    label: "High",
    icon: ChevronUp,
    className: "text-error-border",
  },
  {
    value: PriorityValue.MEDIUM,
    label: "Medium",
    icon: Equal,
    className: "text-warning-border",
  },
  {
    value: PriorityValue.LOW,
    label: "Low",
    icon: ChevronDown,
    className: "text-success-border",
  },
];

export const priorityItems = {
  priorities,
  priorityValues: priorities.map((priority) => priority.value),
  defaults: {
    iconSize: 20,
    className: "min-w-max",
  },
};
