#!/usr/bin/env bash
# Fresh-machine bootstrap for the two skill scanners used by run-scan.sh in
# this directory:
#   - NVIDIA SkillSpector   https://github.com/nvidia/skillspector
#   - Cisco skill-scanner   https://github.com/cisco-ai-defense/skill-scanner
#
# Usage:
#   bash setup.sh [repo-root]
#
#   [repo-root]  Optional. Defaults to the current working directory. Run
#                this from the repo you want to set up, or pass the path.
#
# What it does (each step checks first, so it's safe to re-run):
#   1. Installs git, jq (via Homebrew on macOS, apt/dnf on Linux) if missing.
#   2. Installs uv (https://docs.astral.sh/uv/) if missing.
#   3. Installs skillspector on PATH via `uv tool install`.
#   4. Installs skill-scanner into <repo-root>/.venv (where run-scan.sh expects it).
#   5. Creates a starter .env at <repo-root>/.env for full-mode (LLM/VirusTotal) scans.
#
# Static-mode scans (`run-scan.sh <target> static`) work with no API keys.
# Full-mode scans need the keys filled in .env.

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
repo_root="${1:-$PWD}"
[ -d "$repo_root" ] || { echo "error: repo root does not exist: $repo_root" >&2; exit 1; }

echo "==> Repo root: $repo_root"

os=$(uname -s)

have() { command -v "$1" >/dev/null 2>&1; }

_maybe_sudo() {
  if [ "$(id -u)" -eq 0 ]; then "$@"; else sudo "$@"; fi
}

install_pkg() {
  local pkg=$1
  case "$os" in
    Darwin)
      have brew || {
        echo "error: Homebrew not found. Install it from https://brew.sh, then re-run this script." >&2
        exit 1
      }
      brew install "$pkg"
      ;;
    Linux)
      if have apt-get; then
        _maybe_sudo apt-get update -y && _maybe_sudo apt-get install -y "$pkg"
      elif have dnf; then
        _maybe_sudo dnf install -y "$pkg"
      else
        echo "error: no supported package manager (apt-get/dnf) found. Install $pkg manually." >&2
        exit 1
      fi
      ;;
    *)
      echo "error: unsupported OS '$os'. Install $pkg manually." >&2
      exit 1
      ;;
  esac
}

# Install a CLI tool via install_pkg unless it's already on PATH.
ensure_cmd() {
  local cmd=$1
  if have "$cmd"; then
    echo "✓ $cmd found"
  else
    echo "==> Installing $cmd..."
    install_pkg "$cmd"
  fi
}

# ---- git (needed to `uv tool install git+...`) and jq (needed by run-scan.sh's report step) ----
ensure_cmd git
ensure_cmd jq

# ---- uv ----
if have uv; then
  echo "✓ uv found"
else
  echo "==> Installing uv..."
  if [ "$os" = Darwin ] && have brew; then
    brew install uv
  else
    _uv_installer=$(mktemp)
    trap 'rm -f "$_uv_installer"' EXIT
    curl -LsSf https://astral.sh/uv/install.sh -o "$_uv_installer"
    sh "$_uv_installer"
    export PATH="$HOME/.local/bin:$PATH"
  fi
  have uv || {
    echo "error: uv install failed. See https://docs.astral.sh/uv/getting-started/installation/" >&2
    exit 1
  }
fi

# ---- Python 3.12 (skillspector needs 3.12+; skill-scanner supports 3.11-3.14) ----
echo "==> Ensuring Python 3.12 is available to uv..."
uv python install 3.12

# ---- skillspector (NVIDIA) ----
if have skillspector; then
  echo "✓ skillspector found on PATH"
else
  echo "==> Installing skillspector..."
  uv tool install git+https://github.com/NVIDIA/skillspector.git
fi

# ---- skill-scanner (Cisco) ----
venv_dir="$repo_root/.venv"
scanner="$venv_dir/bin/skill-scanner"
if [ -x "$scanner" ]; then
  echo "✓ skill-scanner found at $scanner"
else
  echo "==> Installing skill-scanner into $venv_dir..."
  uv venv "$venv_dir" --python 3.12 --quiet
  uv pip install --python "$venv_dir/bin/python" cisco-ai-skill-scanner
  echo "✓ skill-scanner installed at $scanner"
fi

# ---- .env (only read by run-scan.sh in `full` mode) ----
env_file="$repo_root/.env"
if [ -f "$env_file" ]; then
  echo "✓ .env already exists at $env_file"
else
  cat > "$env_file" <<'EOF'
# Scan env vars — required for full mode only.
# Static mode only needs .venv/bin/skill-scanner and skillspector on PATH.
# Fill in every value marked with  # <-- fill in  before running a full scan.

# ── SkillSpector (NVIDIA) ──────────────────────────────────────────────────
export SKILLSPECTOR_PROVIDER=openai
export SKILLSPECTOR_MODEL=bedrock.claude-sonnet-4-6
export OPENAI_BASE_URL=https://api.ai.tech.gov.sg/platform/models/v1
export OPENAI_API_KEY=                          # <-- fill in

# ── Cisco skill-scanner ────────────────────────────────────────────────────
export SKILL_SCANNER_LLM_BASE_URL=https://api.ai.tech.gov.sg/platform/models/v1
export SKILL_SCANNER_LLM_MODEL=openai/bedrock.claude-sonnet-4-6
export SKILL_SCANNER_LLM_API_KEY=               # <-- fill in

# ── VirusTotal ─────────────────────────────────────────────────────────────
export VIRUSTOTAL_API_KEY=                      # <-- fill in
EOF
  echo "Created $env_file — fill in the keys marked '# <-- fill in' before running a 'full' mode scan."
fi

echo ""
echo "Setup complete."
echo "Next: $script_dir/run-scan.sh <target-path> [static|full]"
