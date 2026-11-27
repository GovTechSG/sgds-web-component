#!/usr/bin/env bash
# Run both skill scanners (NVIDIA SkillSpector + Cisco skill-scanner) against a
# target skill/package and save SARIF output.
#
# Usage:
#   run-scan.sh <target-path> [static|full]
#
#   <target-path>  Path to a skill directory (contains SKILL.md directly), or
#                  a package directory with skills nested under skills/*
#                  (no top-level SKILL.md) — skill-scanner then runs
#                  scan-all --recursive instead of scan; skillspector handles
#                  both layouts as-is.
#   static (default)  No LLM: skillspector --no-llm, skill-scanner with no
#                      --use-llm/--use-behavioral/--use-virustotal flags.
#   full               LLM-enabled: skillspector with LLM env sourced from
#                      .env, skill-scanner --use-llm --use-behavioral
#                      --use-virustotal --detailed --llm-provider openai.
#
# Requires a .env in the current working directory (run `setup.sh` to create
# one from a template) with:
#   SKILLSPECTOR_PROVIDER, SKILLSPECTOR_MODEL, OPENAI_BASE_URL, OPENAI_API_KEY,
#   SKILL_SCANNER_LLM_API_KEY, SKILL_SCANNER_LLM_BASE_URL,
#   SKILL_SCANNER_LLM_MODEL, VIRUSTOTAL_API_KEY
#
# Repo root: the current working directory. Run this script from the
# directory that has (or should have) .env and .venv.
#
# Output: ./<target-basename>-nvidia-<mode>.sarif
#         ./<target-basename>-cisco-<mode>.sarif
#         ./<target-basename>-report-<mode>.md   (Markdown summary of both,
#                                                  built via aggregate-findings.jq)

set -euo pipefail

# Color output only when stderr is an interactive terminal (not when piped/redirected).
if [ -t 2 ]; then
  c_bold=$'\033[1m'; c_cyan=$'\033[36m'; c_green=$'\033[32m'; c_red=$'\033[31m'; c_reset=$'\033[0m'
else
  c_bold=; c_cyan=; c_green=; c_red=; c_reset=
fi

step() { printf '\n%s%s==>%s %s\n' "$c_bold" "$c_cyan" "$c_reset" "$*" >&2; }
ok()   { printf '%s✓%s %s\n' "$c_green" "$c_reset" "$*" >&2; }
die()  { printf '%serror:%s %s\n' "$c_red" "$c_reset" "$*" >&2; exit 1; }

usage() {
  echo "Usage: $0 <target-path> [static|full]" >&2
  exit 2
}

# Both scanners exit 1 when findings are present, which is expected, so exit
# code alone can't distinguish that from a genuine failure (e.g. skill-scanner
# also exits 1 when it can't find a SKILL.md). Requiring the output file to
# actually exist catches that case instead of falsely reporting "saved".
run_scan() {
  local desc=$1 out_file=$2
  shift 2
  set +e
  "$@"
  local ec=$?
  set -e
  if [ "$ec" -gt 1 ] && [ ! -s "$out_file" ]; then
    die "$desc exited with code $ec (no output file produced)"
  fi
  [ -s "$out_file" ] || die "$desc did not produce output at $out_file (exit code $ec) — see the scan output above for details"
  ok "saved $out_file"
}

[ $# -ge 1 ] || usage

target=$1
mode=${2:-static}

case "$mode" in
  static|full) ;;
  *) printf '%serror:%s mode must be '\''static'\'' or '\''full'\'', got '\''%s'\''\n' "$c_red" "$c_reset" "$mode" >&2; usage ;;
esac

[ -e "$target" ] || die "target path not found: $target"

# aggregate-findings.jq lives next to this script.
script_dir=$(cd "$(dirname "$0")" && pwd)
jq_filter="$script_dir/aggregate-findings.jq"
[ -f "$jq_filter" ] || die "aggregate-findings.jq not found at $jq_filter"
command -v jq >/dev/null 2>&1 || die "jq is required"

repo_root="$PWD"
out_dir="$repo_root"
name=$(basename "$target")

env_file="$repo_root/.env"
# .env is optional: in the CI image, env vars come from CI/CD variables
if [ -f "$env_file" ]; then
  set -a
  source "$env_file"
  set +a
fi

command -v skillspector >/dev/null 2>&1 || die "skillspector not found on PATH"
skill_scanner="$repo_root/.venv/bin/skill-scanner"
# Fall back to PATH (the CI image installs skill-scanner globally).
[ -x "$skill_scanner" ] || skill_scanner=$(command -v skill-scanner || true)
[ -n "$skill_scanner" ] && [ -x "$skill_scanner" ] || die "skill-scanner not found in $repo_root/.venv or on PATH"

# LLM/VirusTotal env vars are only required in full mode; static mode uses
# --no-llm / omits --use-llm|--use-virustotal so none of these are read.
if [ "$mode" = full ]; then
  required_vars=(SKILLSPECTOR_PROVIDER SKILLSPECTOR_MODEL OPENAI_API_KEY OPENAI_BASE_URL
                 SKILL_SCANNER_LLM_API_KEY SKILL_SCANNER_LLM_BASE_URL SKILL_SCANNER_LLM_MODEL
                 VIRUSTOTAL_API_KEY)
  missing=()
  for var in "${required_vars[@]}"; do
    [ -n "${!var:-}" ] || missing+=("$var")
  done
  if [ ${#missing[@]} -gt 0 ]; then
    die "full mode requires these env vars (missing from $env_file): ${missing[*]}"
  fi
fi

nvidia_out="$out_dir/${name}-nvidia-${mode}.sarif"
cisco_out="$out_dir/${name}-cisco-${mode}.sarif"

# Build per-scanner flags once so the mode-specific differences live in a
# single place instead of being duplicated across the two run_scan calls.
skillspector_flags=(-f sarif -o "$nvidia_out")
skill_scanner_flags=(--format sarif -o "$cisco_out")
if [ "$mode" = static ]; then
  skillspector_flags=(--no-llm "${skillspector_flags[@]}")
else
  skill_scanner_flags=(--use-llm --use-behavioral --use-virustotal --detailed --llm-provider openai "${skill_scanner_flags[@]}")
fi

# skill-scanner's `scan` requires $target to directly contain SKILL.md; a
# package directory with skills nested under skills/* needs `scan-all
# --recursive` instead. skillspector handles both layouts via plain `scan`.
if [ -f "$target/SKILL.md" ]; then
  skill_scanner_subcmd=(scan "$target")
else
  skill_scanner_subcmd=(scan-all "$target" --recursive)
  step "no top-level SKILL.md in $target — using skill-scanner scan-all --recursive"
fi

step "[$mode] skillspector scan: $target"
run_scan "skillspector" "$nvidia_out" skillspector scan "$target" "${skillspector_flags[@]}"

step "[$mode] skill-scanner scan: $target"
run_scan "skill-scanner" "$cisco_out" "$skill_scanner" "${skill_scanner_subcmd[@]}" "${skill_scanner_flags[@]}"

report_out="$out_dir/${name}-report-${mode}.md"
step "Generating aggregate report..."
jq -s -r --arg sources "$nvidia_out, $cisco_out" -f "$jq_filter" "$nvidia_out" "$cisco_out" > "$report_out"
ok "saved $report_out"
echo >&2
cat "$report_out"
