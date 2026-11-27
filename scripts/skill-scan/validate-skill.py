#!/usr/bin/env python3
"""Validate an agent skill directory against the agentskills.io spec.

Usage: python3 validate-skill.py <skill-directory>

Exit 0 on PASS (warnings OK), 1 on FAIL (errors found), 2 on usage error.
"""

import os
import re
import sys

# --- Constants ---

BANNED_FILES = {"README.md", "CHANGELOG.md", "INSTALLATION_GUIDE.md"}
ALLOWED_SUBDIRS = {"references", "scripts", "assets", "evals"}
MAX_SKILL_LINES = 500
MAX_DESCRIPTION_CHARS = 1024
MAX_CODE_BLOCK_LINES = 50
MAX_CONSTRAINT_DIRECTIVES = 15
CODEX_BODY_CAP_BYTES = 8192
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
FIRST_PERSON_WORDS = {"i", "me", "my", "we", "our", "you", "your"}

CONSTRAINT_DIRECTIVE_RE = re.compile(r"\b(MUST|ALWAYS|NEVER)\b")

FILE_REF_RE = re.compile(
    r"(?:references|scripts|assets)/[a-zA-Z0-9._-]{2,}\.[a-zA-Z0-9]+"
)
# Matches cross-skill references like ../sgds-blocks/references/file.md
CROSS_SKILL_REF_RE = re.compile(
    r"\.\./[a-zA-Z0-9._-]+/(?:references|scripts|assets)/[a-zA-Z0-9._-]{2,}\.[a-zA-Z0-9]+"
)


# --- Frontmatter parsing ---


def parse_frontmatter_regex(text):
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    block = m.group(1)
    result = {}
    nm = re.search(r"^name:\s*(.+)$", block, re.MULTILINE)
    if nm:
        result["name"] = nm.group(1).strip().strip("\"'")
    dm = re.search(r'^description:\s*"((?:[^"\\]|\\.)*)"', block, re.MULTILINE)
    if not dm:
        dm = re.search(r"^description:\s*(.+)$", block, re.MULTILINE)
    if dm:
        result["description"] = dm.group(1).strip().strip("\"'")
    return result


def parse_frontmatter(text):
    try:
        import yaml

        m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
        if not m:
            return {}
        return yaml.safe_load(m.group(1)) or {}
    except ImportError:
        return parse_frontmatter_regex(text)


# --- Check functions ---


def check_structure(skill_dir, content, lines):
    errors = []
    warnings = []
    dir_name = os.path.basename(skill_dir)

    if len(lines) > MAX_SKILL_LINES:
        errors.append(
            f"[structure] SKILL.md has {len(lines)} lines (max {MAX_SKILL_LINES})"
        )

    fm = parse_frontmatter(content)
    if not fm:
        errors.append(
            "[structure] frontmatter missing or unparseable (expected --- block at top)"
        )
        return errors, warnings, {}

    name = fm.get("name", "")
    description = fm.get("description", "")

    if name != dir_name:
        errors.append(
            f"[structure] name '{name}' does not match directory '{dir_name}'"
        )
    if not name or not NAME_RE.match(name) or len(name) > 64:
        errors.append(
            f"[structure] name '{name}' must be 1-64 chars, kebab-case, no consecutive hyphens"
        )
    if not description.startswith("Use when"):
        errors.append("[structure] description must start with 'Use when'")
    if len(description) > MAX_DESCRIPTION_CHARS:
        errors.append(
            f"[structure] description is {len(description)} chars (max {MAX_DESCRIPTION_CHARS})"
        )

    for fname in BANNED_FILES:
        if os.path.isfile(os.path.join(skill_dir, fname)):
            errors.append(f"[structure] banned file found: {fname}")

    for entry in os.scandir(skill_dir):
        if not entry.is_dir() or entry.name.startswith("."):
            continue
        if entry.name not in ALLOWED_SUBDIRS:
            errors.append(
                f"[structure] unexpected subdirectory '{entry.name}' "
                f"(allowed: {', '.join(sorted(ALLOWED_SUBDIRS))})"
            )
            continue

    max_block = _longest_code_block(content)
    if max_block > MAX_CODE_BLOCK_LINES:
        warnings.append(
            f"[structure] largest code block is {max_block} lines (recommended max {MAX_CODE_BLOCK_LINES})"
        )

    desc_words = set(re.findall(r"\b\w+\b", description.lower()))
    found = FIRST_PERSON_WORDS.intersection(desc_words)
    if found:
        warnings.append(
            f"[metadata] description contains first/second person terms: {sorted(found)}"
        )

    return errors, warnings, fm


