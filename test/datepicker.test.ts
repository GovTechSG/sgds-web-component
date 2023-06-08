import { assert, elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import { SgdsButton } from "../src/components/Button";
import { SgdsInput } from "../src/components/Input";
import "../src/components/Datepicker";
import { Calendar, SgdsDatepicker } from "../src/components/Datepicker";

// Extend the type of SgdsDatepicker to include the custom method
interface CustomSgdsDatepicker extends SgdsDatepicker {
  makeInputValueString(startDate: Date | undefined, endDate: Date | undefined, dateFormat: string): string;
}
describe("SgdsDatepicker", () => {
  describe("makeInputValueString", () => {
    it("returns an empty string when given an undefined value", async () => {
      const el = await fixture<CustomSgdsDatepicker>(html`<sgds-datepicker disabled></sgds-datepicker>`);
      const result = el.makeInputValueString(undefined, undefined, "DD/MM/YYYY");
      expect(result).to.equal("");
    });

    it("returns a formatted date string when given a valid Date value", async () => {
      const el = await fixture<CustomSgdsDatepicker>(html`<sgds-datepicker></sgds-datepicker>`);
      const date = new Date("2023-04-15");
      const result = el.makeInputValueString(date, undefined, "DD/MM/YYYY");
      expect(result).to.equal("15/04/2023");
    });
  });

  describe("disabled", () => {
    it("disables the component when disabled property is true", async () => {
      const el = await fixture<SgdsDatepicker>(html`<sgds-datepicker disabled></sgds-datepicker>`);
      const input = el.shadowRoot?.querySelector("sgds-input") as HTMLInputElement;
      const button = el.shadowRoot?.querySelector("sgds-button") as HTMLButtonElement;
      expect(input?.disabled).to.be.true;
      expect(button?.disabled).to.be.true;
    });
  });

  describe("dateFormat", () => {
    it("displays the correct date format in the placeholder", async () => {
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
  });

  //when displayDate prop passed, Calendar should reflect correct month

  it("formats the selected date based on the dateFormat (mm/dd/yyyy)", async () => {
    const calendar = await fixture<Calendar>(html`
      <sgds-datepicker-calendar dateFormat="MM/DD/YYYY"></sgds-datepicker-calendar>
    `);

    const clickHandlerSpy = sinon.spy(calendar, "handleDayClick");
    const dayElement = calendar.shadowRoot?.querySelector('td[data-day="10"]') as HTMLTableCellElement;
    dayElement.click();

    assert.isTrue(clickHandlerSpy.calledOnce);
    assert.equal(calendar.displayDateInput.toLocaleDateString(), "06/10/2023");
  });

  it("formats the selected date based on the dateFormat (yyyy/mm/dd)", async () => {
    const calendar = await fixture<Calendar>(html`
      <sgds-datepicker-calendar dateFormat="YYYY/MM/DD"></sgds-datepicker-calendar>
    `);

    const clickHandlerSpy = sinon.spy(calendar, "handleDayClick");
    const dayElement = calendar.shadowRoot?.querySelector('td[data-day="10"]') as HTMLTableCellElement;
    dayElement.click();

    assert.isTrue(clickHandlerSpy.calledOnce);
    assert.equal(calendar.displayDateInput.toLocaleDateString(), "2023/06/10");
  });
});
