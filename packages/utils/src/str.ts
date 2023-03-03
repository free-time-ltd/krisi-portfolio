import { v4 as uuidv4 } from "uuid";

export const generateFilename = () => {
  const str = uuidv4();

  return str.split("-").join("");
};
