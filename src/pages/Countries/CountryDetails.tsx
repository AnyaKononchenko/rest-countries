
import React, { useEffect } from "react";
import { useLocation} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getCountry,
  selectCountryDetails,
  selectError,
  selectPending,
} from "../../features/countries/countriesSlice";
import { ENDPOINTS } from "../../services/resources";

import { CountryCard, Error, Loading } from "../../components";

const CountryDetails = () => {
  const { state: countryName } = useLocation();

  const dispatch = useAppDispatch();

  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);

  const country = useAppSelector(selectCountryDetails)[0];

  useEffect(() => {
    dispatch(getCountry(`${ENDPOINTS.name}/${countryName}`));
  }, [countryName, dispatch]);

  return (
    <>
      {error && <Error message={error} />}
      {pending ? (
        <Loading />
      ) : (
        <CountryCard country={country} />
      )}
    </>
  );
};

export default CountryDetails;
