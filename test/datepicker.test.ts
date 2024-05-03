import { elementUpdated, expect, fixture, html, waitUntil, fixtureCleanup } from "@open-wc/testing";
import DatepickerCalendar from "../src/components/Datepicker/datepicker-calendar";
import DatepickerHeader, { MONTH_LABELS } from "../src/components/Datepicker/datepicker-header";
import DatepickerInput from "../src/components/Datepicker/datepicker-input";
import { SgdsDatepicker } from "../src/components";
import { setTimeToNoon } from "../src/utils/time";
import { sendKeys } from "@web/test-runner-commands";
import "../src/index";
import sinon, { type SinonFakeTimers } from "sinon";

customElements.define("sgds-datepicker-header", DatepickerHeader);
customElements.define("sgds-datepicker-calendar", DatepickerCalendar);
customElements.define("sgds-datepicker-input", DatepickerInput);

describe("sgds-datepicker", () => {
  it("renders sgds-datepicker component correctly", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    expect(el).to.exist;
    expect(el).to.be.an.instanceOf(SgdsDatepicker);
  });

  it("opens the datepicker menu when sgds-datepicker-input is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker></sgds-datepicker> `);

    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");

    calendarBtnEl?.click();
    await waitUntil(() => menuEl?.classList.contains("show"));
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("when menu is open, closes the datepicker menu when sgds-datepicker-input is clicked", async () => {
    const el = await fixture<SgdsDatepicker>(html` <sgds-datepicker menuIsOpen></sgds-datepicker> `);
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");

    calendarBtnEl?.click();
    await waitUntil(() => !menuEl?.classList.contains("show"));

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("closes the menu when sgds-button is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker menuIsOpen></sgds-datepicker> `);

    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const resetButton = el.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");

    resetButton?.click();
    await waitUntil(() => !menuEl?.classList.contains("show"));

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("should pass the initialvalue to sgds-datepicker-input for single mode", async () => {
    const initialDate = '["23/11/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .initialValue=${initialValueArray}></sgds-datepicker>`
    );
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    await el.updateComplete;
    expect(inputEl?.value).to.equal("23/11/2023");
  });

  it("should pass the initialvalue to sgds-datepicker-input for range mode", async () => {
    const initialDate = '["23/11/2023", "25/11/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker mode="range" .initialValue=${initialValueArray}></sgds-datepicker>`
    );
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    await el.updateComplete;
    expect(inputEl?.value).to.equal("23/11/2023 - 25/11/2023");
  });

  it("closes the menu when outside of the element sgds-datepicker is clicked", async () => {
    const el = await fixture(html` <sgds-datepicker menuIsOpen></sgds-datepicker> `);

    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");

    // dispatch click event on document object
    const outsideClickEvent = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(outsideClickEvent);

    await waitUntil(() => !menuEl?.classList.contains("show"));
    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("should be able to select and display a date in single mode and close menu", async () => {
    const el = await fixture(html`<sgds-datepicker></sgds-datepicker>`);
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
    const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = calendarEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = calendarEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

    calendarBtnEl?.click();

    tdButtonOne?.click();
    await elementUpdated(el);
    expect(inputEl?.value).to.contain("01");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");

    calendarBtnEl?.click();

    tdButtonTwo?.click();
    await elementUpdated(el);
    expect(inputEl?.value).to.contain("02");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("should be able to select and display 2 dates in range mode and close menu only after 2 dates", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker mode="range"></sgds-datepicker>`);
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    calendarBtnEl?.click();
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const menuEl = el.shadowRoot?.querySelector("ul.datepicker") as HTMLElement;
    const calendarEl = el.shadowRoot?.querySelector("ul.datepicker sgds-datepicker-calendar") as HTMLElement;
    const tdButtonOne = calendarEl.shadowRoot?.querySelector("tbody td[data-day='1']") as HTMLTableCellElement;
    const tdButtonTwo = calendarEl.shadowRoot?.querySelector("tbody td[data-day='2']") as HTMLTableCellElement;

    await el.updateComplete;
    tdButtonOne.click();
    await el.updateComplete;
    expect(inputEl.value).to.contain("01");

    expect(menuEl?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");
    inputEl?.click();

    tdButtonTwo.click();
    await elementUpdated(el);
    // check for day 01 and 02
    expect(inputEl.value).to.contain("01");
    expect(inputEl.value).to.contain("02");

    expect(menuEl?.classList.contains("show")).to.be.false;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("false");
  });

  it("before minDate dates should have disabled class and not clickable to close the menu", async () => {
    const minDate = "2023-05-15T12:00:00.000Z";
    const initialDate = '["22/06/2023"]';
    const initialValueArray = JSON.parse(initialDate) as string[];

    const el = await fixture(
      html`<sgds-datepicker minDate=${minDate} .initialValue=${initialValueArray}></sgds-datepicker>`
    );

    // 1. click the input to open, check the menu has open

    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
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

    calendarBtnEl?.click();

    await waitUntil(() => menuElement?.classList.contains("show"));

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");

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
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
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

    calendarBtnEl?.click();
    await waitUntil(() => menuElement?.classList.contains("show"));
    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");

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

    expect(inputEl?.value).to.equal("22/06/2023");

    // 5. check it should not close the menu

    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(calendarBtnEl?.getAttribute("aria-expanded")).to.be.equal("true");
  });

  it("should be able to click and iterate through the calendar views and select the date 16/06/2020", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker .initialValue=${["29/06/2020"]}></sgds-datepicker>`);

    // 1.  click the input to open menu, check menu should open
    const calendarBtnElement = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const menuElement = el.shadowRoot?.querySelector("ul.datepicker") as HTMLButtonElement;
    const datepickerHeader = el?.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const datepickerCalendar = el?.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

    const headerButtonElement = datepickerHeader.shadowRoot?.querySelectorAll(
      "div.datepicker-header>div.text-center>button"
    )[1] as HTMLButtonElement;
    await el.updateComplete;
    calendarBtnElement?.click();
    await waitUntil(() => menuElement?.classList.contains("show"));
    expect(menuElement?.classList.contains("show")).to.be.true;
    expect(calendarBtnElement?.getAttribute("aria-expanded")).to.be.equal("true");

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

    await waitUntil(() => datepickerCalendar.view === "years");
    expect(datepickerCalendar.view).to.equal("years");

    const yearButton = datepickerCalendar.shadowRoot?.querySelector(
      "button.year[data-year='2020']"
    ) as HTMLButtonElement;
    yearButton.click();

    await waitUntil(() => datepickerCalendar.view === "months");

    const juneButton = datepickerCalendar.shadowRoot?.querySelector(
      "button.month[data-month='5']"
    ) as HTMLButtonElement;

    juneButton.click();

    await waitUntil(() => datepickerCalendar.view === "days");
    // click on date 16
    const calendarTdElement = datepickerCalendar.shadowRoot?.querySelector("td[data-day='16']") as HTMLTableCellElement;
    calendarTdElement.click();

    expect(calendarTdElement).to.exist;
    await waitUntil(() => !menuElement?.classList.contains("show"));
    await elementUpdated(datepickerHeader);
    await elementUpdated(el);
    await elementUpdated(datepickerCalendar);
    expect(inputEl?.value).to.equal("16/06/2020");
  });
  // ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"].forEach(format => {

  // })

  // it("displays the correct date format in the input value by default", async () => {
  //   const dateFormat = "DD/MM/YYYY";
  //   const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker dateFormat=${dateFormat}></sgds-datepicker>`);
  //   await el.updateComplete
  //   const sgdsInput = el.shadowRoot?.querySelector("sgds-datepicker-input");
  //   const input = sgdsInput?.shadowRoot?.querySelector("input")
  //   const inputShadowDiv = input?.shadowRoot?.querySelectorAll("div")[1]
  //   expect(inputShadowDiv?.textContent).to.equal("dd/mm/yyyy");
  // });

  // it("updates the input value with the correct date format when dateFormat changes", async () => {
  //   const dateFormat = "MM/DD/YYYY";
  //   const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker dateFormat=${dateFormat}></sgds-datepicker>`);
  //   const input = el.shadowRoot?.querySelector("sgds-datepicker-input");
  //   expect(input?.value).to.equal("mm/dd/yyyy");
  //   el.dateFormat = "YYYY/MM/DD";
  //   await el.updateComplete;
  //   expect(input?.value).to.equal("yyyy/mm/dd");
  // });

  it("disables the component when disabled property is true", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker disabled></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const [calButton, resetButton] = el.shadowRoot?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    expect(input).to.have.attribute("disabled");
    expect(resetButton).to.have.attribute("disabled");
    expect(calButton).to.have.attribute("disabled");
  });

  it("should add the required attribute to sgds-datepicker-input when required is true", async () => {
    const el = await fixture(html`<sgds-datepicker required></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector("sgds-datepicker-input");

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
      await el.updateComplete;
      const todayDate = setTimeToNoon(new Date(2023, 5, 29));
      const todayDateISO = todayDate.toISOString();

      const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
      const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

      await waitUntil(() => calendar?.shadowRoot?.activeElement === tdElement);

      // //arrow key next
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
    await elementUpdated(el);
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = () => calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);
    expect(el.value).to.equal("29/06/2023");
    await elementUpdated(calendar as DatepickerCalendar);

    await waitUntil(() => calendar?.shadowRoot?.activeElement === tdElement());
    // await waitUntil(() => changeDateHandler.called);
    await sendKeys({ press: "ArrowLeft" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;

    await waitUntil(() => changeDateHandler.called);
    expect(el.value).to.equal("28/06/2023");
    expect(changeDateHandler).to.have.been.calledOnce;
  });

  it("when focused, tabindex=3", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    await elementUpdated(calendar as DatepickerCalendar);
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    expect(tdElement?.getAttribute("tabindex")).to.equal("3");
  });
  it("when not focused, tabindex=-1", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const prevDateISO = setTimeToNoon(new Date(2023, 5, 28)).toISOString();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const tdElement = () => calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);
    const prevTdElement = () => calendar?.shadowRoot?.querySelector(`td[data-date="${prevDateISO}"]`);
    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar?.shadowRoot?.activeElement).to.deep.equal(tdElement());
    expect(calendar?.shadowRoot?.activeElement === tdElement()).to.be.true;
    expect(tdElement()?.getAttribute("tabindex")).to.equal("3");
    expect(prevTdElement()?.getAttribute("tabindex")).to.equal("-1");

    await sendKeys({ press: "ArrowLeft" });
    await elementUpdated(calendar);
    await waitUntil(() => calendar?.shadowRoot?.activeElement !== tdElement());
    expect(calendar?.shadowRoot?.activeElement === tdElement()).to.be.false;

    expect(tdElement()?.getAttribute("tabindex")).to.equal("-1");
    expect(prevTdElement()?.getAttribute("tabindex")).to.equal("3");
  });

  it("when clicking on next month arrow, the focused date in next month is on same day as previous month", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header");
    const nextButtonElement = () => header?.shadowRoot?.querySelectorAll("button")[2] as HTMLButtonElement;

    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    await elementUpdated(calendar as DatepickerCalendar);
    const tdElement = () => calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar?.shadowRoot?.activeElement === tdElement()).to.be.true;

    nextButtonElement().click();
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
    await elementUpdated(el);
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header");
    const nextButtonElement = header?.shadowRoot?.querySelectorAll("button")[2] as HTMLButtonElement;
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    await elementUpdated(calendar as DatepickerCalendar);
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
  it("today's year will be pegged to top left most of grid", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const headerBtn = header.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    // configure to year view
    headerBtn.click();
    headerBtn.click();

    const todayYear = new Date().getFullYear();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await waitUntil(() => calendar.view === "years");
    const yearButtons = calendar?.shadowRoot?.querySelectorAll("button");
    expect(yearButtons?.[0].innerText).to.equal(todayYear.toString());
  });

  it("when focused on 31 Dec 2023, clicking previous button focuses to last day of november", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["31/12/2023"]}></sgds-datepicker>`
    );

    await elementUpdated(el);

    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const thirtyFirstTd = calendar.shadowRoot?.querySelector("td[data-day='31']");

    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar.shadowRoot?.activeElement === thirtyFirstTd).to.be.true;
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const prevBtn = header.shadowRoot?.querySelectorAll("button")[0] as HTMLButtonElement;

    prevBtn.click();

    await el.updateComplete;
    await elementUpdated(calendar);
    const thirtiethTd = calendar.shadowRoot?.querySelector("td[data-day='30']");
    await waitUntil(() => calendar?.shadowRoot?.activeElement === thirtiethTd);

    expect(calendar.shadowRoot?.activeElement === thirtiethTd).to.be.true;
  });

  it("when focused on 31 Jan 2024, clicking next button focuses to last day of feb", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["31/01/2024"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const thirtyFirstTd = calendar.shadowRoot?.querySelector("td[data-day='31']");

    await waitUntil(() => calendar?.shadowRoot?.activeElement);
    expect(calendar.shadowRoot?.activeElement === thirtyFirstTd).to.be.true;
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const nextBtn = header.shadowRoot?.querySelectorAll("button")[2] as HTMLButtonElement;

    nextBtn.click();

    await el.updateComplete;
    await elementUpdated(calendar);

    const twentyNinthTd = calendar.shadowRoot?.querySelector("td[data-day='29']");
    await waitUntil(() => calendar?.shadowRoot?.activeElement === twentyNinthTd);

    expect(calendar.shadowRoot?.activeElement === twentyNinthTd).to.be.true;
  });
});

describe("calendar month keyboard navigation", async () => {
  const starterKit = async (initialValue: string[], mode: "single" | "range" = "single") => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .initialValue=${initialValue} menuIsOpen mode=${mode}></sgds-datepicker>`
    );
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const [prevHeaderBtn, headerBtn, nextHeaderBtn] = header.shadowRoot?.querySelectorAll(
      "button"
    ) as NodeListOf<HTMLButtonElement>;
    // configure to year view
    headerBtn.click();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await waitUntil(() => calendar.view === "months");
    const months = calendar.shadowRoot?.querySelectorAll("button.month");
    return { el, header, headerBtn, prevHeaderBtn, nextHeaderBtn, calendar, months };
  };

  const previousArraykeys = ["ArrowUp", "ArrowLeft"];
  previousArraykeys.forEach(key => {
    it(`${key} Jan month change display year by -1`, async () => {
      const { header, headerBtn, calendar, months } = await starterKit(["29/01/2024"]);

      expect(months?.[0].getAttribute("data-year")).to.equal("2024");
      expect(headerBtn.innerText).to.equal("2024");
      // focusedMonth is already focused
      expect(calendar.shadowRoot?.activeElement === months?.[0]).to.be.true;
      await sendKeys({ press: key });
      await calendar.updateComplete;
      await header.updateComplete;
      expect(months?.[0].getAttribute("data-year")).to.equal("2023");
      expect(headerBtn.innerText).to.equal("2023");
    });
  });

  const arrayNextKeys = ["ArrowDown", "ArrowRight"];
  arrayNextKeys.forEach(key =>
    it(`${key} Jan month change display year by -1`, async () => {
      const { header, headerBtn, calendar, months } = await starterKit(["29/12/2024"]);

      expect(months?.[0].getAttribute("data-year")).to.equal("2024");
      expect(headerBtn.innerText).to.equal("2024");
      // focusedMonth is already focused
      expect(calendar.shadowRoot?.activeElement === months?.[11]).to.be.true;

      await sendKeys({ press: key });

      await calendar.updateComplete;
      await header.updateComplete;
      expect(months?.[11].getAttribute("data-year")).to.equal("2025");
      expect(headerBtn.innerText).to.equal("2025");
    })
  );

  it("keys navigation syncs with next mouseclick navigation", async () => {
    const { header, headerBtn, calendar, months, nextHeaderBtn } = await starterKit(["29/10/2024"]);

    expect(months?.[0].getAttribute("data-year")).to.equal("2024");
    expect(headerBtn.innerText).to.equal("2024");
    // focusedMonth is already focused
    expect(calendar.shadowRoot?.activeElement === months?.[9]).to.be.true;

    await sendKeys({ press: "ArrowDown" });

    await calendar.updateComplete;
    await header.updateComplete;

    expect(months?.[11].getAttribute("data-year")).to.equal("2025");
    expect(headerBtn.innerText).to.equal("2025");

    nextHeaderBtn.click();

    await calendar.updateComplete;
    await header.updateComplete;

    expect(months?.[11].getAttribute("data-year")).to.equal("2026");
    expect(headerBtn.innerText).to.equal("2026");
  });
  it("keys navigation syncs with prev mouseclick navigation", async () => {
    const { header, headerBtn, calendar, months, prevHeaderBtn } = await starterKit(["29/03/2024"]);

    expect(months?.[0].getAttribute("data-year")).to.equal("2024");
    expect(headerBtn.innerText).to.equal("2024");
    // focusedMonth is already focused
    expect(calendar.shadowRoot?.activeElement === months?.[2]).to.be.true;

    await sendKeys({ press: "ArrowUp" });

    await calendar.updateComplete;
    await header.updateComplete;

    expect(months?.[11].getAttribute("data-year")).to.equal("2023");
    expect(headerBtn.innerText).to.equal("2023");

    prevHeaderBtn.click();

    await calendar.updateComplete;
    await header.updateComplete;

    expect(months?.[11].getAttribute("data-year")).to.equal("2022");
    expect(headerBtn.innerText).to.equal("2022");
  });

  it("when there is a selectedDate, only month of correct year gets active prop", async () => {
    const { header, calendar, months, prevHeaderBtn } = await starterKit(["29/03/2024"]);

    expect(months?.[2].classList.contains("active")).to.be.true;

    prevHeaderBtn.click();

    await calendar.updateComplete;
    await header.updateComplete;
    expect(months?.[2].classList.contains("active")).to.be.false;
  });
  it("when there is a selectedDate range, only month of correct year gets active prop", async () => {
    const { headerBtn, calendar, months, prevHeaderBtn, header, nextHeaderBtn } = await starterKit(
      ["29/03/2024", "29/03/2025"],
      "range"
    );
    //2024
    expect(headerBtn.innerText).to.equal("2024");
    expect(months?.length).to.equal(12);
    months?.forEach((m, i) => {
      if (i < 2) {
        expect(m.classList.contains("active")).to.be.false;
      } else {
        expect(m.classList.contains("active")).to.be.true;
      }
    });
    //2023
    prevHeaderBtn.click();

    await calendar.updateComplete;
    await header.updateComplete;
    months?.forEach(m => expect(m.classList.contains("active")).to.be.false);
    // go to 2025
    nextHeaderBtn.click();
    nextHeaderBtn.click();
    await calendar.updateComplete;
    await header.updateComplete;
    months?.forEach((m, i) => {
      if (i < 3) {
        expect(m.classList.contains("active")).to.be.true;
      } else {
        expect(m.classList.contains("active")).to.be.false;
      }
    });
  });
});
describe("calendar year keyboard navigation", async () => {
  const starterKit = async (initialValue: string[], mode: "single" | "range" = "single") => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .initialValue=${initialValue} menuIsOpen mode=${mode}></sgds-datepicker>`
    );
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const [prevHeaderBtn, headerBtn, nextHeaderBtn] = header.shadowRoot?.querySelectorAll(
      "button"
    ) as NodeListOf<HTMLButtonElement>;
    // configure to year view
    headerBtn.click();
    headerBtn.click();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await waitUntil(() => calendar.view === "years");
    const years = calendar.shadowRoot?.querySelectorAll("button.year");
    return { el, header, headerBtn, prevHeaderBtn, nextHeaderBtn, calendar, years };
  };

  it("the year will be focused and active", async () => {
    const { header, headerBtn, calendar, years } = await starterKit(["29/01/2024"]);
    const targetYear = years?.[0];
    expect(calendar.shadowRoot?.activeElement === targetYear).to.be.true;
    expect(targetYear?.classList.contains("active")).to.be.true;
    const startYear = 2024;
    const endYear = 2024 + 11;
    expect(headerBtn.innerText).to.equal(`${startYear} - ${endYear}`);
    await sendKeys({ press: "ArrowUp" });
    await calendar.updateComplete;
    await header.updateComplete;

    expect(headerBtn.innerText).to.equal("2012 - 2023");
    expect(calendar.shadowRoot?.activeElement === years?.[9]).to.be.true;
    expect(years?.[9].classList.contains("active")).to.be.false;
    expect(years?.[9].textContent).to.include(`${2024 - 3}`);
  });
  it("the years in range mode will be active", async () => {
    const { header, headerBtn, calendar, years } = await starterKit(["29/03/2024", "29/03/2034"], "range");
    const targetYear = years?.[0];
    expect(calendar.shadowRoot?.activeElement === targetYear).to.be.true;
    years?.forEach((y, i) => {
      if (i < 11) {
        expect(y.classList.contains("active")).to.be.true;
      } else {
        expect(y.classList.contains("active")).to.be.false;
      }
    });
    // navigate to next view
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "ArrowDown" });

    await calendar.updateComplete;
    await header.updateComplete;

    expect(headerBtn.innerText).to.equal("2036 - 2047");
    years?.forEach(y => expect(y.classList.contains("active")).to.be.false);
  });
});

