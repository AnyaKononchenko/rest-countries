import Navbar from './Navbar';
import { IoMenuSharp } from 'react-icons/io5';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

const Header = () => { 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IoMenuSharp />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            COUNTRIES
          </Typography>

          <Navbar />

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header