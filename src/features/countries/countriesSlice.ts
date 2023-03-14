import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { BASE_URL } from '../../services/resources';
import axios from 'axios';
import { Country } from '../../types/types';


export interface CountriesState {
  countries: Country[],
  pending: boolean,
  error: string,
  search: Country[],
  saved: Country[],
}

const initialState: CountriesState = {
  countries: [],
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
  async (endpoint:string) => {
    const response = await fetchCountries(endpoint);
    return response.data;
  }
)

type SearchType = {
  payload: string,
}

type SavedType = {
  payload: Country,
}

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
    saveCountry: (state, action) => {
      const foundCountry = state.saved.find((country) => country.name.common === action.payload.name.common);
      if(foundCountry){
        state.saved = state.saved.filter((country) => country.name.common !== action.payload.name.common);
      } else {
        state.saved.push(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.pending = false;
      state.countries = action.payload;
    })
    builder.addCase(getCountries.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : 'Something went wrong..';
      state.pending = false;
      state.countries = [];
    })
  },
})

export const { search, saveCountry } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectPending = (state: RootState) => state.countries.pending;
export const selectError = (state: RootState) => state.countries.error;
export const selectSearch = (state: RootState) => state.countries.search;
export const selectSaved = (state: RootState) => state.countries.saved;

export default countriesSlice.reducer;
