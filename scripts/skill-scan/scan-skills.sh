#!/usr/bin/env bash
# Scan skills with NVIDIA SkillSpector + Cisco skill-scanner (static mode).
#
# Usage: scan-skills.sh [skills-root]
#
# Environment:
#   GIT_BASE_SHA  — if set, only scan skills whose files changed since that
#                   commit. Otherwise scan all skills.
#
# Output: SARIF + Markdown reports in the current directory.
# Exit 0 on success (findings are advisory, not failures).
# Exit 1 only on scanner setup/crash errors.

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
run_scan="$script_dir/run-scan.sh"

skills_root="${1:-skills}"

if [ ! -d "$skills_root" ]; then
  echo "error: skills root not found: $skills_root" >&2
  exit 2
fi

# Collect skills to scan.
skills=()

if [ -n "${GIT_BASE_SHA:-}" ]; then
  echo "==> Detecting changed skills since $GIT_BASE_SHA..."
  # Get changed files under skills_root, walk up to find SKILL.md parent.
  changed_files=$(git diff --name-only "$GIT_BASE_SHA"...HEAD -- "$skills_root" 2>/dev/null || true)
  if [ -z "$changed_files" ]; then
    echo "No skill files changed. Nothing to scan."
    exit 0
  fi

  # Deduplicate: map each changed file to its skill directory.
  declare -A seen
  while IFS= read -r file; do
    # Walk up from the changed file to find the skill directory (parent of SKILL.md).
    dir=$(dirname "$file")
    while [ "$dir" != "." ] && [ "$dir" != "/" ]; do
      if [ -f "$dir/SKILL.md" ]; then
        if [ -z "${seen[$dir]:-}" ]; then
          seen[$dir]=1
          skills+=("$dir")
        fi
        break
      fi
      dir=$(dirname "$dir")
    done
  done <<< "$changed_files"
else
  echo "==> No GIT_BASE_SHA set. Scanning all skills..."
  for skill_dir in "$skills_root"/*/; do
    [ -f "$skill_dir/SKILL.md" ] || continue
    skills+=("${skill_dir%/}")
  done
fi

if [ ${#skills[@]} -eq 0 ]; then
  echo "No skills to scan."
  exit 0
fi

echo "==> Skills to scan: ${skills[*]}"
echo ""

errors=0
for skill in "${skills[@]}"; do
  echo "=============================="
  echo "Scanning: $skill"
  echo "=============================="
  if ! bash "$run_scan" "$skill" static; then
    errors=$((errors + 1))
    echo "warning: scan failed for $skill (continuing)" >&2
  fi
  echo ""
done

echo "============================="
echo "Scanned ${#skills[@]} skills, $errors scanner errors"
echo "============================="

# Scanner errors (not findings) are real failures.
if [ "$errors" -gt 0 ]; then
  exit 1
fi

exit 0
