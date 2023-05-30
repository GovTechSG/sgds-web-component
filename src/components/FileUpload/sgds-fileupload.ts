import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

@customElement("sgds-fileupload")
export class SgdsFileUpload extends SgdsElement {

  static styles = [SgdsElement.styles, styles];
  
  /** The button's variant. */
  @property({ reflect: true }) variant: FileUploadButtonVariant = "primary";

  // /** Sets a unique id to the file input, required. */
  // @property({ type: String }) controlId = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  multiple = false;

  @property({ type: Boolean, reflect: true })
  accept = "";

  /** Button sizes */
  @property({ reflect: true }) size: "sm" | "lg";

  @property({ type: String })
  checkedIcon? = "";

  @property({ type: String })
  cancelIcon? = "";

  @property({ type: FileList })
  private fileList: FileList | undefined;

  @property({ type: Array })
  private selectedFiles: File[] = [];

  constructor() {
    super();
    this.addEventListener("sgds-files-selected", () => {
      this.selectedFiles = Array.from(this.fileList || []);
      this.emit("selected-files-changed", {
        detail: { selectedFiles: this.selectedFiles }
      });
    });
  }

  setFileList(fileList) {
    this.fileList = fileList[0];
    this.emit("sgds-files-selected");
  }

  // Create a ref to the input element
  private inputRef = createRef<HTMLInputElement>();

  private handleClick(event: Event) {
    event.preventDefault();
    if (!this.disabled) {
      // Get a reference to the input element using the inputRef
      const inputElement = this.inputRef.value;
      // Do something with the input element
      inputElement.click();
    }
  }

  private handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files as FileList;


    if (fileList.length > 0) {
      this.selectedFiles = Array.from(fileList);
    }
    // Trigger a re-render of the component to update the list of selected files
    this.requestUpdate();

  }

  removeFileHandler(index: number) {
    const inputElement = this.inputRef.value;
    const attachments = inputElement.files;

    const fileBuffer = new DataTransfer();
    for (let i = 0; i < attachments.length; i++) {
      if (index !== i) fileBuffer.items.add(attachments[i]);
    }

    // Assign buffer to file input
    inputElement.files = fileBuffer.files;

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
      return html`
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        class="bi bi-file-earmark-check-fill" 
        viewBox="0 0 16 16"
        >
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
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
      <form>
          <input
            ${ref(this.inputRef)}
            type="file"
            class="d-none form-control"
            @change=${this.handleInputChange}
            ?multiple=${this.multiple}
            accept=${ifDefined(this.accept)}
          />
          <sgds-button 
            size=${this.size} 
            variant=${this.variant} 
            ?disabled=${this.disabled} 
            @click=${this.handleClick}>
              <slot></slot>
          </sgds-button>
      </form>
      <ul class="sgds fileupload-list">
        ${listItems}
      </ul>
    `;
  }
}

export default SgdsFileUpload;
