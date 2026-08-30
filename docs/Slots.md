# Slots

[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are placeholders inside web components that you fill with your own HTML content. They allow components to be flexible without needing a prop for every possible variation.

## Default slot

The default (unnamed) slot receives any child content that does not have a `slot` attribute.

```html
<sgds-button>
  <span>Hello World</span>
</sgds-button>
```

The `<span>` is placed in the default slot.

## Named slots

Named slots target specific areas within a component. Add the `slot` attribute to your element to direct it to the right slot.

```html
<sgds-button>
  Submit
  <sgds-icon slot="prefix" name="arrow-right"></sgds-icon>
</sgds-button>
```

Here, the text "Submit" goes into the default slot, and the icon is placed in the `prefix` named slot.

## Common slot names

Many SGDS components share the same slot naming conventions:

| Slot name | Purpose | Example components |
|---|---|---|
| (default) | Main content | Most components |
| `prefix` | Before the main content (e.g. icon) | `sgds-button`, `sgds-input` |
| `suffix` | After the main content (e.g. icon) | `sgds-button`, `sgds-input` |
| `label` | Form field label | `sgds-input`, `sgds-select`, `sgds-textarea` |
| `hint-text` | Helper text below the field | `sgds-input`, `sgds-select`, `sgds-textarea` |
| `header` | Header area | `sgds-card`, `sgds-modal` |
| `footer` | Footer area | `sgds-card`, `sgds-modal`, `sgds-drawer` |

> Refer to each component's API table in Storybook for the exact slots available.

## Slotting multiple elements

You can slot multiple elements into the same named slot — they will all appear in that slot area in DOM order.

```html
<sgds-alert>
  <sgds-icon slot="icon" name="exclamation-circle"></sgds-icon>
  <strong>Warning:</strong> This action cannot be undone.
</sgds-alert>
```

## Empty slots and fallback content

Components may render fallback content when a slot is left empty. For example, a button with no prefix slot content simply renders without an icon. You do not need to explicitly pass empty slots.

## Styling slotted content

Slotted content lives in the light DOM, so your page styles apply normally. Components may also use the `::slotted()` selector to apply styles to slotted elements from within the shadow DOM.

```css
/* Your styles apply to slotted content as usual */
sgds-button span {
  font-weight: bold;
}
```

