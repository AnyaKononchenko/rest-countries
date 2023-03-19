import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { BASE_URL } from '../../services/resources';
import { Country } from '../../types/countryType';
import { CountriesState, SavedType, SearchType } from '../../types/slicerTypes';
import axios from 'axios';


const initialState: CountriesState = {
  countries: [],
  countryDetails: [],
  pending: false,
  error: '',
  search: [],
  saved: [],
}

const fetchCountries = async (endpoint: string) => {
  let response = await axios.get(`${BASE_URL}/${endpoint}`);
  return response;
}

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async (endpoint: string) => {
    const response = await fetchCountries(endpoint);
    return response.data;
  }
)

export const getCountry = createAsyncThunk(
  'countries/getCountry',
  async (endpoint: string) => {
    const response = await fetchCountries(endpoint);
    return response.data;
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    search: (state, action: SearchType) => {
      return {
        ...state,
        search: state.countries.filter((country) =>
          country.name.common.toLowerCase().match(action.payload.toLowerCase()))
      }
    },
    updateSavedCountry: (state, action: SavedType): any => {
      const foundCountry = state.saved.find((country) => country.name.common === action.payload.name.common);
      if (foundCountry) {
        state.saved = state.saved.filter((country) => country.name.common !== foundCountry.name.common);
        state.countries = state.countries
          .map((country) => country.name.common === foundCountry.name.common
            ? country = { ...country, isSaved: false }
            : country)
        state.search = state.search
          .map((country) => country.name.common === foundCountry.name.common
            ? country = { ...country, isSaved: false }
            : country)
        state.countryDetails = state.countryDetails
          .map((country) => country.name.common === foundCountry.name.common
            ? country = { ...country, isSaved: false }
            : country);
      } else {
        const savedCountry = { ...action.payload, isSaved: true }
        state.saved = [...state.saved, savedCountry];
        state.countries = state.countries
          .map((country) => country.name.common === savedCountry.name.common
            ? country = { ...country, isSaved: true }
            : country);
        state.search = state.search
          .map((country) => country.name.common === savedCountry.name.common
            ? country = { ...country, isSaved: true }
            : country)
        state.countryDetails = state.countryDetails
          .map((country) => country.name.common === savedCountry.name.common
            ? country = { ...country, isSaved: true }
            : country);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.pending = false;
      let fetched: Country[] = action.payload;
      // updating state of countries in case there are saved countries
      if (state.saved.length > 0) {
        fetched = fetched.map((country) => {
          const saved = state.saved.find((savedCountry) => savedCountry.name.common === country.name.common);
          if (saved) {
            country = { ...country, ...saved }
          }
          return country;
        });
      }
      state.countries = fetched;
    })
    builder.addCase(getCountries.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : 'Something went wrong..';
      state.pending = false;
      state.countries = [];
    })
    // get a country for details page
    builder.addCase(getCountry.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.pending = false;
      state.error = '';
      state.countryDetails = action.payload;
    })
    builder.addCase(getCountry.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : 'Something went wrong..';
      state.pending = false;
      state.countryDetails = [];
    })
  },
})

export const { search, updateSavedCountry } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectCountryDetails = (state: RootState) => state.countries.countryDetails;
export const selectPending = (state: RootState) => state.countries.pending;
export const selectError = (state: RootState) => state.countries.error;
export const selectSearch = (state: RootState) => state.countries.search;
export const selectSaved = (state: RootState) => state.countries.saved;

export default countriesSlice.reducer;
