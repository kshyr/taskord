import type { LucideIcon } from "lucide-react";
import {
  ArrowUpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDashed,
  Equal,
  XCircle,
} from "lucide-react";
import { StatusValue, PriorityValue } from "@/src/types/types.ts";
import { HTMLAttributes } from "react";

export type Status = {
  value: StatusValue;
  label: string;
  icon: LucideIcon;
  className: HTMLAttributes<HTMLDivElement>["className"];
};

const statuses: Status[] = [
  {
    value: StatusValue.BACKLOG,
    label: "Backlog",
    icon: CircleDashed,
    className: "",
  },
  {
    value: StatusValue.TODO,
    label: "Todo",
    icon: Circle,
    className: "text-primary-border",
  },
  {
    value: StatusValue.IN_PROGRESS,
    label: "In Progress",
    icon: ArrowUpCircle,
    className: "text-warning-border",
  },
  {
    value: StatusValue.DONE,
    label: "Done",
    icon: CheckCircle2,
    className: "text-success-border",
  },
  {
    value: StatusValue.CANCELED,
    label: "Canceled",
    icon: XCircle,
    className: "text-error-border",
  },
];

export const statusItems = {
  statuses,
  statusValues: statuses.map((status) => status.value),
  defaults: {
    iconSize: 20,
  },
};

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
  },
};
