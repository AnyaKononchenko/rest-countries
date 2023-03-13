import { Badge } from '@mui/material'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { GoHeart } from 'react-icons/go'
import { IoEarthOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='links'>
      <Link to='/'><AiFillHome className='icon home-icon'></AiFillHome></Link>
      <Link to='/countries'><IoEarthOutline className='icon earth-icon'></IoEarthOutline></Link>

      <Badge badgeContent={2} color="secondary">
        <Link to='/saved'><GoHeart className='icon saved-icon'></GoHeart></Link>
      </Badge>
    </nav>
  )
}

export default Navbar