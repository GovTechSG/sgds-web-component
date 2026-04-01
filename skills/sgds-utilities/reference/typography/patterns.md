# Typography Patterns Reference

Common HTML patterns combining SGDS typography utilities for real-world content types.

> **Note**: Use library components like `<sgds-button>`, `<sgds-badge>` when available.
> These patterns are for custom components when library components don't meet your needs.

---

## Display Headings (Hero Text)

```html
<!-- Display Large Bold -->
<h1 class="sgds:text-56 sgds:font-bold sgds:leading-64 sgds:tracking-tighter">
  Display Large Bold
</h1>

<!-- Display Large Light -->
<h1 class="sgds:text-56 sgds:font-light sgds:leading-64 sgds:tracking-tighter">
  Display Large Light
</h1>

<!-- Display Medium Bold (Default) -->
<h1 class="sgds:text-48 sgds:font-bold sgds:leading-56 sgds:tracking-tighter">
  Display Medium Bold
</h1>

<!-- Display Medium Light -->
<h1 class="sgds:text-48 sgds:font-light sgds:leading-56 sgds:tracking-tighter">
  Display Medium Light
</h1>

<!-- Display Small Bold -->
<h1 class="sgds:text-40 sgds:font-bold sgds:leading-48 sgds:tracking-tighter">
  Display Small Bold
</h1>

<!-- Display Small Light -->
<h1 class="sgds:text-40 sgds:font-light sgds:leading-48 sgds:tracking-tighter">
  Display Small Light
</h1>
```

**When to use:** Page heroes, marketing banners, splash screens.

---

## Section Headings (H1–H4)

```html
<!-- H1 Bold -->
<h1 class="sgds:text-40 sgds:font-bold sgds:leading-48 sgds:tracking-tight">
  Heading H1 Bold
</h1>

<!-- H1 Light -->
<h1 class="sgds:text-40 sgds:font-light sgds:leading-48 sgds:tracking-tight">
  Heading H1 Light
</h1>

<!-- H2 Bold -->
<h2 class="sgds:text-32 sgds:font-bold sgds:leading-40 sgds:tracking-tight">
  Heading H2 Bold
</h2>

<!-- H2 Light -->
<h2 class="sgds:text-32 sgds:font-light sgds:leading-40 sgds:tracking-tight">
  Heading H2 Light
</h2>

<!-- H3 Semibold (Default) -->
<h3 class="sgds:text-28 sgds:font-semibold sgds:leading-32 sgds:tracking-tight">
  Heading H3 Semibold
</h3>

<!-- H3 Light -->
<h3 class="sgds:text-28 sgds:font-light sgds:leading-32 sgds:tracking-tight">
  Heading H3 Light
</h3>

<!-- H4 Semibold -->
<h4 class="sgds:text-24 sgds:font-semibold sgds:leading-28 sgds:tracking-tight">
  Heading H4 Semibold
</h4>

<!-- H4 Light -->
<h4 class="sgds:text-24 sgds:font-light sgds:leading-28 sgds:tracking-tight">
  Heading H4 Light
</h4>
```

---

## Subtitles (H5–H6)

```html
<!-- Subtitle Medium Semibold (Default) -->
<h5 class="sgds:text-20 sgds:font-semibold sgds:leading-24 sgds:tracking-normal">
  Subtitle Medium Semibold
</h5>

<!-- Subtitle Medium Light -->
<h5 class="sgds:text-20 sgds:font-light sgds:leading-24 sgds:tracking-normal">
  Subtitle Medium Light
</h5>

<!-- Subtitle Small Semibold -->
<h6 class="sgds:text-16 sgds:font-semibold sgds:leading-20 sgds:tracking-normal">
  Subtitle Small Semibold
</h6>

<!-- Subtitle Small Light -->
<h6 class="sgds:text-16 sgds:font-light sgds:leading-20 sgds:tracking-normal">
  Subtitle Small Light
</h6>
```

---

## Body Text

```html
<!-- Body Large Semibold -->
<p class="sgds:text-20 sgds:font-semibold sgds:leading-32 sgds:mb-paragraph-md">
  Body large semibold.
</p>

<!-- Body Large Regular -->
<p class="sgds:text-20 sgds:leading-32 sgds:mb-paragraph-md">
  Body large regular.
</p>

<!-- Body Medium Semibold -->
<p class="sgds:text-16 sgds:font-semibold sgds:leading-24 sgds:mb-paragraph-md">
  Body medium semibold.
</p>

<!-- Body Medium Regular (Default) -->
<p class="sgds:text-16 sgds:leading-24 sgds:mb-paragraph-md">
  Body medium regular.
</p>

<!-- Body Small Semibold -->
<p class="sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:mb-paragraph-md">
  Body small semibold.
</p>

<!-- Body Small Regular -->
<p class="sgds:text-14 sgds:leading-20 sgds:mb-paragraph-md">
  Body small regular.
</p>
```

