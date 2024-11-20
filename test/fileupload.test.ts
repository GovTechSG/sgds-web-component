import "./sgds-web-component";
import { expect, fixture, oneEvent } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsFileUpload, SgdsButton } from "../src/components";

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
      await el.updateComplete;

      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(1);
    }
  });
});
