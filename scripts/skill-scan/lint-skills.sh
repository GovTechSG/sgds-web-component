#!/usr/bin/env bash
# Lint all skills under a root directory using validate-skill.py.
#
# Usage: lint-skills.sh [skills-root]   (default: skills/)
# Exit 0 if all pass, 1 if any fail.

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
validator="$script_dir/validate-skill.py"

skills_root="${1:-skills}"

if [ ! -d "$skills_root" ]; then
  echo "error: skills root not found: $skills_root" >&2
  exit 2
fi

failed=0
total=0

for skill_dir in "$skills_root"/*/; do
  [ -f "$skill_dir/SKILL.md" ] || continue
  total=$((total + 1))

  echo "--- $(basename "$skill_dir") ---"
  if ! python3 "$validator" "$skill_dir"; then
    failed=$((failed + 1))
  fi
  echo ""
done

echo "============================="
echo "Total: $total skills, $failed failed"
echo "============================="

if [ "$failed" -gt 0 ]; then
  echo "EXIT: FAIL"
  exit 1
fi

echo "EXIT: PASS"
exit 0