describe("focus loop between header buttons and calendar days/months/years", async () => {
  const view = ["days", "months", "years"];
  view.forEach(v =>
    it(`focus loop works in ${v} view`, async () => {
      const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
      const todayDate = new Date();
      const day = todayDate.getDate();
      const month = todayDate.getMonth();
      const year = todayDate.getFullYear();
      const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
      const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
      const [prevBtn, headerBtn, nextBtn] = header.shadowRoot?.querySelectorAll(
        "button"
      ) as NodeListOf<HTMLButtonElement>;
      if (v === "months") {
        headerBtn.click();
      } else if (v === "years") {
        headerBtn.click();
        headerBtn.click();
      }
      await calendar.updateComplete;
      await el.updateComplete;

      const query = {
        days: `td[data-day="${day}"]`,
        months: `button[data-month="${month}"]`,
        years: `button[data-year="${year}"]`
      };
      // check if calendar is the focused element initially
      const tabbableCalendarEl = calendar?.shadowRoot?.querySelector(query[v]) as HTMLElement;
      expect(tabbableCalendarEl.getAttribute("tabindex")).to.equal("3");
      expect(el.shadowRoot?.activeElement === calendar).to.be.true;

      await sendKeys({ press: "Tab" });
      await calendar.updateComplete;
      await header.updateComplete;
      await el.updateComplete;

      // Header is now the focused element
      expect(el.shadowRoot?.activeElement === calendar).to.be.false;
      expect(el.shadowRoot?.activeElement === header).to.be.true;
      expect(header.shadowRoot?.activeElement === prevBtn).to.be.true;

      await sendKeys({ press: "Tab" });
      await calendar.updateComplete;
      await header.updateComplete;
      await el.updateComplete;
      expect(header.shadowRoot?.activeElement === headerBtn).to.be.true;

      await sendKeys({ press: "Tab" });
      await calendar.updateComplete;
      await header.updateComplete;
      await el.updateComplete;
      expect(header.shadowRoot?.activeElement === nextBtn).to.be.true;
    })
  );
});

