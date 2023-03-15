import React, { useState } from 'react';

import orderBy from 'lodash/orderBy';
import { Link } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Country } from '../../types/types';
import { GoHeart } from 'react-icons/go';
import { SlArrowRight } from 'react-icons/sl';
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from 'react-icons/hi'
import { useAppDispatch } from '../../app/hooks';
import { saveCountry } from '../../features/countries/countriesSlice';


type TableProps = {
  countries: Country[],
}

type SortDirection = 'asc' | 'desc';

const CountriesTable = (props: TableProps) => {
  const { countries } = props;
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useAppDispatch();

  // to create a list of languages out of object
  const langObjectToList = (object: Object) => {
    const values = Object.values(object);
    return (
      <ul aria-label='list of languages'>
        {values.map((value: string, index: number) => <li key={index}>{value}</li>)}
      </ul>
    );
  }

  const handleSaved = (country: Country) => {
    dispatch(saveCountry(country));
  }

  const invertDirection: { asc: SortDirection, desc: SortDirection } = {
    asc: 'desc',
    desc: 'asc',
  }

  const handleSort = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    const sortParam = event.currentTarget.innerText.toLowerCase();
    setSortColumn(sortParam === 'name' ? 'name.common' : sortParam);
    setSortDirection(sortDirection ? invertDirection[sortDirection] : 'desc');
  }

  const headersToSort = ['name.common', 'Region', 'Population'];

  const sortedHeaders = headersToSort.map((header, index) =>
    <TableCell key={index} width='15%' onClick={handleSort} sx={{ '&:hover': { 'cursor': 'pointer' } }}>
      {sortColumn === header.toLowerCase() &&
        <>
          {sortDirection === 'desc' ? <HiOutlineArrowSmDown /> : <HiOutlineArrowSmUp />}
        </>
      }
      <span>{header !== 'name.common' ? header : 'Name'}</span>
    </TableCell>
  )

  const countriesRows = (array: Country[]) => array.map((country: Country, index: number) => (
    <TableRow key={index}>
      <TableCell><img src={country.flags.png} alt={country.flags.alt ? country.flags.alt : `${country.name.common} flag`} className='country__flag' /></TableCell>
      <TableCell>{country.name.common}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.population}</TableCell>
      <TableCell>{country.languages ? langObjectToList(country.languages) : ''}</TableCell>
      <TableCell><GoHeart className={`icon heart-icon ${country.isSaved && 'saved'}`} onClick={() => handleSaved(country)}></GoHeart></TableCell>
      <TableCell><Link to='/country' state={country.name.common}><SlArrowRight className='icon arrow-icon'></SlArrowRight></Link></TableCell>
    </TableRow>
  ));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='list of countries'>
          <TableHead>
            <TableRow>
              <TableCell width='15%'>Flag</TableCell>
              {sortedHeaders}
              <TableCell width='15%'>Languages</TableCell>
              <TableCell width='5%'></TableCell>
              <TableCell width='5%'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesRows(orderBy(countries, sortColumn, sortDirection))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 250]}
          component="div"
          count={countries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default CountriesTable