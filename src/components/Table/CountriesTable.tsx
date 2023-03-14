import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

import { Country } from '../../types/types';

import { GoHeart } from 'react-icons/go';
import { SlArrowRight } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { saveCountry, selectSaved } from '../../features/countries/countriesSlice';

type TableProps = {
  countries: Country[],
}

const CountriesTable = (props: TableProps) => {
  const { countries } = props;

  const saved = useAppSelector(selectSaved);

  const dispatch = useAppDispatch();

  // const [isSaved, setIsSaved] = useState<string>('');

  // to create a list of languages out of object
  const objectToList = (object: Object) => {
    const values = Object.values(object);
    return (
      <ul aria-label='list of languages'>
        {values.map((value: string, index: number) => <li key={index}>{value}</li>)}
      </ul>
    );
  }

  // const isSaved = (currentCountry: Country): string=> {
  //   console.log('isSaved ran')
  //   const found = saved.find((country) => country.name.common === currentCountry.name.common);
  //   return found ? 'saved' : '';
  // }

  const handleSaved = (event: React.MouseEvent<SVGElement, MouseEvent>, country: Country) => {
    dispatch(saveCountry(country));
    // event.currentTarget.classList.contains('saved') ?
    //   event.currentTarget.classList.remove('saved') :
    //   event.currentTarget.classList.add('saved');
    // setIsSaved('saved')
  }

  const countriesRows = (array: Country[]) => array.map((country: Country, index: number) => (
    <TableRow key={index}>
      <TableCell><img src={country.flags.png} alt={country.flags.alt ? country.flags.alt : `${country.name.common} flag`} className='country__flag' /></TableCell>
      <TableCell>{country.name.common}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.population}</TableCell>
      <TableCell>{country.languages ? objectToList(country.languages) : ''}</TableCell>
      <TableCell><GoHeart className={`icon heart-icon ${country.isSaved && 'saved'}`} onClick={(event) => handleSaved(event, country)}></GoHeart></TableCell>
      <TableCell><Link to='/country' state={country.name.common}><SlArrowRight className='icon arrow-icon'></SlArrowRight></Link></TableCell>
    </TableRow>
  ));

  return (
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
          {countriesRows(countries)}
          {/* {countriesRows(searchInput.length > 0 ? searchResults : countries)} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CountriesTable