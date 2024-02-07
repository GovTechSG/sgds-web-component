import { getDaysInMonth, isLastDayOfMonth, lastDayOfMonth } from "date-fns";

const CURRENT_YEAR = new Date().getFullYear();
export const calculateYearRange = (displayDate: Date) => {
  // keeping the year range position to be always fixed by setting current year to the first element of the calendar
  const displayYear = displayDate.getFullYear();
  const yearsPosition = (displayYear - CURRENT_YEAR) % 12;
  const startLimit = displayYear - yearsPosition;
  const endLimit = displayYear - yearsPosition + 12 - 1; // -1 to match the index of the years (index starts from 0)
  const yearArray: number[] = [];
  for (let i = startLimit; i < endLimit + 1; i++) {
    yearArray.push(i);
  }
  return { yearArray, displayYear };
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
