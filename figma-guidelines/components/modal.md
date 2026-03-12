# Modal# Modal












































































































| `sgds-after-hide` | No | Modal fully closed || `sgds-close` | Yes | Modal begins closing. Cancel to prevent close. || `sgds-after-show` | No | Modal fully open || `sgds-show` | No | Modal begins opening ||---|---|---|| Event | Cancelable | When |## Events| `hide()` | Closes the modal || `show()` | Opens the modal ||---|---|| Method | Description |## Methods| `footer` | Footer action buttons || `header` | Custom header (replaces `title`) || *(default)* | Modal body content ||---|---|| Slot | Content |## Slots| `noHeader` | boolean | `false` | Hides the header || `noCloseOnEsc` | boolean | `false` | Disables closing with the Escape key || `noCloseOnBackdrop` | boolean | `false` | Disables closing when backdrop is clicked || `size` | `sm \| md \| lg \| xl` | `md` | Modal width || `open` | boolean | `false` | Whether the modal is visible || `title` | string | — | Modal title in the header ||---|---|---|---|| Attribute | Type | Default | Description |## Props---```</script>  });    }      e.preventDefault(); // Prevent close    if (hasUnsavedChanges) {  document.getElementById("guarded-modal").addEventListener("sgds-close", (e) => {<script></sgds-modal>  </div>    <sgds-button variant="primary">Save</sgds-button>    <sgds-button variant="danger">Discard</sgds-button>  <div slot="footer">  <p>You have unsaved changes.</p><sgds-modal id="guarded-modal" title="Unsaved Changes"><!-- Listen to close event and cancel it --><sgds-modal title="Extra Large Modal" size="xl">Content</sgds-modal><sgds-modal title="Large Modal" size="lg">Content</sgds-modal><sgds-modal title="Small Modal" size="sm">Content</sgds-modal><!-- Sizes --></sgds-modal>  </div>    <sgds-button variant="primary">I Acknowledge</sgds-button>  <div slot="footer">  <p>You must acknowledge this notice before continuing.</p><sgds-modal title="Important Notice" noCloseOnEsc><!-- Prevent closing with Escape key --></sgds-modal>  </div>    <sgds-button variant="primary">Submit</sgds-button>  <div slot="footer">  </form>    <sgds-input label="Name" name="name" required></sgds-input>  <form><sgds-modal id="form-modal" title="Submit Form" noCloseOnBackdrop><!-- Prevent closing on backdrop click --></script>  });    modal.hide();    // handle confirm  document.getElementById("confirm-btn").addEventListener("click", () => {  document.getElementById("cancel-btn").addEventListener("click", () => modal.hide());  document.getElementById("open-modal").addEventListener("click", () => modal.show());  const modal = document.getElementById("my-modal");<script></sgds-modal>  </div>    <sgds-button variant="ghost" id="cancel-btn">Cancel</sgds-button>    <sgds-button variant="primary" id="confirm-btn">Confirm</sgds-button>  <div slot="footer">  <p>Are you sure you want to proceed with this action?</p><sgds-modal id="my-modal" title="Confirm Action"><sgds-button id="open-modal" variant="primary">Open Modal</sgds-button><!-- Trigger button + modal -->```html## Usage---**Component**: `<sgds-modal>`**Purpose**: Dialog overlay for confirmations, forms, alerts, and content that requires focused user interaction.
**Purpose**: Dialog overlay for confirmations, alerts, complex forms, or focused tasks. Blocking — user must explicitly confirm or dismiss.

**Component**: `<sgds-modal>`

---

## Usage

```html
<!-- Basic modal with confirm/cancel -->
<sgds-button id="open-modal" variant="primary">Open Modal</sgds-button>

<sgds-modal id="confirm-modal" title="Confirm Action" size="md">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <sgds-button slot="footer" variant="danger">Delete</sgds-button>
  <sgds-button slot="footer" variant="ghost" id="cancel-btn">Cancel</sgds-button>
</sgds-modal>

<script>
  const modal = document.getElementById("confirm-modal");
  document.getElementById("open-modal").addEventListener("click", () => modal.show());
  document.getElementById("cancel-btn").addEventListener("click", () => modal.hide());
</script>

<!-- Different sizes -->
<sgds-modal title="Small Dialog" size="sm">
  <p>Small modal content.</p>
</sgds-modal>

<sgds-modal title="Large Form" size="lg">
  <p>Large modal for complex forms.</p>
</sgds-modal>

<!-- Scrollable modal (long content) -->
<sgds-modal title="Long Content" scrollable>
  <p>Very long content that scrolls within the modal body...</p>
  <!-- lots of content -->
</sgds-modal>

<!-- Prevent closing on backdrop click -->
<sgds-modal id="strict-modal" title="Required Action">
  <p>You must complete this action before continuing.</p>
  <sgds-button slot="footer" variant="primary">Acknowledge</sgds-button>
</sgds-modal>
<script>
  document.getElementById("strict-modal").addEventListener("sgds-close", (e) => {
    if (e.detail.source === "overlay") {
      e.preventDefault(); // Prevent closing when clicking backdrop
    }
  });
</script>

<!-- Open by default -->
<sgds-modal title="Welcome" open>
  <p>Welcome message shown on page load.</p>
</sgds-modal>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | string | — | Modal header title |
| `open` | boolean | `false` | Whether the modal is visible |
| `size` | `sm \| md \| lg` | `md` | Modal width |
| `scrollable` | boolean | `false` | Makes modal body independently scrollable |
| `centered` | boolean | `false` | Vertically centers the modal |
| `noHeader` | boolean | `false` | Hides the header |
| `noFooter` | boolean | `false` | Hides the footer area |

## Slots

| Slot | Content |
|---|---|
| `header` | Custom header (overrides `title` prop) |
| *(default)* | Modal body content |
| `footer` | Footer buttons/actions |

## Methods

| Method | Description |
|---|---|
| `show()` | Opens the modal |
| `hide()` | Closes the modal |

## Events

| Event | Cancelable | Description |
|---|---|---|
| `sgds-show` | No | Modal begins opening |
| `sgds-after-show` | No | Modal fully open |
| `sgds-close` | Yes | User requests close. `event.detail.source`: `"close-button"`, `"overlay"`, `"keyboard"`. Prevent to block close. |
| `sgds-after-hide` | No | Modal fully hidden |

---

## Notes

- Cancel the `sgds-close` event with `event.preventDefault()` to prevent the modal from closing (e.g., requiring form submission).
- For confirmations, the `footer` slot should always have at least a cancel/dismiss button so users aren't trapped.
