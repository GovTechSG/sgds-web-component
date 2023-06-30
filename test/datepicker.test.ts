import { assert, elementUpdated, expect, fixture, html, nextFrame, oneEvent } from "@open-wc/testing";
import "../src/components/Datepicker";
import { SgdsDatepicker } from "../src/components/Datepicker";

describe("sgds-datepicker", () => {
  it("renders sgds-datepicker component correctly", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    expect(el).to.exist;
    expect(el).to.be.an.instanceOf(SgdsDatepicker);
  });

  it("displays the menu when sgds-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    // Initial state assertions
    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    // Simulate click on sgds-input
    inputEl?.click();

    // Updated state assertions
    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("closes the menu when sgds-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("closes the menu when sgds-button is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const buttonEl = el.shadowRoot?.querySelector("sgds-button") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");

    buttonEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("closes the menu when outside of the element sgds-datepicker is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");

    // dispatch click event on document object
    const outsideClickEvent = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(outsideClickEvent);

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  // it("closes the menu and selects the clicked date in default single mode", async () => {
  //   const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

  //   const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  //   const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

  //   expect(menuEl).to.not.have.class("show");
  //   expect(inputEl).to.have.attribute("aria-expanded", "false");

  //   inputEl?.click();

  //   expect(menuEl).to.have.class("show");
  //   expect(inputEl).to.have.attribute("aria-expanded", "true");

  //   const calendarEl = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
  //   const dateTds = calendarEl?.shadowRoot?.querySelectorAll("td");

  //   expect(dateTds).to.have.length.above(2); // Ensure there are at least 3 <td> elements

  //   const thirdTd = dateTds![2]; // Access the third <td> element
  //   expect(thirdTd).to.exist;
  //   thirdTd?.click();

  //   await elementUpdated(el); // Wait for component update
  //   expect(menuEl).to.not.have.class("show");
  //   expect(inputEl).to.have.attribute("aria-expanded", "false");
  // });

  // it("closes the menu when selecteddaterange length is equal to 2 in range mode", async () => {
  //   const el = await fixture(html`<sgds-datepicker mode="range"></sgds-datepicker>`);

  //   const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  //   const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

  //   expect(menuEl?.classList.contains("show")).to.be.false;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

  //   inputEl?.click();

  //   expect(menuEl?.classList.contains("show")).to.be.true;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");

  //   // Simulate selecting two dates in the range
  //   const calendarEl = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
  //   const dateTds = calendarEl?.shadowRoot?.querySelectorAll("td") as NodeListOf<HTMLTableCellElement>;
  //   dateTds[0].click();
  //   dateTds[1].click();

  //   expect(menuEl?.classList.contains("show")).to.be.false;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  // });

  // it("calls sgds-selectvalue event when td is clicked", async () => {
  //   const el = await fixture(html`<sgds-datepicker></sgds-datepicker>`);

  //   const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  //   const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

  //   // Spy on the event listener
  //   const selectValueSpy = sinon.spy();
  //   el.addEventListener("sgds-selectvalue", selectValueSpy);

  //   // Open the menu
  //   inputEl?.click();
  //   await elementUpdated(el);

  //   expect(menuEl?.classList.contains("show")).to.be.true;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");

  //   const calendarEl = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
  //   const dateTd = calendarEl?.shadowRoot?.querySelector("td") as HTMLTableCellElement;

  //   expect(dateTd).to.exist;

  //   // Click the td element
  //   dateTd.click();
  //   await elementUpdated(el);

  //   // Verify that the event was called
  //   expect(selectValueSpy.calledOnce).to.be.true;
  // });

  it("does not close the menu when selecting the text-muted date with minDate set", async () => {
    const minDate = new Date(2023, 5, 1); // Example minDate value

    const el = await fixture(html` <sgds-datepicker minDate="2023-12-10T12:00:00.000Z"></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl.click();

    expect(menuEl.classList.contains("show")).to.be.true;
    expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");

    // Simulate click on the text-muted date td
    const textMutedDateTd = menuEl.querySelector("td.text-muted") as HTMLTableCellElement;
    textMutedDateTd?.click();

    // Final state assertions
    expect(menuEl.classList.contains("show")).to.be.true; // Menu should not close
    expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("should pass the initial value to sgds-input for single mode", async () => {
    const el = await fixture(html`<sgds-datepicker initialValue="2020-12-14"></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input")?.shadowRoot?.querySelector("input") as HTMLInputElement;
  
    expect(input?.value).to.equal("14/12/2020");
  });

  it("should pass the initial value range to sgds-input for range mode", async () => {
    const initialValueRange = [new Date("2023-06-22"), new Date("2023-06-11")];
    const el = await fixture(html`<sgds-datepicker .initialValueRange=${initialValueRange}></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  });

  it("should apply input classes to the datepicker input", async () => {
    const inputClasses = "mt-2";

    const el = await fixture(html`<sgds-datepicker .inputClasses=${inputClasses}></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

    expect(input.classList.contains("mt-2")).to.be.true;
  });

  it("should apply button classes to the datepicker button", async () => {
    const buttonClasses = "mt-2";

    const element = await fixture(html`<sgds-datepicker .buttonClasses=${buttonClasses}></sgds-datepicker>`);
    const button = element.shadowRoot?.querySelector("button");

    expect(button?.classList.contains("mt-2")).to.be.true;
  });

  it("should add the required attribute to sgds-input when required is true", async () => {
    const el = await fixture(html`<sgds-datepicker required></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input");

    expect(input?.hasAttribute("required")).to.be.true;
  });



  it('should render the datepicker in single mode with "dd/mm/yyyy" placeholder format by default', async () => {
    const element = await fixture(html`<sgds-datepicker></sgds-datepicker>`);
    const inputElement = element.shadowRoot?.querySelector("sgds-input input");
  
    expect(inputElement?.getAttribute("placeholder")).to.equal("dd/mm/yyyy");
  });

  it("should render the datepicker in range mode with double date inputs", async () => {
    const element = await fixture(html`<sgds-datepicker mode="range"></sgds-datepicker>`);
    const inputElements = element.shadowRoot?.querySelectorAll("input");

    expect(inputElements?.length).to.equal(2);
  });

  it("should render the td elements before minDate as text-muted and cursor of default", async () => {
    const minDate = "2016-05-19T12:00:00.000Z";
  
    const element = await fixture(html`<sgds-datepicker minDate=${minDate}></sgds-datepicker>`);
    const calendarEl = element.shadowRoot?.querySelector("sgds-datepicker-calendar");
  
    // Get all the td elements in the calendar
    const tdElements = calendarEl?.shadowRoot?.querySelectorAll("td");
  
    // Iterate through the td elements
    for (let i = 0; i < tdElements!.length; i++) {
      const tdElement = tdElements![i];
  
       // Check if the text content is "18" or "17"
       if (tdElement.textContent === "17" || tdElement.textContent === "18") {
        // Assert the text-muted class and default cursor style
        expect(tdElement.classList.contains("text-muted")).to.be.true;
        const cursorStyle = window.getComputedStyle(tdElement).cursor;
        expect(cursorStyle).to.equal("default");
      }
    }
  });


  it("should render the td elements after maxDate as text-muted and cursor of default", async () => {
    const maxDate = "2016-05-19T12:00:00.000Z";
  
    const element = await fixture(html`<sgds-datepicker maxDate=${maxDate}></sgds-datepicker>`);
    const calendarEl = element.shadowRoot?.querySelector("sgds-datepicker-calendar");
  
    // Get all the td elements in the calendar
    const tdElements = calendarEl?.shadowRoot?.querySelectorAll("td");
  
    // Iterate through the td elements
    for (let i = 0; i < tdElements!.length; i++) {
      const tdElement = tdElements![i];
  
      // Check if the text content is "20" or "21"
      if (tdElement.textContent === "20" || tdElement.textContent === "21") {
        // Assert the text-muted class and default cursor style
        expect(tdElement.classList.contains("text-muted")).to.be.true;
        const cursorStyle = window.getComputedStyle(tdElement).cursor;
        expect(cursorStyle).to.equal("default");
      }
    }
  });


  it("displays the correct date format in the placeholder by default", async () => {
    const dateFormat = "DD/MM/YYYY";
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker dateFormat=${dateFormat}></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input");
    expect(input?.getAttribute("placeholder")).to.equal("dd/mm/yyyy");
  });

  it("updates the placeholder with the correct date format when dateFormat changes", async () => {
    const dateFormat = "MM/DD/YYYY";
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker dateFormat=${dateFormat}></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input");
    expect(input?.getAttribute("placeholder")).to.equal("mm/dd/yyyy");
    el.dateFormat = "YYYY/MM/DD";
    await el.updateComplete;
    expect(input?.getAttribute("placeholder")).to.equal("yyyy/mm/dd");
  });

  it("disables the component when disabled property is true", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker disabled></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input input") as HTMLInputElement;
    const button = el.shadowRoot?.querySelector("sgds-button button") as HTMLButtonElement;
  

    expect(input?.classList.value).to.contain("disabled");
    expect(button?.classList.value).to.contain("disabled");
  });

});


 



 

