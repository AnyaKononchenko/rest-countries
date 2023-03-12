import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Footer, Header } from '../components';
import { Home, NotFound } from '../pages';

const Routes = require("react-router-dom").Routes;
const Route = require("react-router-dom").Route;

const Index = () => {
  return (
    <div className='page-content'>
      <Router>
        <Header></Header>
        <main>
          <Routes>
            <Route path='/' element={<Home></Home>} />
            <Route path='*' element={<NotFound></NotFound>} />
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default Index