import { elementUpdated, expect, fixture, html, waitUntil } from "@open-wc/testing";
import DatepickerCalendar from "../src/components/Datepicker/datepicker-calendar";
import DatepickerHeader from "../src/components/Datepicker/datepicker-header";
import { SgdsDatepicker, SgdsInput } from "../src/components";
import { setTimeToNoon } from "../src/utils/time";
import { sendKeys } from "@web/test-runner-commands";
import "../src/index";
import sinon from "sinon";

customElements.define("sgds-datepicker-header", DatepickerHeader);
customElements.define("sgds-datepicker-calendar", DatepickerCalendar);

describe("sgds-datepicker", () => {
  it("renders sgds-datepicker component correctly", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    expect(el).to.exist;
    expect(el).to.be.an.instanceOf(SgdsDatepicker);
  });

  it("opens the datepicker menu when sgds-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("false");

    inputEl?.click();

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(inputEl?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("when menu is open, closes the datepicker menu when sgds-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;

    expect(inputEl?.value).to.equal("23/11/2023");
  });

  it("should pass the initialvalue to sgds-input for range mode", async () => {
    const initialDate = '["23/11/2023", "25/11/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];
    const el = await fixture(html`<sgds-datepicker mode="range" .initialValue=${initialValueArray}></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;

    expect(inputEl?.value).to.equal("23/11/2023 - 25/11/2023");
  });

  it("closes the menu when outside of the element sgds-datepicker is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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

    const inputElement = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

    const headerPreviousElement = datepickerHeader.shadowRoot?.querySelectorAll("button")[0] as HTMLButtonElement;

    const calendarTdElement = datepickerCalendar.shadowRoot?.querySelectorAll(
      "tbody td"
    ) as NodeListOf<HTMLTableCellElement>;
    const headerButtonElement = datepickerHeader.shadowRoot?.querySelectorAll(
      "div.datepicker-header>div.text-center>button"
    )[1] as HTMLButtonElement;

    inputElement?.click();

    await waitUntil(() => elementUpdated(inputElement));

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");

    // 2. keep clicking the header previous button in a loop until headerButtonElement show text "May" "2023"

    expect(headerButtonElement).to.exist;
    expect(headerPreviousElement).to.exist;

    while (!headerButtonElement?.innerText.includes("May 2023")) {
      headerPreviousElement.click();
      await elementUpdated(datepickerHeader);
      await elementUpdated(el);
    }

    expect(headerButtonElement?.innerText).to.equal("May 2023");

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

    // // 4. to check if the value changes in input field when clicked on 14th, shouldn't change

    // expect(inputElement?.value).to.equal("22/06/2023");

    // // 5. check it should not close the menu

    // expect(menuElement?.classList.contains("show")).to.be.true;
    // expect(inputElement?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("after maxDate dates should have disabled class and not clickable to close the menu", async () => {
    const maxDate = "2023-05-15T12:00:00.000Z";
    const initialDate = '["22/06/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];

    const el = await fixture(
      html`<sgds-datepicker maxDate=${maxDate} .initialValue=${initialValueArray}></sgds-datepicker>`
    );

    // 1. click the input to open, check the menu has open

    const inputElement = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

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
    const inputElement = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

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

    expect(inputElement?.value).to.equal("16/06/2020");
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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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

describe("Datepicker keyboard accesibility", () => {
  it("when calendar is open, calendar's today's date is focused", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const todayDateISO = setTimeToNoon(new Date()).toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;
  });
  const keys = [
    {
      key: "ArrowRight",
      value: 1
    },
    {
      key: "ArrowLeft",
      value: -1
    },
    {
      key: "ArrowDown",
      value: 7
    },
    {
      key: "ArrowUp",
      value: -7
    }
  ];
  keys.forEach(({ key, value }) => {
    it(`when keypresed=${key}, focus of dates moves by ${value} days`, async () => {
      const el = await fixture<SgdsDatepicker>(
        html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
      );
      const todayDate = setTimeToNoon(new Date(2023, 5, 29));
      const todayDateISO = todayDate.toISOString();

      const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
      const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

      await waitUntil(() => calendar?.shadowRoot?.activeElement);
      expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;

      //arrow key next
      await sendKeys({ press: key });
      await el.updateComplete;

      const tomorrowDateISO = new Date(todayDate.setDate(todayDate.getDate() + value)).toISOString();
      const tmrTdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${tomorrowDateISO}"]`);

      expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.false;
      expect(calendar?.shadowRoot?.activeElement === tmrTdElement).to.be.true;
    });
  });

  it("when focused date is entered, populates the input value", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const changeDateHandler = sinon.spy();

    el.addEventListener("sgds-change-date", changeDateHandler);

    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    expect(el.inputValue).to.equal("29/06/2023");

    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;

    await sendKeys({ press: "ArrowLeft" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;

    await waitUntil(() => changeDateHandler.calledOnce);
    expect(el.inputValue).to.equal("28/06/2023");
    expect(changeDateHandler).to.have.been.calledOnce;
  });

  it("when focused, tabindex=0", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    expect(tdElement?.getAttribute("tabindex")).to.equal("0");
  });
  it("when not focused, tabindex=-1", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const prevDateISO = setTimeToNoon(new Date(2023, 5, 28)).toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);
    const prevTdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${prevDateISO}"]`);
    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;
    expect(tdElement?.getAttribute("tabindex")).to.equal("0");
    expect(prevTdElement?.getAttribute("tabindex")).to.equal("-1");

    await sendKeys({ press: "ArrowLeft" });
    await waitUntil(() => calendar?.shadowRoot?.activeElement !== tdElement);
    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.false;

    expect(tdElement?.getAttribute("tabindex")).to.equal("-1");
    expect(prevTdElement?.getAttribute("tabindex")).to.equal("0");
  });

  it("when clicking on next month arrow, the focused date in next month is on same day as previous month", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header");
    const nextButtonElement = header?.shadowRoot?.querySelectorAll("button")[2] as HTMLButtonElement;
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;

    nextButtonElement.click();
    await el.updateComplete;

    const nextMonthDateISO = setTimeToNoon(new Date(2023, 5 + 1, 29)).toISOString();
    const nextMonthTdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${nextMonthDateISO}"]`);
    await waitUntil(() => calendar?.shadowRoot?.activeElement === nextMonthTdElement);
    expect(calendar?.shadowRoot?.activeElement === nextMonthTdElement).to.be.true;
  });
  it("press arrow keys and then when clicking on next month arrow, the focused date in next month is on same day as previous month", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header");
    const nextButtonElement = header?.shadowRoot?.querySelectorAll("button")[2] as HTMLButtonElement;
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;

    await sendKeys({ press: "ArrowLeft" });
    await el.updateComplete;

    nextButtonElement.click();
    await el.updateComplete;

    const nextMonthDateISO = setTimeToNoon(new Date(2023, 5 + 1, 29 - 1)).toISOString();
    const nextMonthTdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${nextMonthDateISO}"]`);
    await waitUntil(() => calendar?.shadowRoot?.activeElement === nextMonthTdElement);
    expect(calendar?.shadowRoot?.activeElement === nextMonthTdElement).to.be.true;
  });
});
