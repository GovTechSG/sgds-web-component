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

// ========== UPLOADING STATE ==========

const UploadingStateDefaultTemplate = args => {
  return html`
    <sgds-file-upload id="uploadingStateDefault" label="Upload Files"> Choose Files </sgds-file-upload>
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
    <sgds-file-upload id="uploadingStateDragDrop" variant="drag-and-drop" label="Upload Files">
      Choose Files
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
    <sgds-file-upload id="errorStateDefault" label="Upload Files"> Choose Files </sgds-file-upload>
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
    <sgds-file-upload id="errorStateDragDrop" variant="drag-and-drop" label="Upload Files">
      Choose Files
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
    <sgds-file-upload id="successStateDefault" label="Upload Files"> Choose Files </sgds-file-upload>
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
    <sgds-file-upload id="successStateDragDrop" variant="drag-and-drop" label="Upload Files">
      Choose Files
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
      const fileUpload = document.getElementById("uploadToServerDemo");

      fileUpload.addEventListener("sgds-files-selected", async e => {
        const files = e.detail;

        // Show uploading state for all files
        for (let i = 0; i < files.length; i++) {
          fileUpload.setFileUploadState(i, "uploading");
        }

        // Simulate server upload with delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate: even-indexed files succeed, odd-indexed files fail
        for (let i = 0; i < files.length; i++) {
          if (i % 2 === 0) {
            fileUpload.setFileUploadState(i, "success");
          } else {
            fileUpload.setFileUploadState(i, "error", "Server validation failed. File format not supported.");
          }
        }
      });
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
