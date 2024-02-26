import { sanitizedNextMonth, setTimeToNoon, sanitizedPreviousMonth, createYearViewArray } from "../../src/utils/time";
import { expect } from "@open-wc/testing";

describe("setTimeToNoon", () => {
  it("receives a js Date object and returns same date but on noon time", () => {
    const mockYear = 1995;
    const mockMonth = 11;
    const mockDate = 17;
    const mockHour = 3;
    const mockMinute = 24;
    const mockSecond = 12;
    const testDate = new Date(mockYear, mockMonth, mockDate, mockHour, mockMinute, mockSecond);

    const noonDate = setTimeToNoon(testDate);
    expect(noonDate.getFullYear()).to.equal(mockYear);
    expect(noonDate.getMonth()).to.equal(11);
    expect(noonDate.getDate()).to.equal(mockDate);

    expect(noonDate.getHours()).not.to.equal(mockHour);
    expect(noonDate.getHours()).to.equal(12);

    expect(noonDate.getMinutes()).not.to.equal(mockMinute);
    expect(noonDate.getMinutes()).to.equal(0);

    expect(noonDate.getSeconds()).not.to.equal(mockSecond);
    expect(noonDate.getSeconds()).to.equal(0);
  });
});

describe("sanitizedNextMonth", async () => {
  it("when the current month has 31 days and next month has less than 31 days, it should return last day of the next month", () => {
    const testDate = new Date(2024, 0, 31);
    const nextMonthDate = sanitizedNextMonth(testDate);
    const expected = new Date(2024, 1, 29);
    expect(nextMonthDate).to.deep.equal(expected);
  });
  it("when the current month is on last day (29) and next month has more than 29 days, it should return 29th day of  next month", () => {
    const testDate = new Date(2024, 1, 29);
    const nextMonthDate = sanitizedNextMonth(testDate);
    const expected = new Date(2024, 2, 29);
    expect(nextMonthDate).to.deep.equal(expected);
  });
});
describe("sanitizedPreviousMonth", async () => {
  it("when the current month has 31 days and prev month has less than 31 days, it should return last day of the prev month", () => {
    const testDate = new Date(2023, 11, 31);
    const prevMonthDate = sanitizedPreviousMonth(testDate);
    const expected = new Date(2023, 10, 30);
    expect(prevMonthDate).to.deep.equal(expected);
  });
  it("when the current month is on last day (29) and prev month has more than 29 days, it should return 29th day of  prev month", () => {
    const testDate = new Date(2024, 1, 29);
    const prevMonthDate = sanitizedPreviousMonth(testDate);
    const expected = new Date(2024, 0, 29);
    expect(prevMonthDate).to.deep.equal(expected);
  });
});

describe("createYearViewArray", () => {
  it("when displayDate is same year as currentYear, returns expected array", () => {
    const [today, displayDate] = [new Date(), new Date()];

    const currentYear = today.getFullYear();
    let yearCount: number = currentYear;
    const expected: number[] = [];
    for (let i = 0; i < 12; i++) {
      expected.push(yearCount);
      yearCount++;
    }
    expect(createYearViewArray(displayDate, currentYear)).to.deep.equal(expected);
  });
  it("when displayDate's year is < +12 of currentYear, returns expected array", () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const displayDate = new Date(currentYear + 5, 3);
    let yearCount: number = currentYear;
    const expected: number[] = [];
    for (let i = 0; i < 12; i++) {
      expected.push(yearCount);
      yearCount++;
    }
    expect(createYearViewArray(displayDate, currentYear)).to.deep.equal(expected);
  });
  it("when displayDate's year is >= +12 of currentYear, returns the expected array", () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const displayDate = new Date(currentYear + 12, 3);

    let yearCount: number = currentYear + 12;
    const expected: number[] = [];
    for (let i = 0; i < 12; i++) {
      expected.push(yearCount);
      yearCount++;
    }
    expect(createYearViewArray(displayDate, currentYear)).to.deep.equal(expected);
  });
});
