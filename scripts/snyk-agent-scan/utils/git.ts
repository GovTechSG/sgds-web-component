import { execFileSync } from "child_process";

export function getChangedFiles(baseSha: string, paths: string[]): string[] {
  if (!/^[0-9a-fA-F]{7,64}$/.test(baseSha)) {
    throw new Error(`Invalid git SHA: ${baseSha}`);
  }
  const args = ["diff", "--name-only", "--diff-filter=AM", baseSha, "--", ...paths];
  const output = execFileSync("git", args, { encoding: "utf-8" }).trim();
  if (!output) return [];
  return output.split("\n").filter(Boolean);
}
