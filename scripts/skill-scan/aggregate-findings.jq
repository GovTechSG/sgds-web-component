# Consolidate SARIF 2.1.0 findings (from any vendor) into a per-file Markdown
# summary. Invoked by run-scan.sh via `jq -s -r --arg sources ... -f`.
#
# What's read from the SARIF (no vendor-specific assumptions):
#   Tool name   runs[].tool.driver.name
#   File path   runs[].results[].locations[].physicalLocation.artifactLocation.uri
#   Rule ID     runs[].results[].ruleId
#   Rule desc   runs[].results[].properties.pattern  (when present)
#                 falls back to tool.driver.rules[?(.id==ruleId)].shortDescription.text
#   Severity    runs[].results[].properties.severity  (vendor field)
#                 falls back to .level (SARIF spec field)
#   Line        runs[].results[].locations[].physicalLocation.region.startLine
#
# Path normalization: per-tool longest common prefix is stripped, so the same
# physical file emitted with different scan-root prefixes by different tools
# (e.g. "packages-src/.../SKILL.md" vs "skills/.../SKILL.md") groups together.

# ---- Fixed lookups (edit here to extend) ----

def sev_rank:
  { "CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1, "INFO": 0, "NONE": 0,
    "error":    3, "warning": 2, "note":  1, "none": 0
  }[.] // 0;

def rank_label:
  { "4": "CRITICAL", "3": "HIGH", "2": "MEDIUM", "1": "LOW", "0": "INFO"
  }[tostring] // "INFO";

# Truncate long descriptions (some vendors put full explanations in
# rule.shortDescription instead of a short pattern label).
def trunc($n):
  if . == null then null
  elif (length <= $n) then .
  else (.[0:$n] | rtrimstr(" ")) + "\u2026"
  end;

# Tool display alias. Tools not listed use their raw tool.driver.name.
def tool_display:
  { "skillspector":  "NVIDIA SkillSpector",
    "skill-scanner": "Cisco skill-scanner"
  }[.] // .;

# ---- Path normalization ----
# Longest common prefix (in "/"-separated segments) across an array of paths.
# Always keeps at least the trailing filename segment.
def common_prefix_len:
  (map(split("/"))) as $s
  | ($s | map(length) | min) as $shortest
  | ( reduce range($shortest) as $i (
        { len: 0, stopped: false };
        if .stopped then .
        elif ($s | all(.[$i] == $s[0][$i])) then .len = $i + 1
        else .stopped = true
        end
      ) | .len ) as $len
  | if $len >= $shortest then ($shortest - 1) else $len end;

# ---- Flatten every result across every input SARIF ----
[ .[] | .runs[]
  | (.tool.driver.name // "unknown") as $tool_raw
  | ($tool_raw | tool_display) as $tool
  | ((.tool.driver.rules // [])
      | map({(.id // "?"): (.shortDescription.text // null)}) | add // {}) as $rule_desc
  | .results[]?
  | (.properties.severity // .level // "none") as $sev
  | {
      file: (.locations[0].physicalLocation.artifactLocation.uri // "(no-file)"),
      tool: $tool,
      rule: (.ruleId // "?"),
      desc: (.properties.pattern // $rule_desc[(.ruleId // "?")] // null | trunc(80)),
      sev:  $sev,
      line: (.locations[0].physicalLocation.region.startLine // null),
      end_line: (.locations[0].physicalLocation.region.endLine // null),
      rank: ($sev | sev_rank)
    }
]
# ---- Normalize paths: strip per-tool common prefix ----
| . as $findings
| ( $findings | group_by(.tool)
    | map({ tool: .[0].tool, strip: ([.[].file] | common_prefix_len) })
    | map({(.tool): .strip}) | add // {} ) as $prefix_by_tool
| map(
    . as $f
    | .file = ($f.file | split("/") | .[$prefix_by_tool[$f.tool]:] | join("/"))
  )
# ---- Group by (normalized) file path ----
| group_by(.file)
| map({
    file:     .[0].file,
    total:    length,
    max_rank: (map(.rank) | max),
    per_tool: (group_by(.tool) | map({tool: .[0].tool, count: length})),
    findings: .
  })
| sort_by([-.total, -.max_rank, .file])
| . as $files
|

# ---- Emit Markdown ----
( "# Findings by File" ),
( "" ),
( "Consolidated from: " + $sources ),
( "" ),
( "Sorted by finding count desc, tiebreak by max severity, then path. " +
  "Per-file bullets sorted by severity desc. " +
  "Paths normalized by stripping per-tool common prefix so the same file " +
  "reported by multiple tools groups together." ),
( "" ),

( $files | to_entries[]
  | (.key + 1) as $i | .value as $f
  |
  ( "### \($i). `\($f.file)` \u2014 \($f.total) \(if $f.total == 1 then "finding" else "findings" end) (" +
      ($f.per_tool | map("\(.tool) \(.count)") | join(", ")) +
      ") \u2014 **max: \($f.max_rank | rank_label)**" ),
  ( "" ),
  ( $f.findings | group_by(.tool) | .[]
    |
    ( "\(.[0].tool):" ),
    ( sort_by(-.rank) | .[]
      | "- `\(.rule)`" +
        (if .desc then " \u2014 \(.desc)" else "" end) +
        " \u2014 **\(.sev)**" +
        (if .line then
           " \u2014 L\(.line)" +
           (if .end_line and .end_line != .line then "\u2013\(.end_line)" else "" end)
         else "" end)
    ),
    ( "" )
  )
)
