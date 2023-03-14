import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCountries, selectCountries, selectPending, selectError, search, selectSearch, saveCountry } from '../../features/countries/countriesSlice';

import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';


import { Country } from '../../types/types';

import { ENDPOINTS } from '../../services/resources';

import { Loading, Error, CountriesTable } from '../../components';

const CountriesList = () => {
  const countries = useAppSelector(selectCountries);
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const searchResults = useAppSelector(selectSearch);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries(ENDPOINTS.all));
  }, [dispatch]);

  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput((prevState) => prevState = event.target.value);
  }

  useEffect(() => {
    dispatch(search(searchInput));
  }, [searchInput, dispatch] )

  return (
    <>
      {error && <Error message={error}></Error>}
      {
        pending ? <Loading /> :
        <section className='countries-list'>
          <TextField
            id="search"
            label="Search here"
            type="search"
            margin="normal"
            value={searchInput}
            onChange={handleSearch}
          />
          <CountriesTable countries={searchInput.length > 0 ? searchResults : countries}/>
        </section>
      }
    </>
  )
}

export default CountriesList;