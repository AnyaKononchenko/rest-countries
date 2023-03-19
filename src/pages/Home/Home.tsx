import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCountries,
  selectPending,
  selectError,
  getCountries,
} from "../../features/countries/countriesSlice";
import { ENDPOINTS } from "../../services/resources";
import { PieChart } from "../../components";
import { FilterType } from "../../types/pieChartTypes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const countries = useAppSelector(selectCountries);
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const [filterOption, setFilterOption] = useState<FilterType>("region");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries(ENDPOINTS.all));
  }, [dispatch]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilterOption: FilterType
  ) => {
    setFilterOption(newFilterOption);
  };

  return (
    <Box sx={{ minHeight: "82vh", position:'relative' }}>
      <Typography
        variant='h2'
        fontSize='1.8rem'
        sx={{ m: "1rem" }}
        align='center'
        fontWeight='500'
      >
        Discover all Countries Of The World Here!
      </Typography>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ mt: "2rem" }}
      >
        <PieChart countries={countries} filterOption={filterOption}></PieChart>
        <Box display='flex' alignItems='center' flexDirection='column'>
          <Typography variant='body1' fontSize='1.3rem'>
            Do you want to see a distribution of countries?
          </Typography>
          <Typography variant='body2' fontSize='1.3rem'>
            Then choose one of the options:
          </Typography>
          <ToggleButtonGroup
            color='success'
            orientation='vertical'
            value={filterOption}
            exclusive
            onChange={handleChange}
            aria-label='Pie Chart Options'
            fullWidth={true}
          >
            <ToggleButton value='region'>Region</ToggleButton>
            <ToggleButton value='subregion'>Subregion</ToggleButton>
            <ToggleButton value='side'>Driving side</ToggleButton>
            <ToggleButton value='population'>Population</ToggleButton>
            <ToggleButton value='continents'>Continent</ToggleButton>
            <ToggleButton value='independent'>Independence</ToggleButton>
            <ToggleButton value='unMember'>UN Membership</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Button 
        sx={{p: '1rem', position: 'absolute', bottom: '2rem', left: "40%", width: '20%'}}
        variant='contained'
        color='primary'
        onClick={() => navigate("/countries")}>
        To the list of countries...
      </Button>
    </Box>
  );
};

export default Home;
