import { StatusValue } from "@/src/types/types.ts";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  CircleDashed,
  LucideIcon,
  XCircle,
} from "lucide-react";
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
    className: "min-w-max",
  },
};
