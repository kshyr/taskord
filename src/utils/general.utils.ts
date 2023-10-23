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

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
