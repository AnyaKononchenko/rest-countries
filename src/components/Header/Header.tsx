import React from 'react'

import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoEarthOutline, IoMenuSharp } from 'react-icons/io5';
import { GoHeart } from 'react-icons/go';

import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className="header__element flex-centered">
        <IoMenuSharp className='icon burger-icon'></IoMenuSharp>
        <h1>COUNTRY</h1>
      </div>
      <div className="header__element flex-centered">
        <nav>
          <Link to='/'><AiFillHome className='icon home-icon'></AiFillHome></Link>
          <Link to='/earth'><IoEarthOutline className='icon earth-icon'></IoEarthOutline></Link>
          <Link to='/saved'><GoHeart className='icon saved-icon'></GoHeart></Link>
        </nav>
        <div className="theme-switch">
          <div className='switch__line'>
            <div className="switch__head"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header