import React, { useState } from "react";

import orderBy from "lodash/orderBy";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  useTheme,
  CardMedia,
} from "@mui/material";
import { Country } from "../../types/countryType";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { useAppDispatch } from "../../app/hooks";
import { updateSavedCountry } from "../../features/countries/countriesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SortDirection, TableProps, TableState } from "../../types/tableTypes";
import FavMessage from "../PopUps/FavMessage";
import {
  StyledTableRow,
  StyledTableHeader,
  SortedHeaderContent,
} from "../../styles/styles";

const CountriesTable = (props: TableProps) => {
  const { countries } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  const [tableState, setTableState] = useState<TableState>({
    sortColumn: "",
    sortDirection: "desc",
    page: 0,
    rowsPerPage: 10,
  });

  // to create a list of languages out of object
  const langObjectToList = (object: Object) => {
    const values = Object.values(object);
    return (
      <ul aria-label='list of languages'>
        {values.map((value: string, index: number) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    );
  };

  const handleSaved = (country: Country) => {
    dispatch(updateSavedCountry(country));

    !country.isSaved
      ? setMessage("You have saved this country to favourites!")
      : setMessage("You have deleted this country from favourites!");

    setOpen(true);
  };

  const invertDirection: { asc: SortDirection; desc: SortDirection } = {
    asc: "desc",
    desc: "asc",
  };

  const handleSort = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    const sortParam = event.currentTarget.innerText.toLowerCase();
    setTableState({
      ...tableState,
      sortColumn: sortParam === "name" ? "name.common" : sortParam,
      sortDirection: tableState.sortDirection
        ? invertDirection[tableState.sortDirection]
        : "desc",
    });
  };

  const headersToSort = ["name.common", "Region", "Population"];

  const sortedHeaders = headersToSort.map((header, index) => (
    <StyledTableHeader
      key={index}
      width='15%'
      onClick={handleSort}
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      <SortedHeaderContent>
        {tableState.sortColumn === header.toLowerCase() && (
          <>
            {tableState.sortDirection === "desc" ? (
              <ArrowDropDownIcon
                sx={{ m: { lg: "0", md: "0", sm: "0 auto", xs: "0 auto" } }}
              />
            ) : (
              <ArrowDropUpIcon
                sx={{ m: { lg: "0", md: "0", sm: "0 auto", xs: "0 auto" } }}
              />
            )}
          </>
        )}
        {header !== "name.common" ? header : "Name"}
      </SortedHeaderContent>
    </StyledTableHeader>
  ));

  const countriesRows = (array: Country[]) =>
    array.map((country: Country, index: number) => (
      <StyledTableRow key={index}>
        <TableCell>
          <CardMedia
            component='img'
            height='auto'
            image={country.flags.png}
            alt={
              country.flags.alt
                ? country.flags.alt
                : `${country.name.common} flag`
            }
            sx={{
              borderRadius: {
                lg: "10px",
                md: "8px",
                sm: "5px",
                xs: "1px",
              },
              aspectRatio: "3/2",
            }}
          />
        </TableCell>
        <TableCell>
          <Link to='/country' state={country.name.common} color='primary.main'>
            <Typography variant='body2'>{country.name.common}</Typography>
          </Link>
        </TableCell>
        <TableCell>{country.region}</TableCell>
        <TableCell>{country.population}</TableCell>
        <TableCell>
          {country.languages ? langObjectToList(country.languages) : ""}
        </TableCell>
        <TableCell>
          <FavoriteIcon
            className='cursor-pointer'
            sx={{ color: country.isSaved ? "custom.main" : "primary.light" }}
            onClick={() => handleSaved(country)}
          ></FavoriteIcon>
        </TableCell>
        <TableCell>
          <Link to='/country' state={country.name.common}>
            <ArrowForwardIosIcon
              className='icon'
              sx={{
                color:
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "secondary.main",
                fontSize: "2rem",
              }}
            ></ArrowForwardIosIcon>
          </Link>
        </TableCell>
      </StyledTableRow>
    ));

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setTableState({
      ...tableState,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTableState({
      ...tableState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='list of countries'>
          <TableHead>
            <TableRow>
              <StyledTableHeader width='12%'>Flag</StyledTableHeader>
              {sortedHeaders}
              <StyledTableHeader width='15%'>Languages</StyledTableHeader>
              <StyledTableHeader width='5%'></StyledTableHeader>
              <StyledTableHeader width='5%'></StyledTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesRows(
              orderBy(
                countries,
                tableState.sortColumn,
                tableState.sortDirection
              )
            ).slice(
              tableState.page * tableState.rowsPerPage,
              tableState.page * tableState.rowsPerPage + tableState.rowsPerPage
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 250]}
          component='div'
          count={countries.length}
          page={tableState.page}
          onPageChange={handleChangePage}
          rowsPerPage={tableState.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <FavMessage open={open} message={message} setOpen={setOpen} />
    </>
  );
};

export default CountriesTable;
