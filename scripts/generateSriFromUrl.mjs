/*!
 * Script to generate SRI hashes from a remote URL.
 */
import crypto from "node:crypto";

const generateSriFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer);
  const algorithm = "sha384";
  const hash = crypto.createHash(algorithm).update(data).digest("base64");
  return `${algorithm}-${hash}`;
};

export default generateSriFromUrl;
