import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { BASE_URL } from '../../services/resources';
import axios from 'axios';
import { Country } from '../../types/types';


export interface CountriesState {
  countries: Country[],
  status: 'idle' | 'loading' | 'failed',
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
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

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    search: (state) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.status = 'idle';
      state.countries = action.payload;
    })
    builder.addCase(getCountries.rejected, (state) => {
      state.status = 'failed';
    })
  },
})

export const { search } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;

export default countriesSlice.reducer;
