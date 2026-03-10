---
name: tailwind-mapping
description: Converts SGDS CSS variables to Tailwind v4 utility classes in src/css/utility.css and creates playground documentation in playground/utility/ HTML files. Use when adding Tailwind mappings, creating utility class documentation, or implementing new color/spacing/typography utilities with proper preview examples. IMPORTANT - adding a mapping to utility.css alone is incomplete. Every new token mapping MUST also be accompanied by (1) a playground HTML demo in playground/utility/ and (2) a Storybook story in stories/utilities/.
metadata:
  author: singapore-design-system
  version: "1.0.0"
---

# Tailwind Mapping

## Conversion Pattern

```
--sgds-{category} → --{property}-{category} → sgds:{property}-{category}
```

| SGDS Variable Pattern | Tailwind Property | Generated Class |
|---|---|---|
| `--sgds-{v}-bg-{m}` | `--background-color-{v}-{m}` | `sgds:bg-{v}-{m}` |
| `--sgds-{v}-surface-{m}` | `--background-color-{v}-surface-{m}` | `sgds:bg-{v}-surface-{m}` |
| `--sgds-{v}-color-{m}` | `--text-color-{v}-{m}` | `sgds:text-{v}-{m}` |
| `--sgds-{v}-border-color-{m}` | `--border-color-{v}-{m}` | `sgds:border-{v}-{m}` |
| `--sgds-line-height-{m}` | `--leading-{m}` | `sgds:leading-{m}` |
| `--sgds-font-size-{m}` | `--text-{m}` | `sgds:text-{m}` |
| `--sgds-spacer-{m}` | `--spacing-{m}` | `sgds:m-{m}`, `sgds:p-{m}`, etc. |

See [reference/conversion-rules.md](reference/conversion-rules.md) for full per-category details (form colors, typography types, modifiers).

## Playground HTML Format

Each `playground/utility/*.html` table section follows this structure:

```html
<section class="sgds:mb-2-xl">
  <h2>Category Name</h2>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><code>sgds:bg-primary-default</code></sgds-table-cell>
      <sgds-table-cell><code>--sgds-primary-bg-default</code></sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:text-fixed-light sgds:p-md">
          Primary background
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</section>
```

**Contrast rules:** Fixed-light surfaces → `sgds:text-fixed-dark`. Fixed-dark/dark surfaces → `sgds:text-fixed-light`. Warning/yellow → `sgds:text-fixed-dark`. Borders → use `sgds:border-2 sgds:border-{color} sgds:p-md`.

## Workflow: Adding a New Token Mapping

1. **Add token to theme file** (`root.css`, `day.css`, or `night.css`)
2. **Add mapping to `src/css/utility.css`** inside the correct existing `@theme {}` section — follow the conversion pattern table above
3. **Create/update `playground/utility/[name].html`** with a live preview table
4. **Run `pnpm run utility:dev`** and verify the utility class renders in light and dark mode
5. **Create `stories/utilities/[name].stories.js`** Storybook story

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm run utility:dev` | Tailwind watches `playground/utility/*.html` |
| `pnpm run dev` | Preview playground in browser |
| `pnpm storybook` | Preview Storybook documentation |
- **Storybook:** `pnpm run storybook` (preview Storybook documentation)

### Production
- **Build:** `pnpm build` (production build)

## Related Skills

- **token-workflow** - For high-level token architecture and documentation patterns