def _strip_code_blocks(text):
    return re.sub(r"```.*?```", "", text, flags=re.DOTALL)


def check_anti_patterns(skill_dir, content):
    warnings = []

    directive_count = len(CONSTRAINT_DIRECTIVE_RE.findall(_strip_code_blocks(content)))
    if directive_count > MAX_CONSTRAINT_DIRECTIVES:
        warnings.append(
            f"[anti-pattern] OVER_CONSTRAINED: {directive_count} MUST/ALWAYS/NEVER "
            f"directives (threshold: {MAX_CONSTRAINT_DIRECTIVES})"
        )

    has_references = os.path.isdir(os.path.join(skill_dir, "references"))
    body_bytes = len(content.encode("utf-8"))
    if body_bytes > CODEX_BODY_CAP_BYTES and not has_references:
        warnings.append(
            f"[anti-pattern] SKILL_OVER_CODEX_CAP: SKILL.md is {body_bytes} bytes "
            f"without references/ directory (Codex truncates at {CODEX_BODY_CAP_BYTES})"
        )

    prose = _strip_code_blocks(content)
    # Collect cross-skill refs (../other-skill/references/file.md) to exclude
    cross_skill_basenames = set()
    for xref in CROSS_SKILL_REF_RE.findall(prose):
        # Extract the references/file.md portion
        match = FILE_REF_RE.search(xref)
        if match:
            cross_skill_basenames.add(match.group())
    refs_in_text = set(FILE_REF_RE.findall(prose))
    for ref in sorted(refs_in_text):
        if ref in cross_skill_basenames:
            continue  # Skip cross-skill references — they live in another skill
        ref_path = os.path.join(skill_dir, ref)
        if not os.path.exists(ref_path):
            warnings.append(f"[anti-pattern] ORPHAN_REFERENCE: {ref} not found on disk")

    return warnings


def check_portability(content):
    warnings = []
    claude_tools = re.findall(
        r"`(Bash|Read|Edit|Write|Glob|Grep|Agent|WebFetch|WebSearch|LSP|NotebookEdit)`",
        content,
    )
    if claude_tools:
        unique = sorted(set(claude_tools))
        warnings.append(
            f"[portability] CLAUDE_SPECIFIC_TOOLS: references {', '.join(unique)} "
            "(Claude-only tool names)"
        )
    return warnings


# --- Helpers ---


def _longest_code_block(text):
    max_lines = 0
    in_block = False
    current = 0
    for line in text.splitlines():
        if re.match(r"^```", line):
            if in_block:
                max_lines = max(max_lines, current)
                in_block = False
                current = 0
            else:
                in_block = True
                current = 0
        elif in_block:
            current += 1
    if in_block:
        max_lines = max(max_lines, current)
    return max_lines


# --- Main ---


def validate(skill_dir):
    skill_dir = os.path.abspath(skill_dir)
    skill_md = os.path.join(skill_dir, "SKILL.md")

    if not os.path.isfile(skill_md):
        return ["[structure] SKILL.md not found"], []

    with open(skill_md, encoding="utf-8") as f:
        content = f.read()
    lines = content.splitlines()

    all_errors = []
    all_warnings = []

    struct_errors, struct_warnings, fm = check_structure(skill_dir, content, lines)
    all_errors.extend(struct_errors)
    all_warnings.extend(struct_warnings)

    all_warnings.extend(check_anti_patterns(skill_dir, content))
    all_warnings.extend(check_portability(content))

    return all_errors, all_warnings


def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <skill-directory>", file=sys.stderr)
        sys.exit(2)

    skill_dir = sys.argv[1]
    errors, warnings = validate(skill_dir)

    print(f"validate-skill v2.0 — {skill_dir}\n")

    if errors:
        print(f"ERRORS ({len(errors)}):")
        for e in errors:
            print(f"  {e}")
        print()

    if warnings:
        print(f"WARNINGS ({len(warnings)}):")
        for w in warnings:
            print(f"  {w}")
        print()

    print(f"SCORE: {len(errors)} errors, {len(warnings)} warnings")
    print("EXIT: FAIL" if errors else "EXIT: PASS")

    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
