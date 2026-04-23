import { html } from "lit";

// Template is in scope via concatenation — no import needed

// ========== DRAG AND DROP VARIANT ==========

export const DragAndDrop = {
  render: Template.bind({}),
  name: "Drag and Drop",
  args: { variant: "drag-and-drop", multiple: true },
  parameters: { layout: "padded" },
  tags: []
};

// ========== VALIDATION STATES ==========

export const ValidationDefaultInvalid = {
  render: Template.bind({}),
  name: "Validation: Default - Invalid",
  args: {
    variant: "default",
    required: true,
    hasFeedback: true,
    invalid: true,
    invalidFeedback: "Please upload at least one file"
  },
  parameters: { layout: "padded" },
  tags: []
};

export const ValidationDragDropInvalid = {
  render: Template.bind({}),
  name: "Validation: Drag and Drop - Invalid",
  args: {
    variant: "drag-and-drop",
    required: true,
    hasFeedback: true,
    invalid: true,
    invalidFeedback: "Please upload at least one file"
  },
  parameters: { layout: "padded" },
  tags: []
};

// ========== UPLOADING STATE ==========

const UploadingStateDefaultTemplate = args => {
  return html`
    <sgds-file-upload id="uploadingStateDefault" label="Upload File"> Choose File </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("uploadingStateDefault");

        const files = [new File(["content"], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");
      }, 0);
    </script>
  `;
};

