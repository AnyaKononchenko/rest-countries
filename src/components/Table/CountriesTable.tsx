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
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Country } from "../../types/countryType";

import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from "react-icons/hi";
import { useAppDispatch } from "../../app/hooks";
import { updateSavedCountry } from "../../features/countries/countriesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { SortDirection, TableProps, TableState } from "../../types/tableTypes";

const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.primary.light
      : theme.palette.primary.main,
  color:
    theme.palette.mode === "light"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  fontWeight: "600",
  fontSize: 16,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CountriesTable = (props: TableProps) => {
  const { countries } = props;
  const theme = useTheme();

  const [tableState, setTableState] = useState<TableState>({
    sortColumn: "",
    sortDirection: "desc",
    page: 0,
    rowsPerPage: 10,
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  const dispatch = useAppDispatch();

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

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

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
      {tableState.sortColumn === header.toLowerCase() && (
        <>
          {tableState.sortDirection === "desc" ? (
            <HiOutlineArrowSmDown />
          ) : (
            <HiOutlineArrowSmUp />
          )}
        </>
      )}
      {header !== "name.common" ? header : "Name"}
    </StyledTableHeader>
  ));

  const countriesRows = (array: Country[]) =>
    array.map((country: Country, index: number) => (
      <StyledTableRow key={index}>
        <TableCell>
          <img
            src={country.flags.png}
            alt={
              country.flags.alt
                ? country.flags.alt
                : `${country.name.common} flag`
            }
            className='country__flag'
          />
        </TableCell>
        <TableCell>
          <Link to='/country' state={country.name.common}>
            <Typography variant='body2' color='primary'>
              {country.name.common}
            </Typography>
          </Link>
        </TableCell>
        <TableCell>{country.region}</TableCell>
        <TableCell>{country.population}</TableCell>
        <TableCell>
          {country.languages ? langObjectToList(country.languages) : ""}
        </TableCell>
        <TableCell>
          <FavoriteIcon
            className='icon'
            sx={{ color: country.isSaved ? "custom.main" : "primary.main" }}
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
              <StyledTableHeader width='15%'>Flag</StyledTableHeader>
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default CountriesTable;
