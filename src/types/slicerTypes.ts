import { Country } from "./countryType";

export interface CountriesState {
  countries: Country[],
  pending: boolean,
  error: string,
  search: Country[],
  saved: Country[],
}

export type SearchType = {
  payload: string,
}

export type SavedType = {
  payload: Country,
}