export const UploadingStateDefault = {
  render: UploadingStateDefaultTemplate.bind({}),
  name: "Uploading State",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

const UploadingStateDragDropTemplate = args => {
  return html`
    <sgds-file-upload id="uploadingStateDragDrop" variant="drag-and-drop" label="Upload File">
      Choose File
    </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("uploadingStateDragDrop");

        const files = [new File(["content"], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");
      }, 0);
    </script>
  `;
};

export const UploadingStateDragDrop = {
  render: UploadingStateDragDropTemplate.bind({}),
  name: "Uploading State - Drag and Drop",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

// ========== ERROR STATE ==========

const ErrorStateDefaultTemplate = args => {
  return html`
    <sgds-file-upload id="errorStateDefault" label="Upload File"> Choose File </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("errorStateDefault");

        const largeContent = new Uint8Array(12 * 1024 * 1024); // 12MB
        const files = [new File([largeContent], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");

        await new Promise(resolve => setTimeout(resolve, 2000));

        fileUpload.setFileUploadState(0, "error", "File size exceeds maximum limit of 10MB");
      }, 0);
    </script>
  `;
};

export const ErrorStateDefault = {
  render: ErrorStateDefaultTemplate.bind({}),
  name: "Error State",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

const ErrorStateDragDropTemplate = args => {
  return html`
    <sgds-file-upload id="errorStateDragDrop" variant="drag-and-drop" label="Upload File">
      Choose File
    </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("errorStateDragDrop");

        const largeContent = new Uint8Array(12 * 1024 * 1024); // 12MB
        const files = [new File([largeContent], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");

        await new Promise(resolve => setTimeout(resolve, 2000));

        fileUpload.setFileUploadState(0, "error", "Unsupported file format. Only DOCX are allowed.");
      }, 0);
    </script>
  `;
};

export const ErrorStateDragDrop = {
  render: ErrorStateDragDropTemplate.bind({}),
  name: "Error State - Drag and Drop",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

// ========== SUCCESS STATE ==========

const SuccessStateDefaultTemplate = args => {
  return html`
    <sgds-file-upload id="successStateDefault" label="Upload File"> Choose File </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("successStateDefault");

        const files = [new File(["content"], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");

        await new Promise(resolve => setTimeout(resolve, 2000));

        fileUpload.setFileUploadState(0, "success");
      }, 0);
    </script>
  `;
};

export const SuccessStateDefault = {
  render: SuccessStateDefaultTemplate.bind({}),
  name: "Success State",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

const SuccessStateDragDropTemplate = args => {
  return html`
    <sgds-file-upload id="successStateDragDrop" variant="drag-and-drop" label="Upload File">
      Choose File
    </sgds-file-upload>
    <script>
      setTimeout(async () => {
        const fileUpload = document.getElementById("successStateDragDrop");

        const files = [new File(["content"], "document.pdf", { type: "application/pdf" })];

        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));

        const input = fileUpload.shadowRoot.querySelector("input");
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await fileUpload.updateComplete;

        fileUpload.setFileUploadState(0, "uploading");

        await new Promise(resolve => setTimeout(resolve, 2000));

        fileUpload.setFileUploadState(0, "success");
      }, 0);
    </script>
  `;
};

export const SuccessStateDragDrop = {
  render: SuccessStateDragDropTemplate.bind({}),
  name: "Success State - Drag and Drop",
  args: {},
  parameters: { layout: "padded" },
  tags: []
};

// ========== UPLOAD TO SERVER ==========

// ========== EVENT: sgds-add-files ==========

const SgdsAddFilesTemplate = args => {
  return html`
    <sgds-file-upload
      id="sgdsAddFilesDemo"
      variant="drag-and-drop"
      ?multiple=${args.multiple}
      label="Listen to sgds-add-files"
      hintText="Select files - sgds-add-files will fire only on file additions, not deletions."
    >
      Choose Files
    </sgds-file-upload>
    <div
      id="addFilesLog"
      style="margin-top: 16px; padding: 12px; background-color: #f5f5f5; border-radius: 4px; max-height: 200px; overflow-y: auto;"
    >
      <div style="font-weight: bold; margin-bottom: 8px;">sgds-add-files events:</div>
    </div>
    <script>
      const fileUpload = document.getElementById("sgdsAddFilesDemo");
      const logElement = document.getElementById("addFilesLog");

      fileUpload.addEventListener("sgds-add-files", async e => {
        const files = e.detail;
        const timestamp = new Date().toLocaleTimeString();
        const fileNames = Array.from(files)
          .map(f => f.name)
          .join(", ");
        const logEntry = document.createElement("div");
        logEntry.textContent = \`[\${timestamp}] Added \${files.length} file(s): \${fileNames}\`;
        logEntry.style.fontSize = "12px";
        logEntry.style.marginBottom = "4px";
        logElement.appendChild(logEntry);
      });
    </script>
  `;
};

export const SgdsAddFiles = {
  render: SgdsAddFilesTemplate.bind({}),
  name: "Event: sgds-add-files",
  args: { multiple: true },
  parameters: { layout: "padded" },
  tags: []
};

// ========== EVENT: sgds-remove-file ==========

const SgdsRemoveFileTemplate = args => {
  return html`
    <sgds-file-upload
      id="sgdsRemoveFileDemo"
      variant="drag-and-drop"
      ?multiple=${args.multiple}
      label="Listen to sgds-remove-file"
      hintText="Select files and delete them - sgds-remove-file will show which file was deleted."
    >
      Choose Files
    </sgds-file-upload>
    <div
      id="removeFileLog"
      style="margin-top: 16px; padding: 12px; background-color: #f5f5f5; border-radius: 4px; max-height: 200px; overflow-y: auto;"
    >
      <div style="font-weight: bold; margin-bottom: 8px;">sgds-remove-file events:</div>
    </div>
    <script>
      setTimeout(() => {
        const fileUpload = document.getElementById("sgdsRemoveFileDemo");
        const logElement = document.getElementById("removeFileLog");

        if (fileUpload && logElement) {
          fileUpload.addEventListener("sgds-remove-file", async e => {
            const timestamp = new Date().toLocaleTimeString();
            const deletedFileName = e.detail.file.name;
            const remainingCount = e.detail.files.length;
            const logEntry = document.createElement("div");
            logEntry.textContent = \`[\${timestamp}] Deleted "\${deletedFileName}" - \${remainingCount} file(s) remaining\`;
            logEntry.style.fontSize = "12px";
            logEntry.style.marginBottom = "4px";
            logElement.appendChild(logEntry);
          });
        }
      }, 0);
    </script>
  `;
};

export const SgdsRemoveFile = {
  render: SgdsRemoveFileTemplate.bind({}),
  name: "Event: sgds-remove-file",
  args: { multiple: true },
  parameters: { layout: "padded" },
  tags: []
};

// ========== EVENT: sgds-change ==========

const SgdsChangeTemplate = args => {
  return html`
    <sgds-file-upload
      id="sgdsChangeDemo"
      variant="drag-and-drop"
      ?multiple=${args.multiple}
      label="Listen to sgds-change"
      hintText="Select or delete files - sgds-change will fire on any file set change."
    >
      Choose Files
    </sgds-file-upload>
    <div
      id="changeLog"
      style="margin-top: 16px; padding: 12px; background-color: #f5f5f5; border-radius: 4px; max-height: 200px; overflow-y: auto;"
    >
      <div style="font-weight: bold; margin-bottom: 8px;">sgds-change events:</div>
    </div>
    <script>
      setTimeout(() => {
        const fileUpload = document.getElementById("sgdsChangeDemo");
        const logElement = document.getElementById("changeLog");

        if (fileUpload && logElement) {
          fileUpload.addEventListener("sgds-change", async e => {
            const timestamp = new Date().toLocaleTimeString();
            const currentCount = e.detail.length;
            const fileNames = Array.from(e.detail)
              .map(f => f.name)
              .join(", ");
            const logEntry = document.createElement("div");
            logEntry.textContent = \`[\${timestamp}] Current: \${currentCount} file(s): \${fileNames}\`;
            logEntry.style.fontSize = "12px";
            logEntry.style.marginBottom = "4px";
            logElement.appendChild(logEntry);
          });
        }
      }, 0);
    </script>
  `;
};

export const SgdsChange = {
  render: SgdsChangeTemplate.bind({}),
  name: "Event: sgds-change",
  args: { multiple: true },
  parameters: { layout: "padded" },
  tags: []
};

// ========== UPLOAD TO SERVER ==========

const UploadToServerTemplate = args => {
  return html`
    <sgds-file-upload
      id="uploadToServerDemo"
      variant="drag-and-drop"
      ?multiple=${args.multiple}
      label="Upload to Server"
      hintText="Select multiple files to upload. Simulates server upload with some files succeeding and some failing."
    >
      Choose Files
    </sgds-file-upload>
    <script>
      setTimeout(() => {
        const fileUpload = document.getElementById("uploadToServerDemo");

        if (fileUpload) {
          fileUpload.addEventListener("sgds-add-files", async e => {
            const newFiles = e.detail; // Only contains newly-added files
            const allFiles = fileUpload.files;

            // Calculate the starting index of the new files
            const startIndex = allFiles.length - newFiles.length;

            // Show uploading state for NEW files only
            for (let i = 0; i < newFiles.length; i++) {
              fileUpload.setFileUploadState(startIndex + i, "uploading");
            }

            // Simulate server upload with delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate: even-indexed files succeed, odd-indexed files fail
            for (let i = 0; i < newFiles.length; i++) {
              const fileIndex = startIndex + i;
              if (fileIndex % 2 === 0) {
                fileUpload.setFileUploadState(fileIndex, "success");
              } else {
                fileUpload.setFileUploadState(
                  fileIndex,
                  "error",
                  "Server validation failed. File format not supported."
                );
              }
            }
          });
        }
      }, 0);
    </script>
  `;
};

export const UploadToServer = {
  render: UploadToServerTemplate.bind({}),
  name: "Upload to Server",
  args: { multiple: true },
  parameters: { layout: "padded" },
  tags: []
};
