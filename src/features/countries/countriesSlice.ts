import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { BASE_URL } from '../../static/resources';
import axios from 'axios';


export interface CountriesState {
  countries: [],
  status: 'idle' | 'loading' | 'failed',
}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
}

const fetchCountries = async (endpoint?: string | null) => {
  endpoint = typeof endpoint === 'undefined' ? null : endpoint;
  let response = await axios.get(`${BASE_URL}${endpoint ? '/'.concat(endpoint) : ''}`);
  return response;
}

export const getAllCountries = createAsyncThunk(
  'countries/getAllCountries',
  async () => {
    const response = await fetchCountries();
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
    builder.addCase(getAllCountries.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.status = 'idle';
      state.countries = action.payload;
    })
    builder.addCase(getAllCountries.rejected, (state) => {
      state.status = 'failed';
    })
  },
})

export const { search } = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries.countries;

export default countriesSlice.reducer;
