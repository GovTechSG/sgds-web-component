# Events

SGDS web components use a mix of **native DOM events** and **custom `sgds-*` events**, depending on whether the native event naturally crosses the shadow DOM boundary.

## When to use native events

Some native events like `click`, `focus`, and `blur` have `composed: true` by default — they bubble out of the shadow DOM and are retargeted to the host element. For components where the user interaction maps directly to one of these composed events, you can listen to them natively.

For example, `sgds-button` works with the standard `click` event:

```html
<sgds-button>Submit</sgds-button>

<script>
  const button = document.querySelector('sgds-button');
  button.addEventListener('click', event => {
    console.log('Button clicked');
  });
</script>
```

In React:

```jsx
<SgdsButton onClick={handleClick}>Submit</SgdsButton>
```

## When to use custom `sgds-*` events

Certain native events like `change` and `input` have `composed: false` — they fire on internal elements inside the shadow DOM but **do not** bubble out to the host. For these cases, SGDS re-dispatches a custom event (e.g. `sgds-change`) from the host element with the relevant data attached.

Use custom events when:

- The native event does not cross the shadow boundary (e.g. `change`, `input`)
- The event carries a component-specific payload (e.g. selected value, checked state)

```html
<sgds-checkbox>Check me</sgds-checkbox>

<script>
  const checkbox = document.querySelector('sgds-checkbox');
  checkbox.addEventListener('sgds-change', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>
```

## Event reference

| Component | Use native event | Use custom `sgds-*` event |
|---|---|---|
| `sgds-button` | `click` | — |
| `sgds-icon-button` | `click` | — |
| `sgds-close-button` | `click` | — |
| `sgds-link` | `click` | — |
| `sgds-checkbox` | — | `sgds-change`, `sgds-check`, `sgds-uncheck`, `sgds-focus`, `sgds-blur` |
| `sgds-radio` | — | `sgds-focus`, `sgds-blur` |
| `sgds-switch` | — | `sgds-change` |
| `sgds-input` | — | `sgds-input`, `sgds-change`, `sgds-focus`, `sgds-blur` |
| `sgds-textarea` | — | `sgds-input`, `sgds-change`, `sgds-focus`, `sgds-blur` |
| `sgds-select` | — | `sgds-change`, `sgds-select`, `sgds-focus`, `sgds-blur` |
| `sgds-combo-box` | — | `sgds-change`, `sgds-select`, `sgds-input`, `sgds-focus`, `sgds-blur`, `sgds-scroll-end` |
| `sgds-datepicker` | — | `sgds-change-date` |
| `sgds-quantity-toggle` | — | `sgds-input`, `sgds-change` |
| `sgds-file-upload` | — | `sgds-change`, `sgds-add-files`, `sgds-remove-file`, `sgds-blur` |
| `sgds-tab-group` | — | `sgds-tab-show`, `sgds-tab-hide` |
| `sgds-accordion-item` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide` |
| `sgds-drawer` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide`, `sgds-request-close`, `sgds-initial-focus` |
| `sgds-modal` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide`, `sgds-close` |
| `sgds-toast` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide`, `sgds-close` |
| `sgds-dropdown` | — | `sgds-show`, `sgds-hide`, `sgds-select` |
| `sgds-overflow-menu` | — | `sgds-select` |
| `sgds-pagination` | — | `sgds-page-change` |
| `sgds-sidenav-item` | — | `sgds-toggle`, `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide` |
| `sgds-alert` | — | `sgds-show`, `sgds-hide` |
| `sgds-tooltip` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide` |
| `sgds-mainnav` | — | `sgds-show`, `sgds-hide`, `sgds-after-show`, `sgds-after-hide` |
| `sgds-stepper` | — | `sgds-next-step`, `sgds-previous-step`, `sgds-last-step`, `sgds-first-step`, `sgds-reset`, `sgds-arrived` |
| `sgds-system-banner` | — | `sgds-show`, `sgds-hide`, `sgds-show-more` |

> For the full event API of each component, refer to the component's API table in Storybook.

## Why not use native events on form components?

Events emitted within a component's shadow root are [retargeted](https://dom.spec.whatwg.org/#retarget) to look like they came from the host element. However, some events like `change` and `input` are specced with `composed: false` and will never cross the shadow boundary. Listening for `change` on `<sgds-input>` would simply never fire.
