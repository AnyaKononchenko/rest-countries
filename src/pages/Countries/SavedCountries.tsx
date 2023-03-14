import { Box, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { CountriesTable } from '../../components'
import { selectSaved } from '../../features/countries/countriesSlice'

const SavedCountries = () => {
  const saved = useAppSelector(selectSaved);
  console.log("saved", saved);
  return (
    <Box sx={{
      m: "1rem",
      minHeight: "80vh",
      }}>
      <Typography variant='h4' align='center' sx={{m: "1rem 0"}}>Browse The Countries You Saved</Typography>
      <>
        {
          saved.length > 0 ? <CountriesTable countries={saved}/> :
          <Typography variant='subtitle1' align='center'>You don't have any saved countries yet.</Typography>
        }
      </>
    </Box>
  )
}

export default SavedCountries