import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap='1rem'
      height='8vh'
    >
      <Typography variant='subtitle1'>&copy; Created by Anna Kononchenko</Typography>

      <Link to='https://github.com/AnyaKononchenko' target='_blank'>
        <Typography variant='subtitle1' color='primary'><AiFillGithub fontSize='1.5rem'/></Typography>
      </Link>

      <Link to='http://www.linkedin.com/in/anna-kononchenko' target='_blank'>
        <Typography variant='subtitle1' color='primary'><AiFillLinkedin fontSize='1.5rem'/></Typography>
      </Link>
    </Box>
  )
}

export default Footer