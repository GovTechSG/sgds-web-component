# File Upload

**Purpose**: A file selection button that displays selected files in a list below. Supports multiple files, file type filtering, and custom UI.

**Component**: `<sgds-file-upload>`

---

## Usage

```html
<!-- Basic file upload -->
<sgds-file-upload
  label="Upload Document"
  name="document">
</sgds-file-upload>

<!-- Accept specific file types -->
<sgds-file-upload
  label="Upload Image"
  name="image"
  accept="image/png, image/jpeg, image/gif">
</sgds-file-upload>

<!-- Multiple files -->
<sgds-file-upload
  label="Upload Files"
  name="files"
  multiple>
</sgds-file-upload>

<!-- With hint text -->
<sgds-file-upload
  label="Attach Supporting Documents"
  hintText="PDF, Word, or Excel files only. Max 10MB each."
  accept=".pdf,.doc,.docx,.xls,.xlsx"
  multiple>
</sgds-file-upload>

<!-- With validation feedback -->
<sgds-file-upload
  label="Required Attachment"
  name="attachment"
  required
  hasFeedback
  invalidFeedback="Please attach a document">
</sgds-file-upload>

<!-- Read selected files -->
<sgds-file-upload id="fu" label="Select Files"></sgds-file-upload>
<script>
  document.getElementById("fu").addEventListener("sgds-files-selected", (e) => {
    const files = e.detail.files; // FileList
    Array.from(files).forEach(f => console.log(f.name, f.size));
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name |
| `accept` | string | — | Accepted file types (MIME types or extensions) |
| `multiple` | boolean | `false` | Allow selecting multiple files |
| `disabled` | boolean | `false` | Disables the upload button |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | boolean | `false` | Shows validation feedback |
| `checkedIcon` | string | `check-circle-fill` | Icon shown for valid files |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Custom button label (replaces default "Choose files" text) |

## Events

| Event | Description |
|---|---|
| `sgds-files-selected` | Fires when files are selected. `event.detail.files` is a `FileList`. |

---

## Notes

- The component renders a file list below the button showing each selected file.
- Use `accept` with MIME types (e.g., `image/png`) or extensions (e.g., `.pdf,.docx`).
- Access selected files from `event.detail.files` or `element.files`.
