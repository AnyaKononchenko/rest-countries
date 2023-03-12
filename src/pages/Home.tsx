import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getAllCountries, selectCountries } from '../features/countries/countriesSlice';

import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { GoHeart } from 'react-icons/go';
import { SlArrowRight } from 'react-icons/sl';

const Home = () => {
  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  countries && console.log(countries);

  const countriesRows = countries.map((country, index) => (
    <TableRow key={index}>
      <TableCell><img src={country.flags.png} alt={country.flags.alt ? country.flags.alt : `${country.name.common} flag`} /></TableCell>
      <TableCell>{country.name.common}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.population}</TableCell>
      <TableCell>{country.languages ? Object.values(country.languages) : ''}</TableCell>
      <TableCell><GoHeart></GoHeart></TableCell>
      <TableCell><SlArrowRight></SlArrowRight></TableCell>
    </TableRow>
    )
  )

  return (
    <div>
      <p>Home</p>
      <TableContainer component={Paper}>
        <Table aria-label='list of countries'>
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell><GoHeart></GoHeart></TableCell>
              <TableCell><SlArrowRight></SlArrowRight></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesRows}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home;