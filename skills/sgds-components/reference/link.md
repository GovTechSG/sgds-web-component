# SGDS Link Component Skill

`<sgds-link>` is the standard navigation link element. It wraps a slotted `<a>` tag and applies SGDS link styling, accessibility handling, and icon positioning.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

A Link is an interactive text element that navigates users to another location — either within the same application (internal navigation) or to an external resource. Links are visually distinguished from surrounding text through colour and/or underline styling.

## Purpose

Enable navigation and discoverability, allowing users to move between content, access additional information, or perform lightweight actions without interrupting their current flow.

## Usage Guideline

### When to use

- To navigate to another page or route.
- To link to external resources (e.g. documents, websites).
- Within body text as inline links for contextual navigation — use a plain `<a>` tag; `sgds.css` applies default anchor styling automatically.
- As standalone links for secondary actions — use `<sgds-link>`.
- When the action is low-emphasis compared to primary actions (vs. a button).

### When NOT to use

- For primary or high-emphasis actions → use `<sgds-button>` instead.
- For triggering complex UI changes (e.g. opening a modal, submitting a form).
- When the destination is unclear or not meaningful.
- For non-interactive text styled to look like links (avoid misleading affordance).

## Behaviour

- Navigates users to a destination when activated.
- Can be internal (same domain/app) or external (opens a new tab when required).
- Supports leading or trailing icons (e.g. external-link icon); icon size is managed automatically based on the link `size`.
- `disabled` sets `href="javascript:void(0)"` and `tabindex="-1"` on the slotted anchor automatically.
- `active` applies active styling to indicate the current page or selected state.

## Content Guideline

- Use clear, descriptive labels — "View application status" not "Click here".
- Link text should describe the destination or outcome; keep it concise but meaningful.
- Inline links should integrate naturally within sentence flow.
- For external links, indicate the behaviour clearly (e.g. an icon or "(opens in new tab)") when it may surprise the user.

## Interaction Guideline

- External links should open in a new tab only when necessary — avoid overuse.
- Keyboard: links are focusable and activatable with `Enter`.
- Visited state should not reduce readability or contrast.

## Best Practices

**Do**
- Use links for navigation, not actions.
- Keep link text specific and meaningful.
- Maintain consistent styling across all link types using the `tone` prop.
- Use inline links sparingly to avoid visual clutter.
- Provide a clear indication for external links.
- Ensure sufficient colour contrast, a visible focus state, and keyboard support.

**Don't**
- Use vague text like "here" or "more".
- Overload content with too many links.
- Style non-interactive text as links.
- Use links where a button is more appropriate.
- Open new tabs without a clear user expectation.
- Use the deprecated `variant` prop — use `tone` instead.

## Common Use Cases

- Inline links within paragraphs (e.g. policy pages, help content) — use plain `<a>`.
- Navigation to related content or subpages — use `<sgds-link>`.
- External resource links (e.g. downloads, official sites).
- Secondary actions (e.g. "Cancel", "Learn more") below cards or forms.
- Linking to documents (PDF, reports).

## Advanced Considerations

- **Tones**: `primary` (default), `danger` (destructive or warning action), `neutral` (subdued), `fixed-light` (on dark backgrounds), `fixed-dark` (on light backgrounds). See tone usage guidelines below.
- **Sizes**: `xs`, `sm`, `md` (default), `lg` — aligned with the typography scale.
- **Active state**: use `active` to apply active styling, e.g. to indicate the current page in a navigation list.
- **Icon usage**: place `<sgds-icon>` before text for a leading icon; after text for trailing. Never set `size` on the icon manually — it is managed by the link's `size`.
- **`variant` deprecated since 3.6.0**: always use `tone` instead of `variant="light"` or `variant="dark"`.

### Tone Usage Guidelines

| Tone | When to use | Example |
|---|---|---|
| `primary` | Default. Standard navigation links on light backgrounds. | "View details", "Learn more" |
| `danger` | Links that lead to a destructive or irreversible action, or warn the user of risk. Use sparingly. | "Delete account", "Remove file" |
| `neutral` | Subdued links that should not draw attention — used in footnotes, metadata, or secondary navigation. | "Terms of service", "Privacy policy" |
| `fixed-light` | Links placed on dark or coloured backgrounds where the link must always appear light regardless of theme. | Links in dark headers, banners, or footers |
| `fixed-dark` | Links placed on light backgrounds where the link must always appear dark regardless of theme. | Links in light-coloured hero sections |

**Do**
- Use `primary` for most navigation links.
- Use `danger` only when the linked action has destructive consequences — not simply for emphasis.
- Use `fixed-light` / `fixed-dark` when the link sits on a background that does not respond to the active theme (day/night mode).

**Don't**
- Use `danger` for styling emphasis or to make a link stand out — it carries a semantic meaning of risk.
- Use `fixed-light` or `fixed-dark` on standard page backgrounds; prefer `primary` or `neutral` and let the theme handle colour.

## Edge Cases

