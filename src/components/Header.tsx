import React from 'react'

import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoEarthOutline } from 'react-icons/io5';
import { GoHeart } from 'react-icons/go';

const Header = () => {
  return (
    <header>
      <h1>COUNTRY</h1>
      <nav>
        <Link to='/'><AiFillHome className='home-icon'></AiFillHome></Link>
        <Link to='/earth'><IoEarthOutline className='earth-icon'></IoEarthOutline></Link>
        <Link to='/saved'><GoHeart className='saved-icon'></GoHeart></Link>
      </nav>
    </header>
  )
}

export default Header