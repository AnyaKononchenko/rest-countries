import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Footer, Header } from '../components';
import { Home, NotFound, CountriesList, CountryDetails, SavedCountries } from '../pages';

const Routes = require("react-router-dom").Routes;
const Route = require("react-router-dom").Route;

const Index = (props: {colorMode: any}) => {
  const {colorMode} = props;
  return (
    <div className='page-content'>
      <Router>
        <Header colorMode={colorMode}></Header>
        <main>
          <Routes>
            <Route path='/' element={<Home></Home>} />
            <Route path='/countries' element={<CountriesList></CountriesList>} />
            <Route path='/country' element={<CountryDetails></CountryDetails>} />
            <Route path='/saved' element={<SavedCountries></SavedCountries>} />
            <Route path='*' element={<NotFound></NotFound>} />
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default Index;