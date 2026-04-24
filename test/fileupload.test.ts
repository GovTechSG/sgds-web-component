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

      // Verify exit animation is applied to the correct file (file1.txt)
      const removeBtn = listItems?.[0].querySelector("sgds-close-button");
      removeBtn?.dispatchEvent(new Event("click"));
      await el.updateComplete;

      // Check that file-upload-exit class is on the first file
      const exitingItems = el.shadowRoot?.querySelectorAll(".file-upload-exit");
      expect(exitingItems?.length).to.equal(1);
      expect(exitingItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");

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

      let containers = el.shadowRoot?.querySelectorAll(".file-upload-list-item-container");
      const removeBtn = containers?.[0].querySelector("sgds-close-button");

      removeBtn?.dispatchEvent(new Event("click"));
      await el.updateComplete;

      // Exit class should be applied to container, file still in DOM during animation
      containers = el.shadowRoot?.querySelectorAll(".file-upload-list-item-container");
      expect(containers?.[0].classList.contains("file-upload-exit")).to.be.true;
      expect(containers?.length).to.equal(2);
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
  it("should apply error class when file has error state", async () => {
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
      await el.updateComplete;

      el.setFileUploadState(0, "error", "File size exceeds limit");
      await el.updateComplete;

      const listItem = el.shadowRoot?.querySelector(".file-upload-list-item");
      expect(listItem?.classList.contains("file-upload-error")).to.be.true;
    }
  });
  it("should display error message when file has error state", async () => {
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
      await el.updateComplete;

      const errorMsg = "File size exceeds limit";
      el.setFileUploadState(0, "error", errorMsg);
      await el.updateComplete;

      const errorContainer = el.shadowRoot?.querySelector(".invalid-feedback");
      expect(errorContainer?.textContent).to.equal(errorMsg);
    }
  });
  it("should display error icon when file has error state", async () => {
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
      await el.updateComplete;

      el.setFileUploadState(0, "error", "Upload failed");
      await el.updateComplete;

      const errorContainer = el.shadowRoot?.querySelector(".invalid-feedback-container");
      const icon = errorContainer?.querySelector('sgds-icon[name="exclamation-circle-fill"]');
      expect(icon).to.exist;
    }
  });
  it("should disable close button when file is in loading state", async () => {
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
      await el.updateComplete;

      el.setFileUploadState(0, "loading");
      await el.updateComplete;

      const closeBtn = el.shadowRoot?.querySelector("sgds-close-button");
      expect(closeBtn?.hasAttribute("disabled")).to.be.true;
    }
  });
  it("should add new files to existing files when multiple is true", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // Select first batch of files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["file1"], "file1.txt"));
      dt1.items.add(new File(["file2"], "file2.txt"));

      const promise1 = oneEvent(el, "sgds-files-selected");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await promise1;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      // Select second batch of files
      const dt2 = new DataTransfer();
      dt2.items.add(new File(["file3"], "file3.txt"));
      dt2.items.add(new File(["file4"], "file4.txt"));

      const promise2 = oneEvent(el, "sgds-files-selected");
      input.files = dt2.files;
      input.dispatchEvent(new Event("change"));
      await promise2;
      await el.updateComplete;

      // Should have 4 files total (file1, file2, file3, file4)
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(4);
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file2.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file3.txt");
      expect(listItems?.[3].querySelector(".filename")?.textContent).to.include("file4.txt");
    }
  });
  it("should not duplicate files when removing one from multiple selected files", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // Select first batch of 3 files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["file1"], "file1.txt"));
      dt1.items.add(new File(["file2"], "file2.txt"));
      dt1.items.add(new File(["file3"], "file3.txt"));

      const promise1 = oneEvent(el, "sgds-files-selected");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await promise1;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(3);

      // Delete the middle file (file2)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      // Should have 2 files left (file1, file3) - NOT duplicated
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file3.txt");
    }
  });
  it("should preserve upload state of remaining files when one is removed", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
      new File(["file3"], "file3.txt")
    ];
    const dt = new DataTransfer();
    fileList.forEach(file => {
      dt.items.add(file);
    });

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    if (input) {
      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;
      await el.updateComplete;

      // Set all files to loading
      el.setFileUploadState(0, "loading");
      el.setFileUploadState(1, "loading");
      el.setFileUploadState(2, "loading");
      await el.updateComplete;

      // Remove first file
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      // Files 1 and 2 should still be loading (now at indices 0 and 1)
      const spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(2);
    }
  });

  it("sgds-files-selected event detail files should sync with UI across selections and removals", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // First selection: 2 files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      const promise1 = oneEvent(el, "sgds-files-selected");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      const event1 = (await promise1) as CustomEvent;
      await el.updateComplete;

      // Verify event detail matches UI
      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      let eventFiles = event1.detail as FileList;
      expect(eventFiles.length).to.equal(2);
      expect(listItems?.length).to.equal(2);
      expect(eventFiles[0].name).to.equal("file1.txt");
      expect(eventFiles[1].name).to.equal("file2.txt");

      // Second selection: add 2 more files
      const dt2 = new DataTransfer();
      dt2.items.add(new File(["content3"], "file3.txt"));
      dt2.items.add(new File(["content4"], "file4.txt"));

      const promise2 = oneEvent(el, "sgds-files-selected");
      input.files = dt2.files;
      input.dispatchEvent(new Event("change"));
      const event2 = (await promise2) as CustomEvent;
      await el.updateComplete;

      // Verify event detail matches UI (4 files total)
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      eventFiles = event2.detail as FileList;
      expect(eventFiles.length).to.equal(4);
      expect(listItems?.length).to.equal(4);
      expect(eventFiles[0].name).to.equal("file1.txt");
      expect(eventFiles[1].name).to.equal("file2.txt");
      expect(eventFiles[2].name).to.equal("file3.txt");
      expect(eventFiles[3].name).to.equal("file4.txt");

      // Remove the second file (file2.txt)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      // Verify UI and component.files both reflect the removal
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      const componentFiles = el.files;
      expect(listItems?.length).to.equal(3);
      expect(componentFiles.length).to.equal(3);
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file3.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file4.txt");
      expect(componentFiles[0].name).to.equal("file1.txt");
      expect(componentFiles[1].name).to.equal("file3.txt");
      expect(componentFiles[2].name).to.equal("file4.txt");
    }
  });

  it("sgds-add-files fires ONLY when files are added, not when removed", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let addFilesEventCount = 0;
      el.addEventListener("sgds-add-files", () => {
        addFilesEventCount++;
      });

      // Select 2 files - should fire sgds-add-files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(addFilesEventCount).to.equal(1);

      // Delete one file - should NOT fire sgds-add-files
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      expect(addFilesEventCount).to.equal(1); // Still 1, not incremented
    }
  });

  it("sgds-remove-file fires ONLY when files are removed, not when added", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let removeFilesEventCount = 0;
      el.addEventListener("sgds-remove-file", () => {
        removeFilesEventCount++;
      });

      // Select 2 files - should NOT fire sgds-remove-file
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(removeFilesEventCount).to.equal(0); // Not fired

      // Delete one file - should fire sgds-remove-file
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      expect(removeFilesEventCount).to.equal(1); // Fired once
    }
  });

  it("sgds-files-selected fires every time file set changes (backwards compatible)", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let filesSelectedEventCount = 0;
      el.addEventListener("sgds-files-selected", () => {
        filesSelectedEventCount++;
      });

      // Select 2 files - should fire sgds-files-selected
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(filesSelectedEventCount).to.equal(1);

      // Delete one file - should also fire sgds-files-selected (backwards compatible)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      expect(filesSelectedEventCount).to.equal(2); // Incremented on delete too
    }
  });

  it("sgds-change fires every time file set changes (add or remove)", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let changeEventCount = 0;
      el.addEventListener("sgds-change", () => {
        changeEventCount++;
      });

      // Select 2 files - should fire sgds-change
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      // dt1.items.add(new File(["content2"], "file2.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(changeEventCount).to.equal(1);

      // Delete one file - should fire sgds-change again
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      expect(changeEventCount).to.equal(2);

      // Add more files - should fire sgds-change again
      const dt2 = new DataTransfer();
      dt2.items.add(new File(["content3"], "file3.txt"));

      input.files = dt2.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(changeEventCount).to.equal(3);
    }
  });

  it("prevents re-triggering upload handlers when files are deleted (sgds-add-files only on add)", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let addFilesEventCount = 0;
      el.addEventListener("sgds-add-files", () => {
        addFilesEventCount++;
      });

      // Select 3 files initially
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));
      dt1.items.add(new File(["content3"], "file3.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      // sgds-add-files fired once
      expect(addFilesEventCount).to.equal(1);

      // Simulate upload handler: set file1 and file3 to loading, file2 to success
      el.setFileUploadState(0, "loading");
      el.setFileUploadState(1, "success");
      el.setFileUploadState(2, "loading");
      await el.updateComplete;

      // Delete file2 (the one in success state, close button is enabled)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(closeButtons?.[1].hasAttribute("disabled")).to.be.false; // file2 is not disabled (success state)
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      // sgds-add-files should NOT have fired again on deletion (still 1)
      expect(addFilesEventCount).to.equal(1);

      // Remaining files (file1 and file3) should still have loading state
      const spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(2);

      // Close buttons for loading files should still be disabled
      const remainingCloseButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(remainingCloseButtons?.[0].hasAttribute("disabled")).to.be.true; // file1 still loading
      expect(remainingCloseButtons?.[1].hasAttribute("disabled")).to.be.true; // file3 still loading
    }
  });

  it("sgds-remove-file fires with deleted file and remaining file list", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let removeFilesEventDetail: any = null;
      el.addEventListener("sgds-remove-file", (e: any) => {
        removeFilesEventDetail = e.detail;
      });

      // Select 3 files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));
      dt1.items.add(new File(["content3"], "file3.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      // No removal yet
      expect(removeFilesEventDetail).to.be.null;

      // Delete file2 (middle file)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      // sgds-remove-file event detail should have both deleted file and remaining files
      expect(removeFilesEventDetail).to.not.be.null;

      // Verify deleted file
      expect(removeFilesEventDetail.file).to.exist;
      expect(removeFilesEventDetail.file.name).to.equal("file2.txt");

      // Verify remaining files
      expect(removeFilesEventDetail.files).to.exist;
      expect(removeFilesEventDetail.files.length).to.equal(2);
      expect(removeFilesEventDetail.files[0].name).to.equal("file1.txt");
      expect(removeFilesEventDetail.files[1].name).to.equal("file3.txt");
    }
  });

  it("file tracking with stable keys: deleted middle file does not re-animate remaining files", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // Select 3 files
      const dt = new DataTransfer();
      dt.items.add(new File(["content1"], "file1.txt"));
      dt.items.add(new File(["content2"], "file2.txt"));
      dt.items.add(new File(["content3"], "file3.txt"));

      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(3);

      // Delete middle file (file2.txt)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await el.updateComplete;
      await aTimeout(300); // ← Wait for animation to finish
      await el.updateComplete;

      // Remaining files should NOT have file-upload-exit or file-upload-enter animations
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      // Verify file1.txt and file3.txt are still visible (not re-animated)
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file3.txt");

      // Neither remaining item should have exit animation class
      expect(listItems?.[0].classList.contains("file-upload-exit")).to.be.false;
      expect(listItems?.[1].classList.contains("file-upload-exit")).to.be.false;

      await aTimeout(300);
      await el.updateComplete;

      // After animation completes, verify files are still there
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);
    }
  });

  it("upload state management: cycles through loading, success, and error states", async () => {
    const fileList = [
      new File(["file1"], "file1.txt"),
      new File(["file2"], "file2.txt"),
      new File(["file3"], "file3.txt")
    ];
    const dt = new DataTransfer();
    fileList.forEach(file => dt.items.add(file));

    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;
      await el.updateComplete;

      // State 1: Set file1 to loading
      el.setFileUploadState(0, "loading");
      await el.updateComplete;
      let spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(1);

      // During loading, close button should be disabled (not clickable)
      let closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(closeButtons?.[0].hasAttribute("disabled")).to.be.true;

      // State 2: Set file1 to success
      el.setFileUploadState(0, "success");
      await el.updateComplete;
      spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(0);

      // After success, close button should be enabled again
      closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(closeButtons?.[0].hasAttribute("disabled")).to.be.false;

      const checkIcons = el.shadowRoot?.querySelectorAll('sgds-icon[name="check-circle-fill"]');
      expect(checkIcons?.length).to.be.greaterThan(0);

      // State 3: Set file2 to loading
      el.setFileUploadState(1, "loading");
      await el.updateComplete;
      spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(1);

      // During loading, close button should be disabled
      closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(closeButtons?.[1].hasAttribute("disabled")).to.be.true;

      // State 4: Set file2 to error
      el.setFileUploadState(1, "error", "Upload failed");
      await el.updateComplete;
      spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(0);

      // After error, close button should be enabled again
      closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      expect(closeButtons?.[1].hasAttribute("disabled")).to.be.false;

      const errorMessages = el.shadowRoot?.querySelectorAll(".invalid-feedback");
      expect(errorMessages?.length).to.equal(1);
      expect(errorMessages?.[0].textContent).to.include("Upload failed");

      // Verify file3 is still in default state with enabled close button
      const listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(3);
      expect(closeButtons?.[2].hasAttribute("disabled")).to.be.false;
    }
  });

  it("file combining: multiple selections combine instead of replace, duplication prevented on removal", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // First selection: 2 files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      const promise1 = oneEvent(el, "sgds-files-selected");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await promise1;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      // Simulate user setting upload states
      el.setFileUploadState(0, "loading");
      el.setFileUploadState(1, "loading");
      await el.updateComplete;

      const spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(2);

      // Second selection: add 2 more files (should combine, not replace)
      const dt2 = new DataTransfer();
      dt2.items.add(new File(["content3"], "file3.txt"));
      dt2.items.add(new File(["content4"], "file4.txt"));

      const promise2 = oneEvent(el, "sgds-files-selected");
      input.files = dt2.files;
      input.dispatchEvent(new Event("change"));
      await promise2;
      await el.updateComplete;

      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(4); // Combined, not replaced

      // Verify all 4 files are visible
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file2.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file3.txt");
      expect(listItems?.[3].querySelector(".filename")?.textContent).to.include("file4.txt");

      // Delete middle file (file2.txt) - should NOT duplicate
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(3); // Not duplicated, just 3 remaining
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file3.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file4.txt");
    }
  });

  it("file states are maintained correctly after deletion (keyed by File object, not index)", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // Select 3 files
      const dt = new DataTransfer();
      dt.items.add(new File(["content1"], "file1.txt"));
      dt.items.add(new File(["content2"], "file2.txt"));
      dt.items.add(new File(["content3"], "file3.txt"));

      const promise = oneEvent(el, "sgds-files-selected");
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
      await promise;
      await el.updateComplete;

      // Set different states: file1=success, file2=loading, file3=error
      el.setFileUploadState(0, "success");
      el.setFileUploadState(1, "loading");
      el.setFileUploadState(2, "error", "File too large");
      await el.updateComplete;

      // Verify initial states
      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file2.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file3.txt");

      // Delete file2 (the loading one in the middle)
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[1].click();
      await aTimeout(300);
      await el.updateComplete;

      // After deletion, verify remaining files have CORRECT states
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      // file1 should still be in success state (no spinner, has checkmark)
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      let spinners = listItems?.[0].querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(0);

      // file3 should still be in error state (not success state from old index 1)
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file3.txt");
      const errorContainer = el.shadowRoot?.querySelectorAll(".invalid-feedback");
      expect(errorContainer?.length).to.equal(1);
      expect(errorContainer?.[0].textContent).to.include("File too large");

      // Verify no spinner exists (file3 is error, not loading)
      spinners = el.shadowRoot?.querySelectorAll("sgds-spinner");
      expect(spinners?.length).to.equal(0);
    }
  });

  it("drag and drop combines files with existing files when multiple is enabled", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload variant="drag-and-drop" multiple>Hello</sgds-file-upload>`
    );
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // First: Select files via button click (not drag-drop)
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      const promise1 = oneEvent(el, "sgds-add-files");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await promise1;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(2);

      // Second: Simulate drag-drop with new files
      const dragDropZone = el.shadowRoot?.querySelector(".drag-drop-zone");
      if (!dragDropZone) return;

      const dt2 = new DataTransfer();
      dt2.items.add(new File(["content3"], "file3.txt"));
      dt2.items.add(new File(["content4"], "file4.txt"));

      const dropEvent = new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        dataTransfer: dt2
      });

      const promise2 = oneEvent(el, "sgds-add-files");
      dragDropZone.dispatchEvent(dropEvent);
      await promise2;
      await el.updateComplete;

      // Should have 4 files total (combined, not replaced)
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(4);

      // Verify all files are present in order
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");
      expect(listItems?.[1].querySelector(".filename")?.textContent).to.include("file2.txt");
      expect(listItems?.[2].querySelector(".filename")?.textContent).to.include("file3.txt");
      expect(listItems?.[3].querySelector(".filename")?.textContent).to.include("file4.txt");
    }
  });

  it("drag and drop replaces files when multiple is disabled", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload variant="drag-and-drop">Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      // First: Select a file via button click
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));

      const promise1 = oneEvent(el, "sgds-add-files");
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await promise1;
      await el.updateComplete;

      let listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(1);
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file1.txt");

      // Second: Simulate drag-drop with new file
      const dragDropZone = el.shadowRoot?.querySelector(".drag-drop-zone");
      if (!dragDropZone) return;

      const dt2 = new DataTransfer();
      dt2.items.add(new File(["content2"], "file2.txt"));

      const dropEvent = new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        dataTransfer: dt2
      });

      const promise2 = oneEvent(el, "sgds-add-files");
      dragDropZone.dispatchEvent(dropEvent);
      await promise2;
      await el.updateComplete;

      // Should have 1 file (replaced, not combined)
      listItems = el.shadowRoot?.querySelectorAll(".file-upload-list-item");
      expect(listItems?.length).to.equal(1);
      expect(listItems?.[0].querySelector(".filename")?.textContent).to.include("file2.txt");
    }
  });

  it("sgds-change event detail contains current file list after deletion", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload multiple>Hello</sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (input) {
      let lastChangeEventFiles: FileList | null = null;
      el.addEventListener("sgds-change", (e: any) => {
        lastChangeEventFiles = e.detail;
      });

      // Select 2 files
      const dt1 = new DataTransfer();
      dt1.items.add(new File(["content1"], "file1.txt"));
      dt1.items.add(new File(["content2"], "file2.txt"));

      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
      await el.updateComplete;

      expect(lastChangeEventFiles?.length).to.equal(2);

      // Delete one file
      const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
      closeButtons?.[0].click();
      await aTimeout(300);
      await el.updateComplete;

      // sgds-change event detail should reflect 1 file remaining
      expect(lastChangeEventFiles?.length).to.equal(1);
      expect(lastChangeEventFiles?.[0].name).to.equal("file2.txt");
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

describe("sgds-file-upload upload state", () => {
  it("should show spinner when file is in loading state", async () => {
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
      await el.updateComplete;

      // Set file to loading state
      el.setFileUploadState(0, "loading");
      await el.updateComplete;

      const listItem = el.shadowRoot?.querySelector(".file-upload-list-item");
      const spinner = listItem?.querySelector("sgds-spinner");
      expect(spinner).to.exist;
    }
  });

  it("should disable close button when file is loading", async () => {
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
      await el.updateComplete;

      el.setFileUploadState(0, "loading");
      await el.updateComplete;

      const closeBtn = el.shadowRoot?.querySelector("sgds-close-button");
      expect(closeBtn?.hasAttribute("disabled")).to.be.true;
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

describe("noValidate disables native and sgds validation behaviours", () => {
  it("noValidate=true prevents form submission from being blocked by required validation", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-file-upload noValidate required hasFeedback name="doc"></sgds-file-upload>
      </form>
    `);
    const upload = form.querySelector("sgds-file-upload");

    // Try to submit empty form
    const canSubmit = form.reportValidity();

    // Should NOT be blocked (form is valid despite required + empty)
    expect(canSubmit).to.be.true;
    // Component should not be marked invalid
    expect(upload?.invalid).to.be.false;
  });

  it("noValidate=true allows custom validation via setInvalid with custom feedback", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-file-upload noValidate required hasFeedback name="doc"></sgds-file-upload>
      </form>
    `);
    const upload = form.querySelector<SgdsFileUpload>("sgds-file-upload");
    const input = upload?.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (!input) return;

    // Select a file
    const dt = new DataTransfer();
    dt.items.add(new File(["content"], "test.txt"));
    input.files = dt.files;
    input.dispatchEvent(new Event("change"));
    await upload?.updateComplete;

    // Manually set custom validation error
    upload.invalidFeedback = "Custom validation failed";
    upload.setInvalid(true);
    await upload.updateComplete;

    // Custom feedback should be visible
    const feedback = upload.shadowRoot?.querySelector(".invalid-feedback");
    expect(feedback?.textContent).to.include("Custom validation failed");
    expect(upload.invalid).to.be.true;
  });
});

describe("form novalidate disables sgds validation on all children", () => {
  it("form novalidate prevents required validation from blocking submission", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-file-upload required hasFeedback name="doc"></sgds-file-upload>
      </form>
    `);
    const upload = form.querySelector("sgds-file-upload");

    // Try to submit empty form
    const canSubmit = form.reportValidity();

    // Should NOT be blocked
    expect(canSubmit).to.be.true;
    expect(upload?.invalid).to.be.false;
  });

  it("form novalidate allows custom validation via setInvalid", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-file-upload required hasFeedback name="doc"></sgds-file-upload>
      </form>
    `);
    const upload = form.querySelector<SgdsFileUpload>("sgds-file-upload");
    const input = upload?.shadowRoot?.querySelector<HTMLInputElement>("input");

    if (!input) return;

    // Select a file
    const dt = new DataTransfer();
    dt.items.add(new File(["content"], "test.txt"));
    input.files = dt.files;
    input.dispatchEvent(new Event("change"));
    await upload?.updateComplete;

    // Manually set custom validation error
    upload.invalidFeedback = "Custom validation failed";
    upload.setInvalid(true);
    await upload.updateComplete;

    // Custom feedback should be visible
    const feedback = upload.shadowRoot?.querySelector(".invalid-feedback");
    expect(feedback?.textContent).to.include("Custom validation failed");
    expect(upload.invalid).to.be.true;
  });
});
describe("sgds-file-upload touched validation (blur-triggered)", () => {
  it("should NOT show invalid feedback on required field until blur (touched behavior)", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload required hasFeedback></sgds-file-upload>`);

    // Initially, should NOT show invalid feedback (not touched yet)
    await el.updateComplete;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.not.exist;
    expect(el.invalid).to.be.false;
  });

  it("should show invalid feedback when focus leaves the button without selecting files (default variant)", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload required hasFeedback variant="default"></sgds-file-upload>`
    );
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Focus the button
    button?.focus();
    await el.updateComplete;

    // Simulate blur by emitting sgds-blur event on the button
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;

    // Now should show invalid feedback
    expect(el.invalid).to.be.true;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.exist;
  });

  it("should show invalid feedback when focus leaves drag-and-drop zone without selecting files", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload required hasFeedback variant="drag-and-drop"></sgds-file-upload>`
    );
    const dragZone = el.shadowRoot?.querySelector<HTMLDivElement>(".drag-drop-zone");

    // Focus the drag zone
    dragZone?.focus();
    await el.updateComplete;

    // Simulate blur
    dragZone?.dispatchEvent(new Event("blur", { bubbles: true }));
    await el.updateComplete;

    // Now should show invalid feedback
    expect(el.invalid).to.be.true;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.exist;
  });

  it("should NOT show invalid feedback after blur if files are added", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload required hasFeedback variant="default"></sgds-file-upload>`
    );
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Add a file
    const dt = new DataTransfer();
    dt.items.add(new File(["content"], "test.txt"));
    if (input) {
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
    }
    await el.updateComplete;

    // Blur the button
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;

    // Should NOT be invalid (files are present)
    expect(el.invalid).to.be.false;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.not.exist;
  });

  it("should clear invalid state when files are added after blur", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload required hasFeedback></sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Blur without files (should become invalid)
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;
    expect(el.invalid).to.be.true;

    // Now add a file
    const dt = new DataTransfer();
    dt.items.add(new File(["content"], "test.txt"));
    if (input) {
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
    }
    await el.updateComplete;

    // Should now be valid
    expect(el.invalid).to.be.false;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.not.exist;
  });

  it("should show invalid feedback when all files are removed after blur", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload required hasFeedback multiple></sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Add a file
    const dt = new DataTransfer();
    dt.items.add(new File(["content1"], "file1.txt"));
    if (input) {
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
    }
    await el.updateComplete;
    expect(el.invalid).to.be.false;

    // Blur (should remain valid since file is present)
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;
    expect(el.invalid).to.be.false;

    // Remove the file
    const closeButtons = el.shadowRoot?.querySelectorAll("sgds-close-button");
    closeButtons?.[0].click();
    await aTimeout(300);
    await el.updateComplete;

    // After removal, should be invalid again (when touched)
    expect(el.invalid).to.be.true;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.exist;
  });

  it("should emit sgds-blur event when button loses focus", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload required hasFeedback></sgds-file-upload>`);
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    let blurEventFired = false;
    el.addEventListener("sgds-blur", () => {
      blurEventFired = true;
    });

    // Emit blur on button
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;

    expect(blurEventFired).to.be.true;
  });

  it("should not show invalid state when noValidate is true, even after blur", async () => {
    const el = await fixture<SgdsFileUpload>(
      html`<sgds-file-upload required hasFeedback noValidate></sgds-file-upload>`
    );
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Blur without files
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;

    // Should NOT be invalid (noValidate skips validation)
    expect(el.invalid).to.be.false;
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.not.exist;
  });

  it("should re-validate on subsequent blur after files added and removed", async () => {
    const el = await fixture<SgdsFileUpload>(html`<sgds-file-upload required hasFeedback></sgds-file-upload>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");
    const button = el.shadowRoot?.querySelector<SgdsButton>("sgds-button");

    // Step 1: Blur without files → invalid
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;
    expect(el.invalid).to.be.true;

    // Step 2: Add files → valid
    const dt1 = new DataTransfer();
    dt1.items.add(new File(["content"], "test.txt"));
    if (input) {
      input.files = dt1.files;
      input.dispatchEvent(new Event("change"));
    }
    await el.updateComplete;
    expect(el.invalid).to.be.false;

    // Step 3: Clear files (by setting empty DataTransfer)
    const dt2 = new DataTransfer();
    if (input) {
      input.files = dt2.files;
      input.dispatchEvent(new Event("change"));
    }
    await el.updateComplete;

    // Step 4: Blur again → should be invalid again
    button?.dispatchEvent(new CustomEvent("sgds-blur", { bubbles: true }));
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });
});
