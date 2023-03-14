import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getCountries, selectCountries, selectPending, selectError, search, selectSearch } from '../features/countries/countriesSlice';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';

import { GoHeart } from 'react-icons/go';
import { SlArrowRight } from 'react-icons/sl';
import { Country } from '../types/types';
import { ENDPOINTS } from '../services/resources';

import { Loading, Error } from '../components';

const CountriesList = () => {
  const countries = useAppSelector(selectCountries);
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const searchResults = useAppSelector(selectSearch);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries(ENDPOINTS.all));
  }, [dispatch]);

  const objectToList = (object: Object) => {
    const values = Object.values(object);
    return (
      <ul aria-label='list of languages'>
        {values.map((value: string, index: number) => <li key={index}>{value}</li>)}
      </ul>
    );
  }

  const countriesRows = (array: Country[]) => array.map((country: Country, index: number) => (
    <TableRow key={index}>
      <TableCell><img src={country.flags.png} alt={country.flags.alt ? country.flags.alt : `${country.name.common} flag`} className='country__flag' /></TableCell>
      <TableCell>{country.name.common}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.population}</TableCell>
      <TableCell>{country.languages ? objectToList(country.languages) : ''}</TableCell>
      <TableCell><GoHeart className='icon heart-icon'></GoHeart></TableCell>
      <TableCell><Link to='/country' state={country.name.common}><SlArrowRight className='icon arrow-icon'></SlArrowRight></Link></TableCell>
    </TableRow>
  ));

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
          <TableContainer component={Paper}>
            <Table aria-label='list of countries'>
              <TableHead>
                <TableRow>
                  <TableCell width='15%'>Flag</TableCell>
                  <TableCell width='15%'>Name</TableCell>
                  <TableCell width='15%'>Region</TableCell>
                  <TableCell width='15%'>Population</TableCell>
                  <TableCell width='15%'>Languages</TableCell>
                  <TableCell width='5%'></TableCell>
                  <TableCell width='5%'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesRows(searchInput.length > 0 ? searchResults : countries)}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      }
    </>
  )
}

export default CountriesList;