describe("datepicker reset button", async () => {
  const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  it("when clicked, view defaults to default days", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const today = new Date();
    //change to month view
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const headerBtn = header.shadowRoot?.querySelectorAll("button")?.[1] as HTMLButtonElement;
    headerBtn.click();
    await header.updateComplete;
    // affirms its month view
    expect(headerBtn.innerText).to.equal(`${today.getFullYear()}`);
    const resetBtn = el.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    resetBtn?.click();

    await el.updateComplete;

    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    calendarBtnEl.click();
    await waitUntil(() => el.menuIsOpen);
    expect(headerBtn.innerText).to.equal(`${MONTH_LABELS[today.getMonth()]} ${today.getFullYear()}`);
  });
  it("when clicked, initialValue clears and input clears", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker .initialValue=${["29/03/2020"]}></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;

    expect(el.value).to.equal("29/03/2020");
    expect(el.value).to.equal(inputEl.value);
    const resetBtn = el.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    resetBtn?.click();

    await waitUntil(() => el.value === "");
    // await el.updateComplete;
    expect(el.value).to.equal("");
    // expect(el.value).to.equal(inputEl.value);
  });
  it("when clicked, view changes back to initial displayDate year and month ", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/03/2020"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    await elementUpdated(header);
    const headerBtn = header.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;

    expect(headerBtn.innerText).to.equal("March 2020");
    const resetBtn = el.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    resetBtn?.click();

    await el.updateComplete;
    await elementUpdated(header);
    calendarBtnEl.click();
    await waitUntil(() => expect(headerBtn).to.exist);

    const todayMonth = MONTH_LABELS[new Date().getMonth()];
    const todayYear = new Date().getFullYear();
    expect(headerBtn.innerText).to.equal(`${todayMonth} ${todayYear}`);
  });
});

