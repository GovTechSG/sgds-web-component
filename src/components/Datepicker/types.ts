export interface CalendarKeyboardControllerOptions {
  cell: (table: unknown) => HTMLElement | null;
}

export type ViewEnum = "days" | "months" | "years";
