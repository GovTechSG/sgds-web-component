export interface ISgdsDataTableRowSelectEventDetail {
  selected: Record<string, string>[];
}

export interface ISgdsDataTableSortEventDetail {
  key: string;
  direction: "ascending" | "descending" | "none";
}