describe("datepicker stylings", () => {
  it("selected date styles", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/03/2020"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const selectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='1']") as HTMLElement;
    expect(selectedDateEl.classList.contains("selected-ends")).to.be.true;
    expect(selectedDateEl.classList.contains("active")).to.be.true;
  });
  it("selected start and end dates will have selected-ends", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen mode="range" .initialValue=${["01/03/2020", "20/03/2020"]}></sgds-datepicker>`
    );
    await elementUpdated(el);

    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const firstSelectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='1']") as HTMLElement;
    const lastSelectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='20']") as HTMLElement;
    [firstSelectedDateEl, lastSelectedDateEl].forEach(d => {
      expect(d.classList.contains("selected-ends")).to.be.true;
    });
  });
  it("current month should have today stylings", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const headerBtn = header.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    headerBtn.click();
    await waitUntil(() => header.view === "months");
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
    const currentMonth = new Date().getMonth();
    expect(calendar?.shadowRoot?.querySelector(`button[data-month="${currentMonth}"]`)?.classList.contains("today")).to
      .be.true;
  });
  it("current year should have today stylings", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const headerBtn = header.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    headerBtn.click();
    headerBtn.click();
    await waitUntil(() => header.view === "years");
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
    const currentYear = new Date().getFullYear();
    expect(calendar?.shadowRoot?.querySelector(`button[data-year="${currentYear}"]`)?.classList.contains("today")).to.be
      .true;
  });
  it("if today's date is selected, selected styles takes precedence over today date styles", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const todayDate = new Date().getDate();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    const todayDateEl = calendar.shadowRoot?.querySelector(`td[data-day="${todayDate}"]`) as HTMLElement;
    expect(todayDateEl.classList.contains("today")).to.be.true;
    expect(todayDateEl.classList.contains("selected-ends")).to.be.false;

    todayDateEl.click();

    await calendar.updateComplete;
    await el.updateComplete;

    calendarBtnEl.click();
    await calendar.updateComplete;
    await el.updateComplete;

    expect(todayDateEl.classList.contains("today")).to.be.true;
    expect(todayDateEl.classList.contains("selected-ends")).to.be.true;
  });
});

describe("sgds-datepicker close and open menu behaviours", async () => {
  const dayViewSetup = async (initialValue: string[] = []) => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker .initialValue=${initialValue}></sgds-datepicker>`);
    const calendarBtnEl = el.shadowRoot?.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement;
    calendarBtnEl.click();
    await el.updateComplete;
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    const input = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
    const getCalendarActiveElement = () => calendar.shadowRoot?.activeElement;
    await waitUntil(() => getCalendarActiveElement());
    const getDateInputActiveElement = () => input.shadowRoot?.activeElement;
    return { calendar, getCalendarActiveElement, getDateInputActiveElement, calendarBtnEl, el, header, input };
  };
  const monthViewSetup = async (initialValue: string[] = []) => {
    const { header, ...etc } = await dayViewSetup(initialValue);
    const [prevBtn, headerBtn, nextBtn] = header.shadowRoot?.querySelectorAll(
      "button"
    ) as NodeListOf<HTMLButtonElement>;
    headerBtn.click();

    await waitUntil(() => header.view === "months");
    return { ...etc, header, prevBtn, headerBtn, nextBtn };
  };
  const yearViewSetup = async (initialValue: string[] = []) => {
    const { headerBtn, header, ...etc } = await monthViewSetup(initialValue);
    headerBtn.click();

    await waitUntil(() => header.view === "years");
    return { ...etc, header, headerBtn };
  };
  it("in day view, when calendar is open, it should auto focus to the today calendar date", async () => {
    const { calendar, getCalendarActiveElement } = await dayViewSetup();
    const today = new Date().getDate();
    const todayTdEl = calendar.shadowRoot?.querySelector(`td[data-day="${today}"]`);
    expect(getCalendarActiveElement() === todayTdEl).to.be.true;
  });
  it("in month view, when calendar is open, it should auto focus to the today calendar date", async () => {
    const { calendar, getCalendarActiveElement } = await monthViewSetup();
    const todayMonth = new Date().getMonth();
    const thisMonthEl = calendar.shadowRoot?.querySelector(`button[data-month="${todayMonth}"]`);
    expect(getCalendarActiveElement() === thisMonthEl).to.be.true;
  });
  it("in year view, when calendar is open, it should auto focus to the today calendar date", async () => {
    const { calendar, getCalendarActiveElement } = await yearViewSetup();
    const todayYear = new Date().getFullYear();
    const thisYearEl = calendar.shadowRoot?.querySelector(`button[data-year="${todayYear}"]`);
    expect(getCalendarActiveElement() === thisYearEl).to.be.true;
  });
  it("in day view, when calendar focus is moved, it should auto focus to the today calendar date after close and open, when close focuses to input", async () => {
    const { calendar, getCalendarActiveElement, calendarBtnEl, getDateInputActiveElement, input } = await dayViewSetup([
      "01/02/2024"
    ]);
    const selectedTdEl = calendar.shadowRoot?.querySelector(`td[data-day="1"]`);
    expect(getCalendarActiveElement() === selectedTdEl).to.be.true;

    await sendKeys({ press: "ArrowDown" });
    await calendar.updateComplete;

    const focusedTdEl = calendar.shadowRoot?.querySelector(`td[data-day="8"]`);
    expect(getCalendarActiveElement() === focusedTdEl).to.be.true;

    //close and open menu
    calendarBtnEl.click();
    const inputFocusedEl = input.shadowRoot?.querySelector("input");

    await waitUntil(() => getDateInputActiveElement() === inputFocusedEl);
    expect(getDateInputActiveElement() === inputFocusedEl).to.be.true;
    calendarBtnEl.click();

    await waitUntil(() => getCalendarActiveElement() === selectedTdEl);
    expect(getCalendarActiveElement() === selectedTdEl).to.be.true;
  });
  it("in month view, when calendar focus is moved, it should auto focus to the today calendar date after close and open, when close focuses to input", async () => {
    const { calendar, getCalendarActiveElement, calendarBtnEl, getDateInputActiveElement, input } =
      await monthViewSetup(["01/02/2024"]);
    const selectedButtonEL = calendar.shadowRoot?.querySelector(`button[data-month="1"]`);
    expect(getCalendarActiveElement() === selectedButtonEL).to.be.true;

    await sendKeys({ press: "ArrowDown" });
    await calendar.updateComplete;

    const focusedButtonEl = calendar.shadowRoot?.querySelector(`button[data-month="4"]`);
    expect(getCalendarActiveElement() === focusedButtonEl).to.be.true;

    //close and open menu
    calendarBtnEl.click();
    const inputFocusedEl = input.shadowRoot?.querySelector("input");
    await waitUntil(() => getDateInputActiveElement() === inputFocusedEl);

    calendarBtnEl.click();
    await waitUntil(() => getCalendarActiveElement() === selectedButtonEL);

    expect(getCalendarActiveElement() === selectedButtonEL).to.be.true;
  });
  it("in year view, when calendar focus is moved, it should auto focus to the today calendar date after close and open, when close focuses to input", async () => {
    const { calendar, getCalendarActiveElement, calendarBtnEl, getDateInputActiveElement, input } = await yearViewSetup(
      ["01/02/2024"]
    );
    const selectedButtonEL = calendar.shadowRoot?.querySelector(`button[data-year="2024"]`);
    expect(getCalendarActiveElement() === selectedButtonEL).to.be.true;

    await sendKeys({ press: "ArrowDown" });
    await calendar.updateComplete;

    const focusedButtonEl = calendar.shadowRoot?.querySelector(`button[data-year="2027"]`);
    expect(getCalendarActiveElement() === focusedButtonEl).to.be.true;

    //close and open menu
    calendarBtnEl.click();
    const inputFocusedEl = input.shadowRoot?.querySelector("input");
    await waitUntil(() => getDateInputActiveElement() === inputFocusedEl);
    calendarBtnEl.click();
    await waitUntil(() => getCalendarActiveElement() === selectedButtonEL);

    expect(getCalendarActiveElement() === selectedButtonEL).to.be.true;
  });
});

