/*!
 * Script to generate SRI hashes for use in our docs.
 */
import crypto from "node:crypto";
import fs from "fs/promises";

const generateSri = async (file) => {
  const data = await fs.readFile(file);
  const algorithm = "sha384";
  const hash = crypto.createHash(algorithm).update(data).digest("base64");
  return `${algorithm}-${hash}`;
};
 
export default generateSri