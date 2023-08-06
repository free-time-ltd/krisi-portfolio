import { v4 as uuidv4 } from "uuid";

export const generateFilename = () => {
  const str = uuidv4();

  return str.split("-").join("");
};

export const pluck = <T, K extends keyof T>(arr: T[], prop: K): T[K][] =>
  arr.map((item) => item[prop]);
