//code
import { execFileSync } from "child_process";

export interface ScanResult {
  file: string;
  passed: boolean;
  unauthorized: boolean;
  output: string;
}

type ExecError = Error & { stdout?: string; stderr?: string; status?: number | null };

const SAFE_PATH = /^[\w./-]+$/;
const SCAN_VERSION = "snyk-agent-scan@0.6.0"; // pin explicitly

export function scanFile(file: string): ScanResult {
  if (!SAFE_PATH.test(file)) {
    return { file, passed: false, unauthorized: false, output: `unsafe filename: ${file}` };
  }

  try {
    const output = execFileSync("uvx", [SCAN_VERSION, "--skills", file, "--ci"], {
      encoding: "utf-8",
      stdio: ["inherit", "pipe", "pipe"],
      timeout: 5 * 60_000
    });
    process.stdout.write(output);
    const unauthorized = /\bunauthorized\b/i.test(output);
    return { file, passed: !unauthorized, unauthorized, output };
  } catch (e) {
    const err = e as ExecError;
    const output = (err.stdout ?? "") + (err.stderr ?? "");
    process.stderr.write(output);
    if (/no mcp servers or skills found/i.test(output)) {
      return { file, passed: true, unauthorized: false, output };
    }
    return { file, passed: false, unauthorized: false, output: output || err.message };
  }
}
