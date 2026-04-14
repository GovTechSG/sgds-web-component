# Typography

All typography utilities use the `sgds:` prefix. Always use semantic role tokens — never raw scale utilities like `sgds:text-base` or `sgds:text-sm`, which are not part of the public API.

---

## Letter Spacing by Role

Apply tracking based on content role, not size:

| Role | Tracking class |
|---|---|
| Display headings | `sgds:tracking-tighter` |
| Section headings (H1–H4) | `sgds:tracking-tight` |
| Subtitles (H5–H6) | `sgds:tracking-normal` |
| Overlines | `sgds:tracking-wide` |
| Body, labels, captions | *(omit — normal is default)* |

---

## Display Headings

Use `<h1>`.

| Variant | Classes |
|---|---|
| Display Large Bold | `sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter` |
| Display Large Light | `sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter` |
| **Display Medium Bold (default)** | `sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter` |
| Display Medium Light | `sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter` |
| Display Small Bold | `sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter` |
| Display Small Light | `sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter` |

---

## Section Headings (H1–H4)

| Variant | Element | Classes |
|---|---|---|
| Heading XL Bold | `<h1>` | `sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight` |
| Heading LG Bold | `<h2>` | `sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight` |
| **Heading MD Semibold (default)** | `<h3>` | `sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight` |
| Heading SM Semibold | `<h4>` | `sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight` |

Light variants available: replace `sgds:font-bold` / `sgds:font-semibold` with `sgds:font-light`.

---

## Subtitles (H5–H6)

| Variant | Element | Classes |
|---|---|---|
| **Subtitle MD Semibold (default)** | `<h5>` | `sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| Subtitle SM Semibold | `<h6>` | `sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |

---

## Body Text

Use `<p>`.

| Variant | Classes |
|---|---|
| Body Large Regular | `sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:mb-paragraph-xl` |
| **Body Medium Regular (default)** | `sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:mb-paragraph-lg` |
| Body Small Regular | `sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-lg` |

Semibold variants: add `sgds:font-semibold`.

---

## Labels

Use the component's built-in `label` attribute for form components. For non-form contexts, use `<div>`.

| Variant | Classes |
|---|---|
| Label LG Semibold | `sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| **Label MD Regular (default)** | `sgds:text-label-md sgds:leading-xs sgds:tracking-normal` |
| Label SM Regular | `sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal` |
| Label XS Regular | `sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal` |

---

## Captions and Helper Text

Use `<div>`.

| Variant | Classes |
|---|---|
| **Caption Regular (default)** | `sgds:text-caption-md sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md` |
| Caption Semibold | `sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-paragraph-md` |

---

## Overlines

Always use `<div>` with `sgds:uppercase`.

| Variant | Classes |
|---|---|
| **Overline Regular (default)** | `sgds:text-overline-md sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |
| Overline Semibold | `sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |

---

## Links

Always use `<a href="...">`. All link patterns include underline.

| Variant | Classes |
|---|---|
| Link Large | `sgds:text-link-lg sgds:leading-md sgds:tracking-normal sgds:underline` |
| **Link Medium (default)** | `sgds:text-link-md sgds:leading-xs sgds:tracking-normal sgds:underline` |
| Link Small | `sgds:text-link-sm sgds:leading-2-xs sgds:tracking-normal sgds:underline` |

---

## Code

Always apply `sgds:font-mono` to `<code>` and `<pre>`:

```html
<code class="sgds:font-mono sgds:text-14">inline code</code>
<pre class="sgds:font-mono sgds:text-14 sgds:leading-20">block code</pre>
```

---

## Stat Card Pattern (Muted Label + Prominent Value)

Used in dashboards and description lists:

```html
<div>
  <div class="sgds:text-label-sm sgds:text-muted">Total Applications</div>
  <div class="sgds:text-heading-md sgds:font-semibold sgds:text-default">1,248</div>
</div>
```
