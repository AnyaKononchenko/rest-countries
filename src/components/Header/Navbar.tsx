import React from 'react'

import { Badge } from '@mui/material'
import { AiFillHome } from 'react-icons/ai'
import { GoHeart } from 'react-icons/go'
import { IoEarthOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectSaved } from '../../features/countries/countriesSlice'

const Navbar = () => {
  const saved = useAppSelector(selectSaved);
  return (
    <nav className='links'>
      <Link to='/'><AiFillHome className='icon home-icon'></AiFillHome></Link>
      <Link to='/countries'><IoEarthOutline className='icon earth-icon'></IoEarthOutline></Link>

      <Badge badgeContent={saved.length} color="secondary">
        <Link to='/saved'><GoHeart className='icon saved-icon'></GoHeart></Link>
      </Badge>
    </nav>
  )
}

export default Navbar