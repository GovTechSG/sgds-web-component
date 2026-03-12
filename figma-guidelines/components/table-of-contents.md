# Table of Contents

**Purpose**: An in-page anchor navigation list linking to headings or sections on the current page. Useful for long documentation pages.

**Component**: `<sgds-table-of-contents>`

---

## Usage

```html
<!-- Auto-generated from anchor links -->
<sgds-table-of-contents>
  <a href="#introduction">Introduction</a>
  <a href="#installation">Installation</a>
  <a href="#configuration">Configuration</a>
  <a href="#examples">Examples</a>
  <a href="#api">API Reference</a>
</sgds-table-of-contents>

<!-- With custom title -->
<sgds-table-of-contents title="On this page">
  <a href="#overview">Overview</a>
  <a href="#usage">Usage</a>
  <a href="#props">Props</a>
  <a href="#events">Events</a>
</sgds-table-of-contents>

<!-- Typical documentation page layout -->
<div style="display: grid; grid-template-columns: 1fr 240px; gap: 2rem;">
  <main>
    <h2 id="overview">Overview</h2>
    <p>Content...</p>
    <h2 id="usage">Usage</h2>
    <p>Content...</p>
    <h2 id="props">Props</h2>
    <p>Content...</p>
  </main>

  <aside>
    <sgds-table-of-contents>
      <a href="#overview">Overview</a>
      <a href="#usage">Usage</a>
      <a href="#props">Props</a>
    </sgds-table-of-contents>
  </aside>
</div>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | string | `"Contents"` | Heading text above the links |

## Slots

| Slot | Content |
|---|---|
| *(default)* | `<a href="#section">` anchor links |

## Events

None.

---

## Notes

- Links use in-page anchor hrefs (e.g., `href="#section-id"`) to scroll to headings with matching `id` attributes.
- Place in a sticky sidebar for best usability on long pages.
