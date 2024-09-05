import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsButton } from "../Button/sgds-button";
import styles from "./sgds-file-upload.scss";
import genId from "../../utils/generateId";
export type FileUploadButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-light"
  | "outline-dark";

/**
 * @summary Allows users to upload files of various sizes and formats
 * @slot default - Label for file upload button
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading
 *
 * @cssproperty --fileupload-file-icon-fill - Left icon fill color
 * @cssproperty --fileupload-remove-icon-fill - Remove icon fill color
 * @cssproperty --fileupload-remove-icon-hover-fill - Remove icon mouse over fill color
 *
 */

export class SgdsFileUpload extends ScopedElementsMixin(SgdsElement) {
  static styles = [SgdsElement.styles, styles];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-button": SgdsButton
    };
  }
  /** The button's variant. */
  @property({ reflect: true }) variant: FileUploadButtonVariant = "primary";

  // /** Sets a unique id to the file input, required. */
  // @property({ type: String }) controlId = "";
  //** Disable the fileuploader button */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Allows multiple files to be listed for uploading */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /** Specifies the starting active page upon render*/
  @property({ type: Number }) maxFiles: number;

  /** Specify the acceptable file type  */
  @property({ type: String, reflect: true })
  accept = "";

  /** Specifies a large or small button */
  @property({ reflect: true }) size: "sm" | "lg";

  /** Customize the check icon with SVG */
  @property({ type: String })
  checkedIcon = "";

  /** Customize the cancel icon with SVG */
  @property({ type: String })
  cancelIcon = "";

  /** @internal */
  @property({ type: Object, state: true })
  private files: FileList | undefined;

  /** @internal */
  @property({ type: Array })
  private selectedFiles: File[] = [];

  setFileList(files: FileList) {
    this.files = files;
    this.emit("sgds-files-selected");
    //Possible to pass in the files
  }

  /**@internal */
  @state()
  private invalidFeedback: string;

  // Create a ref to the input element
  /** @internal */
  private inputRef = createRef<HTMLInputElement>();

  /** @internal */
  private handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement.click();
    }
  }

  /** @internal */
  private _handleDragOver(event: DragEvent) {
    event.preventDefault();
    this.shadowRoot?.querySelector("#drag-drop-area").classList.add("dragover");
  }

  /** @internal */
  private _handleDragLeave(event: DragEvent) {
    event.preventDefault();
    this.shadowRoot?.querySelector("#drag-drop-area").classList.remove("dragover");
  }

  /** @internal */
  private _handleFileList(files: FileList) {
    if (files.length) {
      if (files.length > 5) {
        this.invalidFeedback = "You can upload a maximum of 5 files.";
        this.selectedFiles = [];
        return;
      }

      let valid = true;
      const acceptedTypes = this.accept.split(",").map(type => type.trim());
      for (let i = 0; i < files.length; i++) {
        if (!this._isFileTypeAccepted(files[i], acceptedTypes)) {
          this.invalidFeedback = `File type not accepted: ${files[i].name}`;
          valid = false;
          break;
        }

        if (files[i].size > 10 * 1024 * 1024) {
          // 10MB in bytes
          this.invalidFeedback = "File size exceeds 10MB.";
          valid = false;
          break;
        }
      }

      if (valid) {
        this.invalidFeedback = "";
        this.selectedFiles = Array.from(files);
      } else {
        this.selectedFiles = [];
      }
    }

    // Trigger a re-render of the component to update the list of selected files
    this.setFileList(files);
    this.requestUpdate();
  }

  /** @internal */
  private _isFileTypeAccepted(file: File, acceptedTypes: string[]) {
    return acceptedTypes.some(type => {
      if (type.startsWith(".")) {
        return file.name.endsWith(type);
      } else if (type.endsWith("/*")) {
        return file.type.startsWith(type.slice(0, -2));
      } else {
        return file.type === type;
      }
    });
  }

  /** @internal */
  private _handleDropFile(event: DragEvent) {
    event.preventDefault();
    this.shadowRoot?.querySelector("#drag-drop-area").classList.remove("dragover");

    const files = event.dataTransfer.files;
    const inputElement = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    inputElement.files = files;
    this._handleFileList(files);
  }

  /** @internal */
  private handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files as FileList;
    this._handleFileList(files);
  }

  /** @internal */
  removeFileHandler(index: number) {
    const inputElement = this.inputRef.value;
    const attachments = inputElement.files;

    const fileBuffer = new DataTransfer();
    for (let i = 0; i < attachments.length; i++) {
      if (index !== i) fileBuffer.items.add(attachments[i]);
    }

    // Assign buffer to file input
    inputElement.files = fileBuffer.files;
    // Re-populate selected files to the lists
    this.setFileList(fileBuffer.files);
    this.selectedFiles = Array.from(fileBuffer.files);

    // Trigger a re-render of the component to update the list of selected files
    this.requestUpdate();
  }

  /**@internal */
  protected inputId: string = genId("input", "file");

  render() {
    const getCheckedIcon = (checkedIcon: string) => {
      if (checkedIcon) {
        return html`${unsafeSVG(checkedIcon)}`;
      }
      return html` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
        />
      </svg>`;
    };

    const getCancelIcon = (cancelIcon: string) => {
      if (cancelIcon) {
        return html`${unsafeSVG(cancelIcon)}`;
      }
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="red"
        class="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>`;
    };

    const listItems = this.selectedFiles.map(
      (file, index) => html`
        <li key=${index} class="fileupload-list-item d-flex gap-2">
          <span>${getCheckedIcon(this.checkedIcon)}</span>
          <span class="filename">${file.name}</span>
          <span @click=${() => this.removeFileHandler(index)}>${getCancelIcon(this.cancelIcon)}</span>
        </li>
      `
    );

    return html`
      <input
        ${ref(this.inputRef)}
        type="file"
        class="d-none form-control ${classMap({
          "is-invalid": this.invalidFeedback
        })}"
        @change=${this.handleInputChange}
        ?multiple=${this.multiple}
        accept=${this.accept}
        id=${this.inputId}
      />
      <div
        id="drag-drop-area"
        class="drag-drop-area"
        @click=${this.handleClick}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDropFile}
      >
        <div class="icon"><slot name="icon"></slot></div>
        <slot></slot>
      </div>
      <div class="invalid-feedback">${this.invalidFeedback}</div>

      <ul class="sgds fileupload-list">
        ${listItems}
      </ul>
    `;
  }
}

export default SgdsFileUpload;
