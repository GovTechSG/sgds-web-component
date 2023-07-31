import { elementUpdated, expect, fixture, html, waitUntil } from "@open-wc/testing";
import "../src/components/Datepicker";
import { SgdsDatepicker } from "../src/components/Datepicker";
import SgdsDatepickerCalendar from "../src/components/Datepicker/sgds-datepicker-calendar";
import SgdsDatepickerHeader from "../src/components/Datepicker/sgds-datepicker-header";

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
    const buttonEl = el.shadowRoot?.querySelector("button") as HTMLButtonElement;

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
    const initialDate = '["23/11/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];
    const el = await fixture(html`<sgds-datepicker .initialValue=${initialValueArray}></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

    expect(inputEl?.value).to.equal("23/11/2023");
  });


it("should pass the initialvalue to sgds-input for range mode", async () => {
  const initialDate = '["23/11/2023", "25/11/2023"]';
  const initialValueArray = JSON.parse(initialDate) as string[];
  const el = await fixture(
    html`<sgds-datepicker mode="range" .initialValue=${initialValueArray}></sgds-datepicker>`
  );
  const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;

  expect(inputEl?.value).to.equal("23/11/2023 - 25/11/2023");
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
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
    const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = calendarEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = calendarEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

    inputEl?.click();

    tdButtonOne?.click();
    await elementUpdated(el);
    expect(inputEl?.value).to.contain("01");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    tdButtonTwo?.click();
    await elementUpdated(el);
    expect(inputEl?.value).to.contain("02");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("should be able to select and display 2 dates in range mode and close menu only after 2 dates", async () => {
    const el = await fixture(html`<sgds-datepicker mode="range"></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    inputEl?.click();
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
    const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = calendarEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = calendarEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

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

  it("before minDate dates should have disabled class and not clickable to close the menu", async () => {
    const minDate = "2023-05-15T12:00:00.000Z";
    const initialDate = '["22/06/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];

    const el = await fixture(
      html`<sgds-datepicker minDate=${minDate} .initialValue=${initialValueArray}></sgds-datepicker>`
    );

    // 1. click the input to open, check the menu has open

    const inputElement = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as SgdsDatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as SgdsDatepickerCalendar;

    const headerPreviousElement = datepickerHeader.shadowRoot?.querySelectorAll("button")[0] as HTMLButtonElement;

    const calendarTdElement = datepickerCalendar.shadowRoot?.querySelectorAll(
      "tbody td"
    ) as NodeListOf<HTMLTableCellElement>;

    const headerButtonElement = datepickerHeader.shadowRoot?.querySelectorAll(
      "div.datepicker-header>div.text-center>button"
    )[1] as HTMLButtonElement;

    inputElement?.click();

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");

    // expect(headerButtonElement?.innerText).to.contain("July");

    // 2. keep clicking the header previous button in a loop until headerButtonElement show text "May" "2023"

    expect(headerButtonElement).to.exist;
    expect(headerPreviousElement).to.exist;

    while (!headerButtonElement?.innerText.includes("May 2023")) {
      headerPreviousElement.click();
      await elementUpdated(datepickerHeader);
      await elementUpdated(el);
    }

    expect(headerButtonElement?.innerText).contains("May 2023");

    // 3. loop the td from data-day 1st till 14th, and check if all contains disabled and click 14th
    expect(calendarTdElement).to.exist;
    calendarTdElement?.forEach(tdButton => {
      const dataDay = tdButton.getAttribute("data-day");
      if (dataDay && parseInt(dataDay) <= 14) {
        expect(tdButton.classList.contains("disabled")).to.be.true;
      }
      if (dataDay && parseInt(dataDay) === 14) {
        tdButton.click();
      }
    });

    // 4. to check if the value changes in input field when clicked on 14th, shouldn't change

    expect(inputElement?.value).to.equal("22/06/2023");

    // 5. check it should not close the menu

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("after maxDate dates should have disabled class and not clickable to close the menu", async () => {
    const maxDate = "2023-05-15T12:00:00.000Z";
    const initialDate = '["22/06/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];

    const el = await fixture(
      html`<sgds-datepicker maxDate=${maxDate} .initialValue=${initialValueArray}></sgds-datepicker>`
    );

    // 1. click the input to open, check the menu has open

    const inputElement = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as SgdsDatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as SgdsDatepickerCalendar;

    const headerPreviousElement = datepickerHeader.shadowRoot?.querySelectorAll("button")[0] as HTMLButtonElement;

    const calendarTdElement = datepickerCalendar.shadowRoot?.querySelectorAll(
      "tbody td"
    ) as NodeListOf<HTMLTableCellElement>;

    const headerButtonElement = datepickerHeader.shadowRoot?.querySelectorAll(
      "div.datepicker-header>div.text-center>button"
    )[1] as HTMLButtonElement;

    inputElement?.click();

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");

    // expect(headerButtonElement?.innerText).to.contain("July");

    // 2. keep clicking the header previous button in a loop until headerButtonElement show text "May" "2023"

    expect(headerButtonElement).to.exist;
    expect(headerPreviousElement).to.exist;

    while (!headerButtonElement?.innerText.includes("May 2023")) {
      headerPreviousElement.click();
      await elementUpdated(datepickerHeader);
      await elementUpdated(el);
    }

    expect(headerButtonElement?.innerText).contains("May 2023");

    // 3. loop the td from 16th day till end, and check if all contains disabled and click 16th
    expect(calendarTdElement).to.exist;
    calendarTdElement?.forEach(tdButton => {
      const dataDay = tdButton.getAttribute("data-day");
      if (dataDay && parseInt(dataDay) >= 16) {
        expect(tdButton.classList.contains("disabled")).to.be.true;
      }
      if (dataDay && parseInt(dataDay) === 16) {
        tdButton.click();
      }
    });

    // 4. to check if the value changes in input field when clicked on 16th, shouldn't change

    expect(inputElement?.value).to.equal("22/06/2023");

    // 5. check it should not close the menu

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("should be able to click and iterate through the calendar views and select the date 16/06/2020", async () => {
    const el = await fixture(html`<sgds-datepicker></sgds-datepicker>`);

    // 1.  click the input to open menu, check menu should open
    const inputElement = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as SgdsDatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as SgdsDatepickerCalendar;

    const headerButtonElement = datepickerHeader.shadowRoot?.querySelectorAll(
      "div.datepicker-header>div.text-center>button"
    )[1] as HTMLButtonElement;

    inputElement?.click();

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");

    // 2.  click the header button twice to go the year view calendar
    expect(headerButtonElement).to.exist;
    headerButtonElement.click();
    await elementUpdated(datepickerHeader);
    await elementUpdated(el);
    await elementUpdated(datepickerCalendar);

    headerButtonElement.click();
    await elementUpdated(datepickerHeader);
    await elementUpdated(el);
    await elementUpdated(datepickerCalendar);

    expect(datepickerCalendar.view).to.equal("years");

    await waitUntil(() => datepickerCalendar.view === "years");

    const datepickerYearButtons = Array.from(
      datepickerCalendar.shadowRoot?.querySelectorAll("button.year") as NodeListOf<HTMLButtonElement>
    );

    // year: loop to find button with 2020 and click it
    for (const button of datepickerYearButtons) {
      if (button.innerText.includes("2020")) {
        button.click();
        break;
      }
    }

    await waitUntil(() => datepickerCalendar.view === "months");

    const datepickerMonthButtons = Array.from(
      datepickerCalendar.shadowRoot?.querySelectorAll("button.month") as NodeListOf<HTMLButtonElement>
    );

    // month: loop to find button with Jun and click it
    for (const button of datepickerMonthButtons) {
      if (button.innerText.includes("Jun")) {
        button.click();
        break;
      }
    }

    await waitUntil(() => datepickerCalendar.view === "days");

    const calendarTdElement = datepickerCalendar.shadowRoot?.querySelectorAll(
      "tbody td"
    ) as NodeListOf<HTMLTableCellElement>;

    // 3. loop the td from 16th day till end, and check if all contains disabled and click 16th

    calendarTdElement?.forEach(tdButton => {
      const dataDay = tdButton.getAttribute("data-day");
      if (dataDay && parseInt(dataDay) === 16) {
        tdButton.click();
      }
    });

    await elementUpdated(datepickerHeader);
    await elementUpdated(el);
    await elementUpdated(datepickerCalendar);

    expect(inputElement?.value).to.equal("16/07/2020");
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
    const button = el.shadowRoot?.querySelector("button") as HTMLButtonElement;

    expect(input).to.have.attribute("disabled");
    expect(button).to.have.attribute("disabled");
  });

  it("should add the required attribute to sgds-input when required is true", async () => {
    const el = await fixture(html`<sgds-datepicker required></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-input");

    expect(input).to.have.attribute("required");
  });
});
