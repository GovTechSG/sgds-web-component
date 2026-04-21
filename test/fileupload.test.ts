import "./sgds-web-component";
import { expect, fixture, oneEvent, waitUntil, aTimeout } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsFileUpload, SgdsButton, SgdsIcon } from "../src/components";
import SgdsCloseButton from "../src/components/CloseButton/sgds-close-button";

describe("sgds-file-upload", () => {
  it("should be able to pass in content in between the slot", async () => {
    const el = await fixture<SgdsFileUpload>(html` <sgds-file-upload>Hello</sgds-file-upload> `);

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).to.exist;

    const slotContent = slot?.assignedNodes()[0].textContent;
    expect(slotContent).to.equal("Hello");
  });

  it("Should output a child input element", async () => {
    const el = await fixture(html`<sgds-file-upload></sgds-file-upload>`);
    expect(el.shadowRoot?.querySelector("input")).to.exist;
  });

  it("Should output a child sgds-button element", async () => {
    const el = await fixture(html`<sgds-file-upload></sgds-file-upload>`);
    expect(el.shadowRoot?.querySelector("sgds-button")).to.exist;
  });

  it("Should not display the input element modal popup when disabled prop is true", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload disabled></sgds-file-upload>`);

    // simulate click on the button
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton)?.click();

    // check if the input element modal popup is not displayed
    const inputEl = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(inputEl.hasAttribute("open")).to.be.false;
  });

  it("adds multiple attribute to input eement", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple></sgds-file-upload>`);

    // check if the input element modal popup is not displayed
    const inputEl = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(inputEl.hasAttribute("multiple")).to.be.true;
  });

  it("adds multiple attribute to input element", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload accept="test"></sgds-file-upload>`);
    const inputEl = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(inputEl.hasAttribute("accept")).to.be.true;
    expect(inputEl?.getAttribute("accept")).to.equal("test");
  });

  it("should render a ul with list of selected files using DataTransfer object", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await el.updateComplete;
      const listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      expect(listItems?.[0].querySelector(".filename")?.textContent).to.equal("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.equal("file2.txt");
    }
  });

  it("should render a ul with list of selected files using DataTransfer object and trigger sgds-change event", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-files-selected"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise; // wait for the event to be triggered
      // returns a promise that resolves when the specified event is dispatched from the component.

      const listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      expect(listItems?.[0].querySelector(".filename")?.textContent).to.equal("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.equal("file2.txt");
    }
  });
  it("should remove a file from the list when the removefileHandler is clicked", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-files-selected"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise; // wait for the event to be triggered

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      const removeBtn = listItems?.[0].querySelector(".file-upload-list-item sgds-close-button");
      removeBtn?.dispatchEvent(new Event("click"));
      await aTimeout(300); // wait for animation to complete
      await el.updateComplete;

      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(1);
    }
  });
  it("get files() method returns the selectedFiles", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await el.updateComplete;

      expect(el.files).to.deep.equal(fileList);
    }
  });
  it("should add file-upload-exit class immediately when close button is clicked", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      const removeBtn = listItems?.[0].querySelector("sgds-close-button");

      removeBtn?.dispatchEvent(new Event("click"));
      await el.updateComplete;

      // Exit class should be applied, file still in DOM during animation
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.[0].classList.contains("file-upload-exit")).to.be.true;
      expect(listItems?.length).to.equal(2);
    }
  });
  it("should remove file from DOM after animation completes", async () => {
    const fileList = [new File(["file1"], "file1.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;

      const listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      const removeBtn = listItems?.[0].querySelector("sgds-close-button");
      removeBtn?.dispatchEvent(new Event("click"));

      // After animation completes
      await aTimeout(300);
      await el.updateComplete;
      const finalItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(finalItems?.length).to.equal(0);
    }
  });
});

describe("Fileupload validation", () => {
  it("has constraint validation for required prop", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-file-upload required hasFeedback></sgds-file-upload>
      </form>
    `);
    const upload = form.querySelector("sgds-file-upload");
    expect(form.reportValidity()).to.be.false;
    await waitUntil(() => upload?.invalid);

    expect(upload?.shadowRoot?.querySelector("div.invalid-feedback")).to.exist;
  });
  it("form resets remove any selectedFiles", async () => {
    const fileList = [new File(["file1"], "file1.txt"), new File(["file2"], "file2.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-file-upload required hasFeedback></sgds-file-upload>
      </form>
    `);
    const fileupload = form.querySelector<SgdsFileUpload>("sgds-file-upload");
    const input = fileupload?.shadowRoot?.querySelector("input");
    if (input && fileupload) {
      const promise = oneEvent(fileupload, "sgds-files-selected"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise;
      const listItems = fileupload?.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);
      expect(form.reportValidity()).to.be.true;
    }

    form.reset();

    await waitUntil(() => fileupload?.shadowRoot?.querySelectorAll(".file-upload-list-item").length === 0);
    expect(fileupload?.shadowRoot?.querySelectorAll(".file-upload-list-item").length).to.equal(0);
    expect(form.reportValidity()).to.be.false;
  });
  it("when files are cleared, it resets the validity of the component", async () => {
    const fileList = [new File(["file1"], "file1.txt")];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-file-upload required hasFeedback></sgds-file-upload>
      </form>
    `);
    expect(form.reportValidity()).to.be.false;
    const fileupload = form.querySelector<SgdsFileUpload>("sgds-file-upload");
    const input = fileupload?.shadowRoot?.querySelector("input");
    if (input && fileupload) {
      const promise = oneEvent(fileupload, "sgds-files-selected"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise;
      const listItems = fileupload?.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(1);
      expect(form.reportValidity()).to.be.true;

      const cancelButtonOnListItems = fileupload?.shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
      cancelButtonOnListItems?.click();
      await aTimeout(300); // wait for animation to complete
      await fileupload?.updateComplete;
      expect(form.reportValidity()).to.be.false;
    }
  });
});

