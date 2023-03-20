import Navbar from "./Navbar";
import { IoMenuSharp } from "react-icons/io5";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          height: {
            lg: "8vh",
            md: "8vh",
            sm: "10vh",
            xs: "10vh",
          },
        }}
      >
        <Toolbar
          sx={{
            flexWrap: {
              lg: "no-wrap",
              md: "wrap",
              sm: "wrap",
              xs: "wrap",
            },
          }}
        >
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <IoMenuSharp />
          </IconButton>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            COUNTRIES
          </Typography>

          <Navbar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
