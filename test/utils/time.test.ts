import { setTimeToNoon } from "../../src/utils/time";
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
