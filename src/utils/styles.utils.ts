import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TailwindPriorityColor =
  | "text-success-border"
  | "text-warning-border"
  | "text-error-border";

export const colorToTailwindMap: Record<
  "red" | "green" | "yellow",
  TailwindPriorityColor
> = {
  red: "text-error-border",
  green: "text-success-border",
  yellow: "text-warning-border",
};