describe("sgds-file-upload variant prop", () => {
  it("renders default variant with button when variant is 'default'", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="default"></sgds-file-upload>`);

    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");
    expect(button).to.exist;
  });

  it("renders default variant by default when variant prop is not specified", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload></sgds-file-upload>`);

    const button = el.shadowRoot?.querySelector<HTMLElement>("sgds-button");
    expect(button).to.exist;
  });

  it("renders drag-and-drop variant with upload icon and text when variant is 'drag-and-drop'", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);

    const dragDropDiv = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    expect(dragDropDiv).to.exist;

    // Check for icon
    const icon = dragDropDiv?.querySelector<SgdsIcon>("sgds-icon");
    expect(icon).to.exist;
    expect(icon?.getAttribute("name")).to.equal("upload");
    expect(icon?.getAttribute("size")).to.equal("lg");

    // Check for text container
    const textDiv = dragDropDiv?.querySelector<HTMLElement>(".drag-drop-text");
    expect(textDiv).to.exist;
  });

  it("drag-and-drop zone should have correct styling classes", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);

    const dragDropDiv = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    expect(dragDropDiv?.classList.contains("drag-drop-zone")).to.be.true;
  });
});

describe("sgds-file-upload drag-and-drop interactions", () => {
  function makeDragEvent(type: string, files: File[] = []): DragEvent {
    const dt = new DataTransfer();
    files.forEach(f => dt.items.add(f));
    return new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt });
  }

  it("drag-drop zone has tabindex='0' to be focusable", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    expect(zone?.getAttribute("tabindex")).to.equal("0");
  });

  it("dragenter focuses the drag-drop zone", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    zone?.dispatchEvent(makeDragEvent("dragenter"));
    expect(el.shadowRoot?.activeElement).to.equal(zone);
  });

  it("dragleave after dragenter blurs the drag-drop zone", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    zone?.dispatchEvent(makeDragEvent("dragenter"));
    zone?.dispatchEvent(makeDragEvent("dragleave"));
    expect(el.shadowRoot?.activeElement).to.not.equal(zone);
  });

  it("drop appends files to the file list", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload variant="drag-and-drop" multiple></sgds-file-upload>`
    );
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    const file = new File(["content"], "test.pdf", { type: "application/pdf" });
    zone?.dispatchEvent(makeDragEvent("drop", [file]));
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
    expect(items?.length).to.equal(1);
    expect(el.shadowRoot?.querySelector(".filename")?.textContent).to.equal("test.pdf");
  });

  it("drop with multiple=false keeps only the first file", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop"></sgds-file-upload>`);
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    const files = [
      new File(["a"], "a.pdf", { type: "application/pdf" }),
      new File(["b"], "b.pdf", { type: "application/pdf" })
    ];
    zone?.dispatchEvent(makeDragEvent("drop", files));
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
    expect(items?.length).to.equal(1);
  });

  it("drop does nothing when disabled", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload variant="drag-and-drop" disabled></sgds-file-upload>`
    );
    const zone = el.shadowRoot?.querySelector<HTMLElement>(".drag-drop-zone");
    const file = new File(["content"], "test.pdf", { type: "application/pdf" });
    zone?.dispatchEvent(makeDragEvent("drop", [file]));
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
    expect(items?.length).to.equal(0);
  });
});
