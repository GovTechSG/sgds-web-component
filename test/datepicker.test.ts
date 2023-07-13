import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "../src/components/Datepicker";
import { SgdsDatepicker } from "../src/components/Datepicker";

describe("sgds-datepicker", () => {
  it("renders sgds-datepicker component correctly", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    expect(el).to.exist;
    expect(el).to.be.an.instanceOf(SgdsDatepicker);
  });

  it("opens the datepicker menu when sgds-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("when menu is open, closes the datepicker menu when sgds-input is clicked", async () => {
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

  it("should pass the initialvalue to sgds-input for single mode", async () => {
    const initialDate = new Date("2023-06-22");
    const el = await fixture(html`<sgds-datepicker .initialValue=${[initialDate]}></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

    expect(inputEl?.value).to.equal("22/06/2023");
  });

  it("should pass the initialvalue to sgds-input for range mode", async () => {
    const initialDate1 = new Date("2023-06-22");
    const initialDate2 = new Date("2023-06-11");
    const el = await fixture(
      html`<sgds-datepicker mode="range" .initialValue=${[initialDate1, initialDate2]}></sgds-datepicker>`
    );
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

    expect(inputEl?.value).to.equal("11/06/2023 - 22/06/2023");
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

  it("should be able to select and display a date in single mode and close menu", async () => {
    const el = await fixture(html`<sgds-datepicker></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    inputEl?.click();
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = menuEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = menuEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

    tdButtonOne.click();
    await elementUpdated(el);
    expect(inputEl.value).to.contain("01");


    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    tdButtonTwo.click();
    await elementUpdated(el);
    expect(inputEl.value).to.contain("02");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("should be able to select and display 2 dates in range mode and close menu only after 2 dates", async () => {
    const el = await fixture(html`<sgds-datepicker mode="range"></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    inputEl?.click();
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = menuEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = menuEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

    tdButtonOne.click();
    await elementUpdated(el);
    expect(inputEl.value).to.contain("01");

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");
    inputEl?.click();

    tdButtonTwo.click();
    await elementUpdated(el);
    // check for day 01 and 02
    expect(inputEl.value).to.contain("01");
    expect(inputEl.value).to.contain("02");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  // it("before minDate dates should have text-muted class and not clickable to close the menu", async () => {
  //   const minDate = new Date("2023-06-15T12:00:00.000Z"); // Example minDate value

  //   const el = await fixture(html`<sgds-datepicker minDate="${minDate.toISOString()}"></sgds-datepicker>`);

  //   const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  //   const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

  //   const headerEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-header") as HTMLElement;

  //   expect(menuEl?.classList.contains("show")).to.be.false;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

  //   inputEl.click();

  //   // Click headerEl SVG element with class bi-chevron-left until headerEl button element shows "June" "2023"
  //   while (headerEl.innerText !== "June 2023") {
  //     const chevronLeftSvg = headerEl.querySelector("svg.bi-chevron-left") as HTMLElement;
  //     chevronLeftSvg?.click();
  //     await elementUpdated(el);
  //   }

  //   expect(menuEl.classList.contains("show")).to.be.true;
  //   expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");

  //   // check for 14 of june 2023
  //   const tdButton = menuEl.querySelector("tbody td[data-day='14']") as HTMLTableCellElement;
  //   expect(tdButton.classList.contains("text-muted")).to.be.true;
  //   tdButton.click();

  //   expect(menuEl.classList.contains("show")).to.be.true;
  //   expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");
  // });

  // it("before maxDate dates should have text-muted class and not clickable to close the menu", async () => {
  //   const maxDate = new Date("2023-06-15T12:00:00.000Z"); // Example minDate value

  //   const el = await fixture(html`<sgds-datepicker maxDate="${maxDate.toISOString()}"></sgds-datepicker>`);

  //   const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
  //   const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
  //   const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
  //   const headerEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-header") as HTMLElement;
  //   const headerButtonEl = headerEl.shadowRoot?.querySelector("button") as HTMLButtonElement;
  //   const chevronLeftEl = headerEl.shadowRoot?.querySelector("svg.bi-chevron-left") as HTMLButtonElement;
  //   expect(menuEl?.classList.contains("show")).to.be.false;
  //   expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

  //   inputEl.click();

  //   // Click headerEl SVG element with class bi-chevron-left until headerEl button element shows "June" "2023"
  //   while (headerButtonEl.innerText !== "June 2023") {
  //     chevronLeftEl.dispatchEvent(new Event("click"));
  //     await elementUpdated(el);
  //   }

  //   expect(menuEl.classList.contains("show")).to.be.true;
  //   expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");

  //   // check for 16 of june 2023
  //   const tdButton = calendarEl.querySelector("tbody td[data-day='16']") as HTMLTableCellElement;
  //   expect(tdButton.classList.contains("text-muted")).to.be.true;
  //   tdButton.click();

  //   expect(menuEl.classList.contains("show")).to.be.true;
  //   expect(inputEl.getAttribute("aria-expanded")).to.be.equal("true");
  // });

  it("should be able to click the header button till year and select the dates", async () => {
    const el = await fixture(html`<sgds-datepicker></sgds-datepicker>`);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
    const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar")
    const headerEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-header") as HTMLElement;
    const headerButtonEl = headerEl.shadowRoot?.querySelector("button") as HTMLButtonElement;
    const chevronLeftEl = headerEl.shadowRoot?.querySelector("svg.bi-chevron-left") as HTMLButtonElement;
    inputEl.click();

    headerButtonEl?.click(); //display month
    headerButtonEl?.click(); // display year

    
    const buttonYear2020 = calendarEl?.shadowRoot?.querySelector(
      'datepicker-body year'
    ) as HTMLButtonElement;
    const yearText = buttonYear2020?.textContent;
    if (yearText?.includes("2020")) {
      buttonYear2020?.click();
    }


    const buttonMonthJune = calendarEl?.shadowRoot?.querySelector(
      'datepicker-body month'
    ) as HTMLButtonElement;
    const buttonText = buttonMonthJune?.textContent;
 
    if (buttonText?.includes("Jun")) {
      buttonMonthJune?.click();
    }

    const tdButton = calendarEl?.querySelector("tbody td[data-day='16']") as HTMLTableCellElement;
    tdButton.click();

    expect(menuEl.classList.contains("show")).to.be.false;
    expect(inputEl.getAttribute("aria-expanded")).to.be.equal("false");


    await elementUpdated(el);
  
    expect(inputEl.value).to.contain("16/06/2020");

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
    const input = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const button = el.shadowRoot?.querySelector("sgds-button") as HTMLButtonElement;

    expect(input).to.have.attribute("disabled");
    expect(button).to.have.attribute("disabled");
  });

  it("should add the required attribute to sgds-input when required is true", async () => {
    const el = await fixture(html`<sgds-datepicker required></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input");

    expect(input).to.have.attribute("required");
  });

  // it("should apply input classes to the datepicker input", async () => {
  //   const inputClasses = "mt-2";

  //   const el = await fixture(html`<sgds-datepicker inputClasses=${inputClasses}></sgds-datepicker>`);
  //   const input = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

  //   expect(input.classList.contains("mt-2")).to.be.true;
  // });

  // it("should apply button classes to the datepicker button", async () => {
  //   const buttonClasses = "mt-2";

  //   const element = await fixture(html`<sgds-datepicker buttonClasses=${buttonClasses}></sgds-datepicker>`);
  //   const button = element.shadowRoot?.querySelector("sgds-button") as HTMLButtonElement

  //   expect(button?.classList.contains("mt-2")).to.be.true;
  // });
});
