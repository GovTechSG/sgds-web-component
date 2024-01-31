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
    const el = await fixture(html`<sgds-datepicker .initialValue=${["29/06/2020"]}></sgds-datepicker>`);

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

    expect(el.value).to.equal("29/06/2023");

    await waitUntil(() => calendar?.shadowRoot?.activeElement);

    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.true;

    await sendKeys({ press: "ArrowLeft" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;

    await waitUntil(() => changeDateHandler.calledOnce);
    expect(el.value).to.equal("28/06/2023");
    expect(changeDateHandler).to.have.been.calledOnce;
  });

  it("when focused, tabindex=3", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/06/2023"]}></sgds-datepicker>`
    );
    const todayDate = setTimeToNoon(new Date(2023, 5, 29));
    const todayDateISO = todayDate.toISOString();
    const calendar = el.shadowRoot?.querySelector<DatepickerCalendar>("sgds-datepicker-calendar");
    const tdElement = calendar?.shadowRoot?.querySelector(`td[data-date="${todayDateISO}"]`);

    expect(tdElement?.getAttribute("tabindex")).to.equal("3");
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
    expect(tdElement?.getAttribute("tabindex")).to.equal("3");
    expect(prevTdElement?.getAttribute("tabindex")).to.equal("-1");

    await sendKeys({ press: "ArrowLeft" });
    await waitUntil(() => calendar?.shadowRoot?.activeElement !== tdElement);
    expect(calendar?.shadowRoot?.activeElement === tdElement).to.be.false;

    expect(tdElement?.getAttribute("tabindex")).to.equal("-1");
    expect(prevTdElement?.getAttribute("tabindex")).to.equal("3");
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
    const resetBtn = el.shadowRoot?.querySelector("button") as HTMLButtonElement;
    resetBtn?.click();

    await el.updateComplete;

    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    inputEl.click();
    await el.updateComplete;
    expect(headerBtn.innerText).to.equal(`${MONTH_LABELS[today.getMonth()]} ${today.getFullYear()}`);
  });
  it("when clicked, initialValue clears and input clears", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker .initialValue=${["29/03/2020"]}></sgds-datepicker>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;

    expect(el.value).to.equal("29/03/2020");
    expect(el.value).to.equal(inputEl.value);
    const resetBtn = el.shadowRoot?.querySelector("button") as HTMLButtonElement;
    resetBtn?.click();

    await el.updateComplete;
    expect(el.value).to.equal("");
    expect(el.value).to.equal(inputEl.value);
  });
  it("when clicked, view changes back to today's year and month ", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen .initialValue=${["29/03/2020"]}></sgds-datepicker>`
    );
    const header = el.shadowRoot?.querySelector("sgds-datepicker-header") as DatepickerHeader;
    const headerBtn = header.shadowRoot?.querySelectorAll("button")[1] as HTMLButtonElement;
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;

    expect(headerBtn.innerText).to.equal("March 2020");
    const resetBtn = el.shadowRoot?.querySelector("button") as HTMLButtonElement;
    resetBtn?.click();

    await el.updateComplete;
    inputEl.click();
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
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

    const selectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='1']") as HTMLElement;
    expect(selectedDateEl.classList.contains("text-white")).to.be.true;
    expect(selectedDateEl.classList.contains("bg-primary-600")).to.be.true;
    expect(selectedDateEl.classList.contains("active")).to.be.true;
  });
  it("selected start and end dates will have text-white and bg-primary-600", async () => {
    const el = await fixture<SgdsDatepicker>(
      html`<sgds-datepicker menuIsOpen mode="range" .initialValue=${["01/03/2020", "20/03/2020"]}></sgds-datepicker>`
    );
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;

    const firstSelectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='1']") as HTMLElement;
    const lastSelectedDateEl = calendar.shadowRoot?.querySelector("td[data-day='20']") as HTMLElement;
    [firstSelectedDateEl, lastSelectedDateEl].forEach(d => {
      expect(d.classList.contains("text-white")).to.be.true;
      expect(d.classList.contains("bg-primary-600")).to.be.true;
    });
  });
  it("if today's date is selected, selected styles takes precedence over today date styles", async () => {
    const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker menuIsOpen></sgds-datepicker>`);
    const todayDate = new Date().getDate();
    const calendar = el.shadowRoot?.querySelector("sgds-datepicker-calendar") as DatepickerCalendar;
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const todayDateEl = calendar.shadowRoot?.querySelector(`td[data-day="${todayDate}"]`) as HTMLElement;
    expect(todayDateEl.classList.contains("text-primary")).to.be.true;
    expect(todayDateEl.classList.contains("text-white")).to.be.false;
    expect(todayDateEl.classList.contains("bg-primary-600")).to.be.false;

    todayDateEl.click();

    await calendar.updateComplete;
    await el.updateComplete;

    inputEl.click();
    await calendar.updateComplete;
    await el.updateComplete;

    expect(todayDateEl.classList.contains("text-primary")).to.be.false;
    expect(todayDateEl.classList.contains("text-white")).to.be.true;
    expect(todayDateEl.classList.contains("bg-primary-600")).to.be.true;
  });
});
