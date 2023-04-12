import {
  fixture,
  assert,
  expect,
  aTimeout,
  waitUntil,
  elementUpdated,
  oneEvent,
} from "@open-wc/testing";
import { html } from "lit";
import sinon, { SinonSpy } from "sinon";
import { SgdsFileUpload } from "../src/FileUpload";
import "../src/FileUpload";

describe("sgds-fileupload", () => {
  it("should be able to pass in content in between the slot", async () => {
    const el = await fixture<SgdsFileUpload>(html`
      <sgds-fileupload>Hello</sgds-fileupload>
    `);

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).to.exist;

    const slotContent = slot!.assignedNodes()[0].textContent;
    expect(slotContent).to.equal("Hello");
  });

  it("Should output a child input element", async () => {
    const el = await fixture(html`<sgds-fileupload></sgds-fileupload>`);
    expect(el.shadowRoot!.querySelector("input")).to.exist;
  });

  it("Should output a child sgds-button element", async () => {
    const el = await fixture(html`<sgds-fileupload></sgds-fileupload>`);
    expect(el.shadowRoot!.querySelector("sgds-button")).to.exist;
  });

  it("Should not display the input element modal popup when disabled prop is true", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-fileupload disabled></sgds-fileupload>`
    );

    // simulate click on the button
    (el.shadowRoot!.querySelector("sgds-button") as HTMLButtonElement)?.click();

    // check if the input element modal popup is not displayed
    const inputEl = el.shadowRoot!.querySelector("input") as HTMLInputElement;
    expect(inputEl.hasAttribute("open")).to.be.false;
  });

  it("should render a ul with list of selected files using DataTransfer object", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
    ];
    const dt = new DataTransfer();
    fileList.forEach((file) => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(
      html`<sgds-fileupload>Hello</sgds-fileupload>`
    );
    const input = el.shadowRoot!.querySelector<HTMLInputElement>("input");
    if (input) {
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await el.updateComplete;

      const listItems = el.shadowRoot!.querySelectorAll(
        ".fileupload-list-item"
      );
      expect(listItems.length).to.equal(2);

      expect(listItems[0].querySelector(".filename")!.textContent).to.equal(
        "file1.txt"
      );
      expect(listItems[1].querySelector(".filename")!.textContent).to.equal(
        "file2.txt"
      );
    }
  });

  it("should render a ul with list of selected files using DataTransfer object and trigger sgds-change event", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
    ];
    const dt = new DataTransfer();
    fileList.forEach((file) => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(
      html`<sgds-fileupload>Hello</sgds-fileupload>`
    );
    const input = el.shadowRoot!.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-change"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise; // wait for the event to be triggered
      // returns a promise that resolves when the specified event is dispatched from the component.

      const listItems = el.shadowRoot!.querySelectorAll(
        ".fileupload-list-item"
      );
      expect(listItems.length).to.equal(2);

      expect(listItems[0].querySelector(".filename")!.textContent).to.equal(
        "file1.txt"
      );
      expect(listItems[1].querySelector(".filename")!.textContent).to.equal(
        "file2.txt"
      );
    }
  });
  it("should remove a file from the list when the removefileHandler is clicked", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
    ];
    const dt = new DataTransfer();
    fileList.forEach((file) => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(
      html`<sgds-fileupload>Hello</sgds-fileupload>`
    );
    const input = el.shadowRoot!.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-change"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise; // wait for the event to be triggered

      let listItems = el.shadowRoot!.querySelectorAll(".fileupload-list-item");
      expect(listItems.length).to.equal(2);

      const removeBtn = listItems[0].querySelector(
        ".fileupload-list-item span:last-child"
      );
      console.log("removeBtn", removeBtn);
      removeBtn?.dispatchEvent(new Event("click"));
      await el.updateComplete;

      listItems = el.shadowRoot!.querySelectorAll(".fileupload-list-item");
      expect(listItems.length).to.equal(1);
    }
  });
  it("should be able to pass in SVG icons as string for both checkedIcon and cancelIcon", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
    ];
    const dt = new DataTransfer();
    fileList.forEach((file) => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(
      html`<sgds-fileupload
        checkedIcon='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle align-middle ms-2" viewBox="0 0 16 16">
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
    </svg>'
        cancelIcon='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon align-middle me-2" viewBox="0 0 16 16">
      <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>'
        >Hello</sgds-fileupload
      >`
    );
    const input = el.shadowRoot!.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-change"); // add event listener to the component
      input.files = dt.files;
      const changeEvent = new Event("change");
      input.dispatchEvent(changeEvent);
      await promise; // wait for the event to be triggered

      let listItems = el.shadowRoot!.querySelectorAll(".fileupload-list-item");
      expect(listItems.length).to.equal(2);

      const checkedIconSvg = listItems[0].querySelector(
        ".fileupload-list-item .bi-check2-circle"
      );
      const cancelIconSvg = listItems[0].querySelector(
        ".fileupload-list-item .bi-x-octagon"
      );
     
      expect(checkedIconSvg).to.exist;
      expect(cancelIconSvg).to.exist;
    }
  });
});
