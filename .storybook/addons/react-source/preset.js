import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const managerEntries = (entry = []) => {
  return [...entry, path.resolve(__dirname, "./manager")];
};