describe("datepicker input masking", () => {
  it("sgds-datepicker-input has an input masked", async () => {
    const inputEl = await fixture<DatepickerInput>(html`<sgds-datepicker-input></sgds-datepicker-input>`);
    expect(inputEl?.value).to.equal("");

    inputEl.focus();

    await sendKeys({ press: "Digit1" });
    await inputEl.updateComplete;
    expect(inputEl.value).to.equal("1d/mm/yyyy");

    const dateDigits = [2, 0, 3, 2, 0, 2, 4];

    for (const d of dateDigits) {
      await sendKeys({ press: `Digit${d}` });
    }
    await inputEl.updateComplete;
    expect(inputEl.value).to.equal("12/03/2024");
  });
  const backspacingValueMode = [
    {
      mode: "single",
      value: "12/03/2024",
      editValues: ["12/03/202y", "12/03/2y2y", "12/m3/2y2y", "d2/m3/2y2y", "22/m3/2y2y", "d2/m3/2y2y"]
    },
    {
      mode: "range",
      value: "12/03/2024 - 13/04/2024",
      editValues: [
        "12/03/2024 - 13/04/202y",
        "12/03/2024 - 13/04/2y2y",
        "12/03/2024 - 13/m4/2y2y",
        "12/03/2024 - d3/m4/2y2y",
        "12/03/2024 - 23/m4/2y2y",
        "12/03/20yy - d3/m4/2y2y"
      ]
    }
  ];
  backspacingValueMode.forEach(({ mode, value, editValues }) => {
    it(`for mode=${mode}backspacing a complete date 1|2/03/2024 at first position should give d2/03/2024`, async () => {
      const inputEl = await fixture<DatepickerInput>(
        html`<sgds-datepicker-input value=${value} mode=${mode as "single" | "range"}></sgds-datepicker-input>`
      );
      // const inputEl = el.shadowRoot?.querySelector("sgds-datepicker-input") as DatepickerInput;
      expect(inputEl?.value).to.equal(value);

      inputEl.focus();
      await sendKeys({ press: "Backspace" });

      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[0]);

      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "Backspace" });
      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[1]);

      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "Backspace" });
      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[2]);

      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "Backspace" });
      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[3]);

      await sendKeys({ press: "Digit2" });
      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[4]);

      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });

      await inputEl.updateComplete;
      expect(inputEl?.value).to.equal(editValues?.[5]);
    });
  });
  const validationOnChangeMode = [
    { mode: "single", value: "12/03/2024", editValue: "12/03/202y" },
    { mode: "range", value: "12/03/2024 - 13/02/2024", editValue: "12/03/2024 - 13/02/202y" }
  ];
  validationOnChangeMode.forEach(({ mode, value, editValue }) => {
    it(`for mode=${mode} validation happens on input change (triggered here by blur)`, async () => {
      const inputEl = await fixture<DatepickerInput>(
        html`<sgds-datepicker-input value=${value} mode=${mode as "single" | "range"}></sgds-datepicker-input>`
      );
      const invalidHandler = sinon.spy();
      inputEl.addEventListener("sgds-invalid-input", invalidHandler);
      const shadowInput = inputEl?.shadowRoot?.querySelector("input");
      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;
      const changeHandler = sinon.spy();

      inputEl.addEventListener("sgds-change", changeHandler);
      inputEl.focus();
      await sendKeys({ press: "Backspace" });
      expect(inputEl.value).to.equal(editValue);

      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;
      expect(invalidHandler).not.to.be.called;
      inputEl.blur();

      await waitUntil(() => changeHandler.calledOnce);
      expect(shadowInput?.classList.contains("is-invalid")).to.be.true;
      expect(invalidHandler).to.be.calledOnce;
    });
  });

  const mode: Array<"single" | "range"> = ["single", "range"];
  mode.forEach(m => {
    it(`For mode=${m}, validation doesnt happen with blur when there is no input change `, async () => {
      const inputEl = await fixture<DatepickerInput>(html`<sgds-datepicker-input mode=${m}></sgds-datepicker-input>`);
      const shadowInput = inputEl?.shadowRoot?.querySelector("input");
      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;

      inputEl.focus();
      expect(inputEl.value).to.equal("");

      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;

      inputEl.blur();

      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;
    });
  });

  const modesAndDigits = [
    //30/02/2024
    { mode: "single", dateDigits: [3, 0, 0, 2, 2, 0, 2, 4], value: "30/02/2024" },
    //20/02/2024 - 39/02/2024
    { mode: "range", dateDigits: [2, 0, 0, 2, 2, 0, 2, 4, 3, 9, 0, 2, 2, 0, 2, 4], value: "20/02/2024 - 39/02/2024" }
  ];
  modesAndDigits.forEach(({ mode, dateDigits, value }) => {
    it(`for mode=${mode}, validation happesn on completion of date mask`, async () => {
      const inputEl = await fixture<DatepickerInput>(
        html`<sgds-datepicker-input mode=${mode as "single" | "range"}></sgds-datepicker-input>`
      );
      const shadowInput = inputEl?.shadowRoot?.querySelector("input");
      expect(inputEl.value).to.equal("");
      expect(shadowInput?.classList.contains("is-invalid")).to.be.false;

      inputEl.focus();

      for (const d of dateDigits) {
        await sendKeys({ press: `Digit${d}` });
      }

      await inputEl.updateComplete;
      expect(inputEl.value).to.equal(value);
      expect(shadowInput?.classList.contains("is-invalid")).to.be.true;
    });
  });

  it("for range mode, when only one date is selected and blurred, input is invalid ", async () => {
    const dateDigits = [2, 0, 0, 2, 2, 0, 2, 4];
    const inputEl = await fixture<DatepickerInput>(html`<sgds-datepicker-input mode="range"></sgds-datepicker-input>`);
    const shadowInput = inputEl?.shadowRoot?.querySelector("input");
    expect(inputEl.value).to.equal("");
    expect(shadowInput?.classList.contains("is-invalid")).to.be.false;
    inputEl.focus();

    for (const d of dateDigits) {
      await sendKeys({ press: `Digit${d}` });
    }
    inputEl.blur();
    await inputEl.updateComplete;
    expect(inputEl.value).to.equal("20/02/2024 - dd/mm/yyyy");
    expect(shadowInput?.classList.contains("is-invalid")).to.be.true;
  });
});

