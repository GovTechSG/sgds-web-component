import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-fileupload.scss";
import SgdsElement from "../../base/sgds-element";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { createRef, ref } from "lit/directives/ref.js";

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
 * @slot default - Label for fileuploader button
 *
 * @event sgds-files-selected - Emitted when files are selected for uploading
 *
 * @cssproperty --fileuploader-file-icon-fill - Left icon fill color
 * @cssproperty --fileuploader-remove-icon-fill - Remove icon fill color
 * @cssproperty --fileuploader-remove-icon-hover-fill - Remove icon mouse over fill color
 *
 */

@customElement("sgds-fileupload")
export class SgdsFileUpload extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** The button's variant. */
  @property({ reflect: true }) variant: FileUploadButtonVariant = "primary";

  // /** Sets a unique id to the file input, required. */
  // @property({ type: String }) controlId = "";
  //** Disable the fileuploader button */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /** Allows multiple files to be listed for uploading */
  @property({ type: Boolean, reflect: true })
  multiple: boolean = false;

  /** Specify the acceptable file type  */
  @property({ type: String, reflect: true })
  accept: string = "";

  /** Specifies a large or small button */
  @property({ reflect: true }) size: "sm" | "lg";

  /** Customize the check icon with SVG */
  @property({ type: String })
  checkedIcon: string = "";

  /** Customize the cancel icon with SVG */
  @property({ type: String })
  cancelIcon: string = "";

  /** @internal */
  @property({ type: FileList })
  private fileList: FileList | undefined;

  /** @internal */
  @property({ type: Array })
  private selectedFiles: File[] = [];

  setFileList(fileList) {
    this.fileList = fileList;
    this.emit("sgds-files-selected");
    //Possible to pass in the fileList
  }

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
  private handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files as FileList;

    if (fileList.length > 0) {
      this.selectedFiles = Array.from(fileList);
    }
    // Trigger a re-render of the component to update the list of selected files
    this.setFileList(fileList);
    this.requestUpdate();
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
        class="d-none form-control"
        @change=${this.handleInputChange}
        ?multiple=${this.multiple}
        accept=${this.accept}
      />
      <sgds-button size=${this.size} variant=${this.variant} ?disabled=${this.disabled} @click=${this.handleClick}>
        <slot></slot>
      </sgds-button>

      <ul class="sgds fileupload-list">
        ${listItems}
      </ul>
    `;
  }
}

export default SgdsFileUpload;
