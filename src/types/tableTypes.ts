import { Country } from "./countryType";

export type TableProps = {
  countries: Country[];
};

export type SortDirection = "asc" | "desc";

export type TableState = {
  sortColumn: string;
  sortDirection: "asc" | "desc";
  page: number;
  rowsPerPage: number;
};