- **Very long link text**: wraps properly without breaking readability; keep labels concise.
- **Multiple links in one sentence**: avoid cognitive overload — restructure content if needed.
- **Disabled links**: prefer hiding over disabling; `disabled` is supported but hidden links avoid misleading the user.
- **Same destination, different labels**: avoid inconsistency; use the same label for the same destination.
- **Links inside interactive components**: ensure no conflict with parent click/tap behaviour.
- **Localization**: link text may expand significantly in other languages — avoid fixed-width containers.
- **Accessibility**: screen readers must clearly announce the link's purpose; avoid duplicate or ambiguous labels.

## Quick Decision Guide

**`<sgds-link>` vs plain `<a>`**
- **Standalone link** (not inside a sentence) → always use `<sgds-link>`. Examples: CTAs, "Back" links, nav links, action links below a card.
- **Inline text link** (embedded mid-sentence or mid-paragraph) → use a plain `<a>` tag. `sgds.css` applies default anchor styling automatically — no component needed.

```html
<!-- Standalone link → sgds-link -->
<sgds-link><a href="/details">View details</a></sgds-link>

<!-- Inline text link → plain anchor -->
<p>Read the <a href="/docs">full documentation</a> for more details.</p>
```

**Always pass a single `<a>` tag in the default slot** — never put text directly inside `<sgds-link>`.

**Which `tone`?**
- Default brand color → `primary` (default)
- Destructive or warning action → `danger`
- Subdued / neutral → `neutral`
- On dark backgrounds (always light) → `fixed-light`
- On light backgrounds (always dark) → `fixed-dark`

> `variant` is **deprecated since 3.6.0** — use `tone` instead. Never suggest `variant="light"` or `variant="dark"`.

**Which `size`?**
- Default → `md`
- Compact / footnote contexts → `xs` or `sm`
- Large / prominent link → `lg`

**Disabled?**
- `disabled` sets `href="javascript:void(0)"` and `tabindex="-1"` on the slotted anchor automatically.

**With an icon?**
- Place `<sgds-icon>` before the text for a leading icon; after the text for a trailing icon.
- Icon size is managed automatically based on link `size` — do not set `size` on the icon manually.

```html
<!-- Basic link -->
<sgds-link>
  <a href="/about">About us</a>
</sgds-link>

<!-- Tones -->
<sgds-link tone="primary"><a href="#">Primary</a></sgds-link>
<sgds-link tone="danger"><a href="#">Danger</a></sgds-link>
<sgds-link tone="neutral"><a href="#">Neutral</a></sgds-link>

<!-- On dark background -->
<div style="background-color: #333; padding: 8px;">
  <sgds-link tone="fixed-light"><a href="#">Fixed light</a></sgds-link>
</div>

<!-- Sizes -->
<sgds-link size="xs"><a href="#">Extra small</a></sgds-link>
<sgds-link size="sm"><a href="#">Small</a></sgds-link>
<sgds-link size="md"><a href="#">Medium (default)</a></sgds-link>
<sgds-link size="lg"><a href="#">Large</a></sgds-link>

<!-- External link -->
<sgds-link><a href="https://example.com" target="_blank">External link</a></sgds-link>

<!-- Leading icon -->
<sgds-link>
  <a href="#">
    <sgds-icon name="arrow-left"></sgds-icon>
    Back
  </a>
</sgds-link>

<!-- Trailing icon -->
<sgds-link>
  <a href="#">
    Next
    <sgds-icon name="arrow-right"></sgds-icon>
  </a>
</sgds-link>

<!-- Disabled link -->
<sgds-link disabled><a href="/page">Disabled</a></sgds-link>

<!-- Active state -->
<sgds-link active><a href="/current">Current page</a></sgds-link>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `primary \| danger \| neutral \| fixed-light \| fixed-dark` | `primary` | Link color |
| `size` | `xs \| sm \| md \| lg` | `md` | Link size |
| `active` | boolean | `false` | Applies active styling |
| `disabled` | boolean | `false` | Disables the link (sets `href="javascript:void(0)"` and `tabindex="-1"`) |
| `variant` | `primary \| danger \| neutral \| light \| dark` | `primary` | **Deprecated since 3.6.0** — use `tone` instead |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | A single `<a>` tag — required; do not put text directly inside `<sgds-link>` |

## Events

None.

---

**For AI agents**:
1. **Use `<sgds-link>` for standalone links; use a plain `<a>` for inline text links.** `sgds.css` provides default anchor styling for inline anchors — wrapping them in `<sgds-link>` is unnecessary and incorrect.
2. Always pass a single `<a>` tag inside `<sgds-link>` — never put text directly as `<sgds-link>text</sgds-link>`.
3. `variant` is deprecated since 3.6.0 — always use `tone`. Never suggest `variant="light"` or `variant="dark"`.
4. `disabled` is applied to the wrapper; it automatically sets `href="javascript:void(0)"` and `tabindex="-1"` on the slotted anchor — do not add these manually.
5. `tone="fixed-light"` is for dark backgrounds; `tone="fixed-dark"` is for light backgrounds when overriding theme behaviour.
6. Icon sizing within `<sgds-link>` is automatic — do not set `size` on `<sgds-icon>` children.
7. There are no custom events on this component.
