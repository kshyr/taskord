export function pluralize(
  amount: number,
  word: string,
  pluralSuffix = "s",
  base = word,
) {
  if (amount === 1) {
    return word;
  }

  return base + pluralSuffix;
}

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
