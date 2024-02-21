import { getDaysInMonth, isLastDayOfMonth, lastDayOfMonth } from "date-fns";

export const DATE_PATTERNS = {
  "DD/MM/YYYY": {
    imPattern: "`dd{/}`mm{/}`yyyy",
    imRangePattern: "`dd{/}`mm{/}`yyyy - `DD{/}`MM{/}`YYYY",
    fnsPattern: "dd/MM/yyyy"
  },
  "MM/DD/YYYY": {
    imPattern: "`mm{/}`dd{/}`yyyy",
    imRangePattern: "`mm{/}`dd{/}`yyyy - `MM{/}`DD{/}`YYYY",
    fnsPattern: "MM/dd/yyyy"
  },
  "YYYY/MM/DD": {
    imPattern: "`yyyy{/}`mm{/}`dd",
    imRangePattern: "`yyyy{/}`mm{/}`dd - `YYYY{/}`MM{/}`DD",
    fnsPattern: "yyyy/MM/dd"
  }
};

/**
 * @description - creates calendar's year view years array with context of
 * datepicker's displayDate and current year
 * Fixes current year to the start of array
 */
export const createYearViewArray = (displayDate: Date, currentYear: number) => {
  // keeping the year range position to be always fixed by setting current year to the first element of the calendar
  const displayYear = displayDate.getFullYear();
  const remainder = (displayYear - currentYear) % 12;
  const yearsPosition = remainder < 0 ? 12 + remainder : remainder;

  const yearArray = [];
  const startLimit = displayYear - yearsPosition;
  const endLimit = displayYear - yearsPosition + 12 - 1; // -1 to match the index of the years (index starts from 0)

  for (let i = startLimit; i < endLimit + 1; i++) {
    yearArray.push(i);
  }

  return yearArray;
};
export const sanitizedNextMonth = (d: Date) => {
  const month = d.getMonth();
  const year = d.getFullYear();
  const date = d.getDate();
  const nextMonthDate = new Date(year, month + 1);
  const numberOfDaysNextMonth = getDaysInMonth(nextMonthDate);

  if (isLastDayOfMonth(d) && numberOfDaysNextMonth < date) {
    return lastDayOfMonth(nextMonthDate);
  } else {
    return new Date(year, month + 1, date);
  }
};
export const sanitizedPreviousMonth = (d: Date) => {
  const month = d.getMonth();
  const year = d.getFullYear();
  const date = d.getDate();
  const prevMonthDate = new Date(year, month - 1);
  const numberOfDaysPrevMonth = getDaysInMonth(prevMonthDate);
  if (isLastDayOfMonth(d) && numberOfDaysPrevMonth < date) {
    return lastDayOfMonth(prevMonthDate);
  } else {
    return new Date(year, month - 1, date);
  }
};
export const setTimeToNoon = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(12);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const sortAscDates = (dates: Date[]) => {
  return dates.sort((a, b) => a.getTime() - b.getTime());
};

