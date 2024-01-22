export const setTimeToNoon = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(12);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};
