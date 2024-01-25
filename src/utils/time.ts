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

interface IMonthYear {
  month: string;
  year: number;
}
const MONTHVIEW_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const monthsWithYear = (displayYear: number): IMonthYear[] => {
  return MONTHVIEW_LABELS.map(m => ({ month: m, year: displayYear }));
};

export const setTimeToNoon = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(12);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};