---

## Labels

**In form context:** use the SGDS component's built-in label attribute first. Only fall back to `<label>` if the component has no built-in label support. Outside form context: use `<div>`.

```html
<!-- Non-form context: use <div> -->

<!-- Label Large Semibold -->
<div class="sgds:text-16 sgds:font-semibold sgds:leading-20">Label Large Semibold</div>

<!-- Label Large Regular -->
<div class="sgds:text-16 sgds:leading-20">Label Large Regular</div>

<!-- Label Small Semibold -->
<div class="sgds:text-12 sgds:font-semibold sgds:leading-16">Label Small Semibold</div>

<!-- Label Small Regular -->
<div class="sgds:text-12 sgds:leading-16">Label Small Regular</div>
```

```html
<!-- Form context: prefer SGDS component built-in label -->
<sgds-input label="Field label"></sgds-input>

<!-- Form context fallback: use <label> only if component has no built-in label support -->
<label class="sgds:text-16 sgds:font-semibold sgds:leading-20">
  Field Label
</label>
```

---

## Captions

```html
<!-- Caption Semibold -->
<div class="sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:mb-paragraph-sm">
  Caption semibold
</div>

<!-- Caption Regular (Default) -->
<div class="sgds:text-14 sgds:leading-20 sgds:mb-paragraph-sm">
  Caption regular
</div>
```

**When to use:** Helper text, field error messages, footnotes, footer copy.

---

## Links

Always use `<a>` with an `href`. All link patterns include underline.

```html
<!-- Link Large Regular -->
<a href="#" class="sgds:text-20 sgds:leading-32 sgds:underline">
  Link large
</a>

<!-- Link Medium Regular (Default) -->
<a href="#" class="sgds:text-16 sgds:leading-24 sgds:underline">
  Link medium
</a>

<!-- Link Small Regular -->
<a href="#" class="sgds:text-14 sgds:leading-20 sgds:underline">
  Link small
</a>

<!-- Link XS Regular -->
<a href="#" class="sgds:text-12 sgds:leading-16 sgds:underline">
  Link XS
</a>
```

---

## Overline

Always use `<div>` and `sgds:uppercase`. Use for key-value labels and data table header labels.

```html
<!-- Overline Semibold -->
<div class="sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:uppercase sgds:tracking-wide">
  Overline Semibold
</div>

<!-- Overline Regular (Default) -->
<div class="sgds:text-14 sgds:leading-20 sgds:uppercase sgds:tracking-wide">
  Overline Regular
</div>
```

---

## Best Practices

**Pair font size with appropriate line height** (see [type-properties.md](type-properties.md) for full pairing table):

| Context | Size | Leading |
|---------|------|---------|
| Display | `sgds:text-56` | `sgds:leading-64` |
| Display | `sgds:text-48` | `sgds:leading-56` |
| H1 / Display | `sgds:text-40` | `sgds:leading-48` |
| H2 | `sgds:text-32` | `sgds:leading-40` |
| H3 | `sgds:text-28` | `sgds:leading-32` |
| H4 | `sgds:text-24` | `sgds:leading-28` |
| Subtitle | `sgds:text-20` | `sgds:leading-24` (heading) or `sgds:leading-32` (body) |
| Body / Label | `sgds:text-16` | `sgds:leading-24` (body) or `sgds:leading-20` (label) |
| Caption / Body SM | `sgds:text-14` | `sgds:leading-20` |
| Label XS | `sgds:text-12` | `sgds:leading-16` |

**Font weight for hierarchy:**
- Display / H1–H2 → `sgds:font-bold`
- H3–H4 / Subtitles / Labels → `sgds:font-semibold`
- Body → no class needed (regular is the reboot default)

**Tracking by text role:**
- Display → `sgds:tracking-tighter`
- Headings (H1–H4) → `sgds:tracking-tight`
- Subtitles → `sgds:tracking-normal`
- Overline → `sgds:tracking-wide`
- Body, labels, captions → no tracking class needed (normal is the default)

## See Also

- **[type-properties.md](type-properties.md)** — Full scale tables for all token values
