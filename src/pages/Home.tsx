import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getAllCountries, selectCountries } from '../features/countries/countriesSlice';


const Home = () => {
  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  countries && console.log(countries);

  return (
    <div>
      <p>Home</p>
    </div>
  )
}

export default Home;