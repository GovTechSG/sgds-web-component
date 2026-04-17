import { execSync } from "child_process";

export interface ScanResult {
  file: string;
  passed: boolean;
  unauthorized?: boolean;
  output: string;
}

export function scanFile(file: string): ScanResult {
  try {
    const output = execSync(
      `uvx snyk-agent-scan@latest --skills "${file}" --ci`,
      { encoding: "utf-8", stdio: ["inherit", "pipe", "pipe"] },
    );
    process.stdout.write(output);
    if (output.toLowerCase().includes("unauthorized")) {
      return { file, passed: false, unauthorized: true, output };
    }
    return { file, passed: true, output };
  } catch (err) {
    const output =
      ((err as { stdout?: string }).stdout ?? "") +
      ((err as { stderr?: string }).stderr ?? "");
    process.stdout.write(output);
    if (output.includes("no mcp servers or skills found")) {
      return { file, passed: true, output };
    }
    return { file, passed: false, output };
  }
}