describe("error message", () => {
  it("default error message can be override by user", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector<DatepickerInput>("sgds-datepicker-input");
    input?.focus();
    await elementUpdated(el);
    expect(el?.reportValidity()).to.equal(true);
    await waitUntil(() => el.shadowRoot?.activeElement === input);
    await sendKeys({ press: `Digit2` });
    await el.updateComplete;
    expect(el.value).to.equal("2d/mm/yyyy");

    input?.blur();
    await elementUpdated(el);
    expect(el?.reportValidity()).to.equal(false);
    const feedbackDiv = input?.shadowRoot?.querySelector("div.invalid-feedback");
    expect(feedbackDiv).to.exist;
    expect(feedbackDiv?.textContent).to.equal("Please enter a valid date");

    el.invalidFeedback = "Error message";
    await el.updateComplete;
    expect(feedbackDiv?.textContent).to.equal("Error message");
  });
});

describe("datepicker calendar will not show before 1900", () => {
  afterEach(() => fixtureCleanup());
  it("in day view , January 1900 header  previousButton is invisble", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/01/1900"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    await elementUpdated(header);
    expect(header.shadowRoot?.querySelector("button.invisible")).to.exist;
  });
  it("in month view , 1900 header  previousButton is invisble", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/01/1900"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    await elementUpdated(header);
    header.shadowRoot?.querySelectorAll("button")[1].click();
    await el.updateComplete;
    expect(header.shadowRoot?.querySelectorAll("button.invisible")).to.exist;
  });
  it("in year view , 1900 header  previousButton is invisble", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/01/1900"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    await elementUpdated(header);
    header.shadowRoot?.querySelectorAll("button")[1].click();
    header.shadowRoot?.querySelectorAll("button")[1].click();
    await elementUpdated(el);
    await elementUpdated(header);
    expect(header.shadowRoot?.querySelectorAll("button.invisible")).to.exist;
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
    const disabledButtons = calendar?.shadowRoot?.querySelectorAll("button.year[disabled]");
    expect(disabledButtons?.length).to.equal(8);
    expect(calendar?.shadowRoot?.querySelector("button.year[data-year='1900']")?.hasAttribute("disabled")).to.be.false;
  });
  it("in day view keypress ArrowUp and ArrowLeft when focusedDate is 01/01/1900 will not trigger change to previous year", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/01/1900"]}></sgds-datepicker>`
    );
    await elementUpdated(el);
    const changeCalendarViewHandler = sinon.spy();
    el.addEventListener("sgds-change-calendar", changeCalendarViewHandler);
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    await elementUpdated(calendar);
    const firstTd = calendar?.shadowRoot?.querySelector("td[data-day='1']");
    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    expect(calendar?.shadowRoot?.activeElement === firstTd).to.be.true;
    await sendKeys({ press: "ArrowUp" });
    await elementUpdated(el);
    await elementUpdated(calendar);
    await sendKeys({ press: "ArrowLeft" });
    await elementUpdated(el);
    await elementUpdated(calendar);
    expect(changeCalendarViewHandler).not.to.be.called;
  });
  it("in month view keypress ArrowUp and ArrowLeft when focusedDate's month is january will not trigger change to previous year", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["01/01/1900"]}></sgds-datepicker>`
    );
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
    const header = () => el.shadowRoot?.querySelector("sgds-datepicker-header");
    const headerBtn = () => header()?.shadowRoot?.querySelectorAll("button")[1];

    headerBtn()?.click();
    await el.updateComplete;

    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    const activeMonth = calendar?.shadowRoot?.querySelector("button[data-month='0']");

    expect(calendar?.shadowRoot?.activeElement === activeMonth).to.be.true;
    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    await sendKeys({ press: "ArrowLeft" });
    await el.updateComplete;
    expect(headerBtn()?.textContent).to.include("1900");
  });
});

describe("datepicker behavour on invalid input", () => {
  it("datepicker resets to initial displayDate when invalid input", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker .initialValue=${["23/03/2020"]}></sgds-datepicker>`);
    const input = el.shadowRoot?.querySelector<DatepickerInput>("sgds-datepicker-input");
    const header = el.shadowRoot?.querySelector<DatepickerHeader>("sgds-datepicker-header");
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain("March 2020");

    input?.focus();
    await waitUntil(() => el.shadowRoot?.activeElement === input);
    await sendKeys({ press: "Backspace" });

    await input?.updateComplete;
    expect(input?.value).to.equal("23/03/202y");

    input?.blur();
    await elementUpdated(el);
    expect(el?.reportValidity()).to.equal(false);
    el.showMenu();
    await el.updateComplete;
    const initialDisplayDate = `${MONTH_LABELS[new Date().getMonth()]} ${new Date().getFullYear()}`;
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain(initialDisplayDate);
  });
  it("datepicker resets to initial displayDate when invalid input", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .initialValue=${["23/03/2020"]} .displayDate=${new Date("01/01/2025")}></sgds-datepicker>`
    );
    const input = el.shadowRoot?.querySelector<DatepickerInput>("sgds-datepicker-input");
    const header = el.shadowRoot?.querySelector<DatepickerHeader>("sgds-datepicker-header");
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain("March 2020");

    input?.focus();
    await waitUntil(() => el.shadowRoot?.activeElement === input);
    await sendKeys({ press: "Backspace" });

    await input?.updateComplete;
    expect(input?.value).to.equal("23/03/202y");

    input?.blur();
    await elementUpdated(el);
    expect(el?.reportValidity()).to.equal(false);
    el.showMenu();
    await el.updateComplete;
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain("January 2025");
  });
  it("datepicker resets to initial specified displayDate when reset ", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .initialValue=${["23/03/2020"]} .displayDate=${new Date("01/01/2025")}></sgds-datepicker>`
    );
    const header = el.shadowRoot?.querySelector<DatepickerHeader>("sgds-datepicker-header") as DatepickerHeader;
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain("March 2020");
    const resetBtn = el.shadowRoot?.querySelector("button[slot='reset-btn']") as HTMLButtonElement;
    resetBtn?.click();

    el.showMenu();
    await elementUpdated(el);
    await elementUpdated(header);
    expect(header?.shadowRoot?.querySelectorAll("button")[1].textContent).to.contain("January 2025");
  });
});

