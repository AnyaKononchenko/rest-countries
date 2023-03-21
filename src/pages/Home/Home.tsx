import React, { useEffect, useState } from "react";
import {
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
import { Error, Loading, PieChart } from "../../components";
import { FilterType } from "../../types/pieChartTypes";
import { useNavigate } from "react-router-dom";
import { HomeContent, HomeWrapper, ControlsWrapper } from "../../styles/styles";

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
    <>
      {error && <Error message={error} />}
      {pending ? (
        <Loading />
      ) : (
        <HomeWrapper >
          <Typography
            variant='h2'
            fontSize='1.8rem'
            sx={{ m: "1rem" }}
            align='center'
            fontWeight='500'
          >
            Discover all Countries Of The World Here!
          </Typography>
          <HomeContent>
            <PieChart
              countries={countries}
              filterOption={filterOption}
            ></PieChart>

            <ControlsWrapper>
              <Typography variant='body1' fontSize='1.3rem' align='center'>
                Do you want to see a distribution of countries?
              </Typography>
              <Typography variant='body2' fontSize='1.3rem' sx={{ m: "1rem 0 .5rem 0" }} align='center'>
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
            </ControlsWrapper>
          </HomeContent>
          <Button
            sx={{
              p: "1rem",
              m: "1rem 0",
              width: "20rem",
              alignSelf:'bottom',
            }}
            variant='contained'
            color='primary'
            onClick={() => navigate("/countries")}
          >
            To the list of countries...
          </Button>
        </HomeWrapper>
      )}
    </>
  );
};

export default Home;
