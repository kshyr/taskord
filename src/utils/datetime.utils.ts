import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from "date-fns";
import {
  colorToTailwindMap,
  TailwindPriorityColor,
} from "@/src/utils/styles.utils.ts";

type RemainingTimeResult = {
  time: string;
  twColor: TailwindPriorityColor;
};

export const getRemainingTime = (dueDate: string): RemainingTimeResult => {
  const now = new Date();
  const targetDate = parseISO(dueDate);

  const diffMinutes = differenceInMinutes(targetDate, now);
  if (diffMinutes < 0) return { time: "0m", twColor: "text-error-border" };
  const diffHours = differenceInHours(targetDate, now);
  const diffDays = differenceInDays(targetDate, now);
  const diffWeeks = differenceInWeeks(targetDate, now);
  const diffMonths = differenceInMonths(targetDate, now);
  const diffYears = differenceInYears(targetDate, now);

  if (diffMinutes < 60) {
    return { time: `${diffMinutes}m`, twColor: colorToTailwindMap.red };
  }
  if (diffHours < 6) {
    return { time: `${diffHours}h`, twColor: colorToTailwindMap.red };
  }
  if (diffHours < 24) {
    return { time: `${diffHours}h`, twColor: colorToTailwindMap.yellow };
  }
  if (diffDays < 7) {
    return { time: `${diffDays}d`, twColor: colorToTailwindMap.green };
  }
  if (diffWeeks < 4) {
    return { time: `${diffWeeks}w`, twColor: colorToTailwindMap.green };
  }
  if (diffMonths < 12) {
    return { time: `${diffMonths}mo`, twColor: colorToTailwindMap.green };
  }

  return { time: `${diffYears}y`, twColor: colorToTailwindMap.green };
};