describe("datepicker in form context", () => {
  it("should be invalid when required is true and value is empty", async () => {
    const el = await fixture<HTMLFormElement>(html`<form><sgds-datepicker required></sgds-datepicker></form>`);
    expect(el.checkValidity()).to.be.false;
  });
  it("should be valid when required is false and value is empty", async () => {
    const el = await fixture<HTMLFormElement>(html`<form><sgds-datepicker></sgds-datepicker></form>`);
    expect(el.checkValidity()).to.be.true;
  });
  it("should be valid when required is true and value is valid", async () => {
    const el = await fixture<HTMLFormElement>(
      html`<form><sgds-datepicker required .initialValue=${["23/03/2020"]}></sgds-datepicker></form>`
    );
    expect(el.checkValidity()).to.be.true;
  });
  it("should be valid when  value is valid", async () => {
    const el = await fixture<HTMLFormElement>(
      html`<form><sgds-datepicker .initialValue=${["23/03/2020"]}></sgds-datepicker></form>`
    );
    expect(el.checkValidity()).to.be.true;
  });
  it("should be invalid when  value is invalid", async () => {
    const el = await fixture<HTMLFormElement>(
      html`<form><sgds-datepicker .initialValue=${["23/03/2020"]}></sgds-datepicker></form>`
    );
    const datepicker = el.querySelector("sgds-datepicker") as SgdsDatepicker;
    const input = el
      .querySelector("sgds-datepicker")
      ?.shadowRoot?.querySelector("sgds-datepicker-input")
      ?.shadowRoot?.querySelector("input");

    input?.focus();
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => input?.value === "23/03/202y");
    input?.blur();
    await elementUpdated(datepicker);
    expect(datepicker?.reportValidity()).to.be.false;
    expect(el.checkValidity()).to.be.false;
  });

  it("obtain value of datepicker via name attribute and formData", async () => {
    const el = await fixture<HTMLFormElement>(
      html`<form><sgds-datepicker .initialValue=${["23/03/2020"]} name="myDatepicker"></sgds-datepicker></form>`
    );
    const formData = new FormData(el);
    expect(formData.get("myDatepicker")).to.equal("23/03/2020");
  });
});

