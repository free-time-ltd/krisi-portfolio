export const pluck = <T, K extends keyof T>(array: T[], key: K): T[K][] =>
  array.map((o) => o[key]);

export const unique = (array: string[]): string[] =>
  Array.from(new Set([...array]));

export const arrContainsStr = (
  array: string[],
  searchElement: string
): boolean => array.filter((value) => searchElement.includes(value)).length > 0;
