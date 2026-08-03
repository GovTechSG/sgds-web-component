/**
 * Lightweight date utility functions replacing date-fns.
 * Only supports the 3 date patterns used by the Datepicker component.
 */

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}

/**
 * Format a date using one of the 3 known patterns or "PPPP" (full locale date).
 */
export function formatDate(date: Date, pattern: string): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dd = day < 10 ? "0" + day : String(day);
  const mm = month < 10 ? "0" + month : String(month);
  const yyyy = String(year);

  switch (pattern) {
    case "dd/MM/yyyy":
      return `${dd}/${mm}/${yyyy}`;
    case "MM/dd/yyyy":
      return `${mm}/${dd}/${yyyy}`;
    case "yyyy/MM/dd":
      return `${yyyy}/${mm}/${dd}`;
    case "PPPP": {
      const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
      const ordinal = getOrdinalSuffix(date.getDate());
      return `${weekday}, ${month} ${ordinal}, ${date.getFullYear()}`;
    }
    default:
      return `${dd}/${mm}/${yyyy}`;
  }
}

export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function isAfterDate(a: Date, b: Date): boolean {
  return a.getTime() > b.getTime();
}

export function isBeforeDate(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}

export function isEqualDate(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}

export function isLastDayOfMonth(date: Date): boolean {
  return date.getDate() === getDaysInMonth(date);
}

export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function lastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Parse a date string using one of the 3 known patterns:
 * - "dd/MM/yyyy"
 * - "MM/dd/yyyy"
 * - "yyyy/MM/dd"
 */
export function parseDate(dateStr: string, pattern: string): Date {
  const parts = dateStr.split("/");
  let day: number, month: number, year: number;

  switch (pattern) {
    case "dd/MM/yyyy":
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
      break;
    case "MM/dd/yyyy":
      month = parseInt(parts[0], 10) - 1;
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
      break;
    case "yyyy/MM/dd":
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
      break;
    default:
      return new Date(NaN);
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return new Date(NaN);
  }

  const date = new Date(year, month, day, 12, 0, 0, 0);
  // Validate that the parsed date matches the input (catches invalid dates like 31/02/2024)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return new Date(NaN);
  }
  return date;
}