describe("datepicker a11y labels", () => {
  // Faking the current time to prevent flaky test as the years past
  let fakeNow: SinonFakeTimers;
  beforeEach(() => {
    fakeNow = sinon.useFakeTimers(new Date(2024, 2, 1, 12, 0, 0, 0));
    expect(new Date()).to.deep.equal(new Date(2024, 2, 1, 12, 0, 0, 0));
  });
  afterEach(() => {
    fakeNow.restore();
  });
  it("datepicker-header button aria-labels when view=day, aria-disabled=false", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const el = await fixture<DatepickerHeader>(
      html`<sgds-datepicker-header
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="days"
        focusedTabIndex=${0}
      ></sgds-datepicker-header>`
    );
    const [prev, header, next] = el.shadowRoot?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    expect(prev.getAttribute("aria-label")).to.equal("Show previous month");
    expect(header.getAttribute("aria-disabled")).to.equal("false");
    expect(next.getAttribute("aria-label")).to.equal("Show next month");
  });
  it("datepicker-header button aria-labels when view=months, aria-disabled=false", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const el = await fixture<DatepickerHeader>(
      html`<sgds-datepicker-header
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="months"
        focusedTabIndex=${0}
      ></sgds-datepicker-header>`
    );
    const [prev, header, next] = el.shadowRoot?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    expect(prev.getAttribute("aria-label")).to.equal("Show previous year");
    expect(header.getAttribute("aria-disabled")).to.equal("false");
    expect(next.getAttribute("aria-label")).to.equal("Show next year");
  });
  it("datepicker-header button aria-labels when view=years,  aria-disabled=true", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const el = await fixture<DatepickerHeader>(
      html`<sgds-datepicker-header
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="years"
        focusedTabIndex=${0}
      ></sgds-datepicker-header>`
    );
    const [prev, header, next] = el.shadowRoot?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    expect(prev.getAttribute("aria-label")).to.equal("Show previous 12 years");
    expect(next.getAttribute("aria-label")).to.equal("Show next 12 years");

    expect(header.classList.contains("disabled")).to.be.true;
    expect(header.getAttribute("aria-disabled")).to.equal("true");
  });

  it("aria-selected=true on selected dates when view=days", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = new Date(2024, 2, 14);
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="days"
        focusedTabIndex=${0}
        .selectedDate=${[mockSelectedDate]}
      ></sgds-datepicker-calendar>`
    );
    const selectedTd = el.shadowRoot?.querySelector("td.active");

    expect(selectedTd?.getAttribute("aria-selected")).to.equal("true");
  });
  it("aria-selected=true on selected MONTHS when view=months", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = new Date(2024, 2, 14);
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="months"
        focusedTabIndex=${0}
        .selectedDate=${[mockSelectedDate]}
      ></sgds-datepicker-calendar>`
    );
    const selectedBtn = el.shadowRoot?.querySelector("button.active");

    expect(selectedBtn?.getAttribute("aria-selected")).to.equal("true");
  });
  it("aria-selected=true on selected years when view=years", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = new Date(2024, 2, 14);
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="years"
        focusedTabIndex=${0}
        .selectedDate=${[mockSelectedDate]}
      ></sgds-datepicker-calendar>`
    );
    const selectedBtn = el.shadowRoot?.querySelector("button.active");

    expect(selectedBtn?.getAttribute("aria-selected")).to.equal("true");
  });
  it("aria-selected=true on selected dates when view=days, mode=range", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = [new Date(2024, 2, 14), new Date(2024, 2, 27)];
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="days"
        mode="range"
        focusedTabIndex=${0}
        .selectedDate=${mockSelectedDate}
      ></sgds-datepicker-calendar>`
    );
    const selectedTds = el.shadowRoot?.querySelectorAll("td[aria-selected='true']");
    const selectedCount = 27 - 14 + 1;
    expect(selectedTds?.length).to.equal(selectedCount);
  });
  it("aria-selected=true on selected dates when view=months, mode=range", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = [new Date(2024, 2, 14), new Date(2024, 9, 27)];
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="months"
        mode="range"
        focusedTabIndex=${0}
        .selectedDate=${mockSelectedDate}
      ></sgds-datepicker-calendar>`
    );
    const selectedBtns = el.shadowRoot?.querySelectorAll("button[aria-selected='true']");
    const selectedCount = 9 - 2 + 1;
    expect(selectedBtns?.length).to.equal(selectedCount);
  });
  it("aria-selected=true on selected dates when view=years, mode=range", async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = [new Date(2024, 2, 14), new Date(2027, 9, 27)];
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="years"
        mode="range"
        focusedTabIndex=${0}
        .selectedDate=${mockSelectedDate}
      ></sgds-datepicker-calendar>`
    );
    const selectedBtns = el.shadowRoot?.querySelectorAll("button[aria-selected='true']");
    const selectedCount = 2027 - 2024 + 1;
    expect(selectedBtns?.length).to.equal(selectedCount);
  });

  it(`aria-label of header button changes based on the view of datepicker`, async () => {
    // 28th March 2024
    const mockDate = new Date(2024, 2, 28);
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker .displayDate=${mockDate} menuIsOpen></sgds-datepicker>`
    );
    const dialog = () => el.shadowRoot?.querySelector("ul[role='dialog']");
    const header = el.shadowRoot?.querySelector<DatepickerHeader>("sgds-datepicker-header");
    const headerButton = header?.shadowRoot?.querySelectorAll("button")[1];
    expect(dialog()?.getAttribute("aria-label")).to.equal(`Choose date`);
    headerButton?.click();
    await header?.updateComplete;
    await elementUpdated(el);
    // await el.updateComplete;
    expect(dialog()?.getAttribute("aria-label")).to.equal(`Choose month`);
    headerButton?.click();
    await header?.updateComplete;
    await elementUpdated(el);
    expect(dialog()?.getAttribute("aria-label")).to.equal(`Choose year`);
  });
  it("aria-label of td dates in calendar", async () => {
    const mockDate = new Date(2024, 2, 28);
    const mockSelectedDate = [new Date(2024, 2, 14)];
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${mockDate}
        .focusedDate=${mockDate}
        view="days"
        focusedTabIndex=${0}
        .selectedDate=${mockSelectedDate}
      ></sgds-datepicker-calendar>`
    );
    const td = el.shadowRoot?.querySelector("td[data-day='1']");
    expect(td?.getAttribute("aria-label")).to.equal("Friday, March 1st, 2024");
  });

  it("dates outside of min and max range have aria-disabled=true and vice versa", async () => {
    const mockDate = new Date(2024, 2, 28);
    const mockMinDate = new Date(2024, 2, 20).toISOString();
    const mockMaxDate = new Date(2024, 2, 30).toISOString();
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker
        .displayDate=${mockDate}
        menuIsOpen
        minDate=${mockMinDate}
        maxDate=${mockMaxDate}
      ></sgds-datepicker>`
    );
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar");
    const tds = calendar?.shadowRoot?.querySelectorAll("td[data-day]");
    expect(tds?.[0].getAttribute("aria-disabled")).to.equal("true");
  });
});

describe("aria-current in calendar", () => {
  it("for day view, current date is indicated by aria-current", async () => {
    const todayDate = new Date();
    const date = todayDate.getDate();
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${todayDate}
        view="days"
        focusedTabIndex=${0}
      ></sgds-datepicker-calendar>`
    );
    const currentDayTd = el.shadowRoot?.querySelector(`td[data-day='${date}']`)?.getAttribute("aria-current");
    expect(currentDayTd).to.equal("date");
  });
  it("for month view, current month is indicated in aria-label", async () => {
    const todayDate = new Date();
    const month = todayDate.getMonth();
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${todayDate}
        view="months"
        focusedTabIndex=${0}
      ></sgds-datepicker-calendar>`
    );
    const currentMonthButtonAriaLabel = el.shadowRoot
      ?.querySelector(`button[data-month='${month}']`)
      ?.getAttribute("aria-label");

    expect(currentMonthButtonAriaLabel).to.include("Current month");
  });
  it("for year view, current month is indicated in aria-label", async () => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const el = await fixture<DatepickerCalendar>(
      html`<sgds-datepicker-calendar
        .displayDate=${todayDate}
        view="years"
        focusedTabIndex=${0}
      ></sgds-datepicker-calendar>`
    );
    const currentMonthButtonAriaLabel = el.shadowRoot
      ?.querySelector(`button[data-year='${year}']`)
      ?.getAttribute("aria-label");

    expect(currentMonthButtonAriaLabel).to.include("Current year");
  });
});
