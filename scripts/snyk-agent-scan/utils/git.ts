import { execSync } from "child_process";

export function getChangedFiles(baseSha: string, paths: string[]): string[] {
  const pathArgs = paths.map((p) => `-- ${p}`).join(" ");
  const cmd = `git diff --name-only --diff-filter=AM ${baseSha} ${pathArgs}`;
  const output = execSync(cmd, { encoding: "utf-8" }).trim();
  if (!output) return [];
  return output.split("\n").filter(Boolean);
}
