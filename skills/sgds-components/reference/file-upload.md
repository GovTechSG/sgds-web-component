# SGDS File Upload Component Skill

`<sgds-file-upload>` renders a styled file upload button. Selected files appear as a list with dismiss (remove) buttons. Use `accept` to restrict file types and `multiple` to allow many files.

## Component Definition

The File Upload component provides a styled button that opens the browser's native file picker. Once files are selected, they are listed below the button with individual dismiss buttons allowing users to remove them before submission.

## Purpose

- Enable users to attach files to a form or submission.
- Restrict acceptable file types to reduce invalid uploads.
- Support single or multiple file selection with clear visual feedback.

## Usage Guideline

### When to use

- When a form requires one or more file attachments (e.g. identity documents, images, reports).
- When file type restrictions are necessary — use `accept` to limit valid formats.
- When users may need to select and review multiple files before submitting — add `multiple`.
- When validation feedback is needed to guide users on file requirements.

### When NOT to use

- When files are uploaded immediately on selection without any review step — the component is designed for form-based submission, not instant upload.
- When drag-and-drop is the primary interaction pattern expected — this component uses a button-triggered file picker only.
- When file size validation is required — `<sgds-file-upload>` does not enforce size limits; validate file size in the `sgds-files-selected` event handler.

## Behaviour

- Renders a styled button; clicking it opens the browser's native file picker.
- `accept` restricts the file types shown in the picker (MIME types or extensions, comma-separated).
- `multiple` allows selecting more than one file at a time.
- Selected files appear as a dismissible list below the button; users can remove individual files by clicking the dismiss button — this is handled automatically.
- `disabled` disables the button and prevents interaction.
- `required` makes the field required for form submission.
- `hasFeedback` enables validation feedback UI; pair with `invalidFeedback` to show an error message.
- `invalid` manually sets the invalid state without relying on browser constraint validation.
- Fires `sgds-files-selected` with a `FileList` as `event.detail` when files are selected.

## Content Guideline

- Use the default slot to set the button label (e.g. "Choose File", "Upload Document").
- Use `label` to describe what the user is uploading (e.g. "Proof of Identity").
- Use `hintText` to communicate format and size requirements upfront (e.g. "PDF only, max 10MB").
- `invalidFeedback` should be specific and actionable (e.g. "Please upload a valid document in PDF or JPG format").
- Avoid vague button labels like "Browse" — prefer "Choose File" or "Upload [document type]".

## Interaction Guideline

- Clicking the button triggers the native file picker — no drag-and-drop interaction.
- After selection, filenames appear in a list with dismiss buttons; users can remove files individually before submitting.
- The `sgds-files-selected` event fires each time the file picker closes with a new selection — listen to it to process or validate selected files.
- Validate file size, count, or other constraints in the `sgds-files-selected` handler and set `invalid` manually if needed.
- Keyboard: the button is focusable and activatable via `Space` or `Enter`.

## Best Practices

**Do**
- Always set `label` and `hintText` to communicate what files are expected and any format constraints.
- Use `accept` to restrict file types and reduce invalid submissions.
- Provide a clear `invalidFeedback` message alongside `hasFeedback`.
- Validate file size and count in the `sgds-files-selected` event handler — the component does not enforce these automatically.
- Use descriptive button slot text that reflects the expected file type.

**Don't**
- Rely on `accept` alone for security — always validate file types server-side.
- Use the component for immediate (non-form) file uploads without a clear submission flow.
- Omit `hintText` when file type or size restrictions apply — users need this information before selecting.
- Set `invalid` without also setting `invalidFeedback` — the error state without a message provides no guidance.

## Common Use Cases

- Uploading identity or supporting documents in government or financial forms.
- Attaching images (profile photo, proof of address).
- Submitting reports or data files (PDF, CSV, DOCX).
- Uploading multiple assets in a content management workflow.

## Advanced Considerations

- **File validation**: file size and count are not enforced by the component — implement validation in the `sgds-files-selected` handler and use `invalid` to reflect the error state.
- **Manual invalid state**: use `invalid` to programmatically set the error state, e.g. after server-side validation failure, without relying on browser constraint validation.
- **`accept` syntax**: follows standard HTML `accept` attribute syntax — `"image/*"` for all images, `".pdf"` for a specific extension, or `"image/jpeg,image/png"` for multiple MIME types.
- **FileList access**: `event.detail` on `sgds-files-selected` is a `FileList` object — iterate with `for...of` or index access (`event.detail[0]`).

## Edge Cases

- **No files selected**: if the user opens the picker and cancels, `sgds-files-selected` does not fire — the previous selection remains.
- **Duplicate file selection**: the browser may allow selecting the same file twice; deduplicate in the event handler if required.
- **Large file counts**: the component renders all selected filenames in a list — limit `multiple` selections in the handler and provide guidance via `hintText` if a maximum count applies.
- **Unsupported file types**: `accept` guides but does not universally enforce file type restrictions in all browsers — validate MIME type or extension in the event handler.
- **Disabled state**: `disabled` prevents interaction entirely; if the field should be visible but not editable, consider showing a read-only summary instead.
- **Form submission**: the component integrates with native form submission via `name`; ensure the server-side handler accepts `multipart/form-data`.

## Quick Decision Guide

**Accept only images?** → `accept="image/*"`

**Accept specific types?** → `accept=".pdf,.docx,.png"`

**Allow multiple files?** → Add `multiple`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

**Button label?** → Place text in the default slot

```html
<!-- Basic file upload (single file) -->
<sgds-file-upload
  label="Upload Document"
  hintText="PDF only, max 10MB"
  name="document"
  accept=".pdf"
>
  Choose File
</sgds-file-upload>

<!-- Multiple files with image filter -->
<sgds-file-upload
  label="Upload Images"
  hintText="JPEG or PNG, max 5MB each"
  name="photos"
  accept="image/jpeg,image/png"
  multiple
>
  Choose Files
</sgds-file-upload>

<!-- With validation -->
<sgds-file-upload
  label="Proof of Identity"
  name="id"
  accept=".pdf,.jpg,.png"
  required
  hasFeedback
  invalidFeedback="Please upload a valid document"
>
  Upload Document
</sgds-file-upload>

<!-- Listen to file selection -->
<sgds-file-upload id="my-upload" name="files" multiple>
  Select Files
</sgds-file-upload>
<script>
  document.getElementById("my-upload").addEventListener("sgds-files-selected", e => {
    const files = e.detail; // FileList
    console.log("Files selected:", files.length);
  });
</script>
```

## API Summary

### `<sgds-file-upload>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | — | Field label above the button |
| `hintText` | string | — | Hint text below the label |
| `name` | string | — | Form field name for submission |
| `accept` | string | `""` | Comma-separated list of accepted MIME types or extensions |
| `multiple` | boolean | `false` | Allows selecting multiple files |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the upload button |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `invalidFeedback` | string | — | Error message when validation fails |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Label text shown on the upload button (e.g. `"Choose File"`) |

## Events

| Event | Detail | When |
|---|---|---|
| `sgds-files-selected` | `FileList` | Files are selected (access via `event.detail`) |

---

**For AI agents**:
1. `event.detail` on `sgds-files-selected` is a `FileList` object — iterate with `for...of` or index access.
2. `accept` values follow standard HTML `accept` syntax: `"image/*"`, `".pdf"`, `"image/jpeg,image/png"`.
3. The component renders selected filenames with close buttons for removal; this UI is handled automatically.
4. There are no public methods on this component.
