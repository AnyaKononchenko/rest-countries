import React from "react";

import { Badge, Box } from "@mui/material";
import { Link } from "react-router-dom";

import CottageIcon from "@mui/icons-material/Cottage";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAppSelector } from "../../app/hooks";
import { selectSaved } from "../../features/countries/countriesSlice";

const Navbar = () => {
  const saved = useAppSelector(selectSaved);
  return (
    <Box sx={{ width: { lg: "10%", md: "15%", sm: "100%", xs: "100%" }, mr: { lg: "3rem", md: "4rem", sm: "4rem", xs: ".5rem" } }}>
      <nav className='links'>
        <Link to='/'>
          <CottageIcon
            sx={{
              fontSize: {
                lg: "1.8rem",
                md: "1.8rem",
                sm: "2.1rem",
                xs: "2.1rem",
              },
            }}
          ></CottageIcon>
        </Link>
        <Link to='/countries'>
          <PublicIcon
            sx={{
              fontSize: {
                lg: "1.8rem",
                md: "1.8rem",
                sm: "2.1rem",
                xs: "2.1rem",
              },
            }}
          ></PublicIcon>
        </Link>

        <Badge badgeContent={saved.length} color='secondary'>
          <Link to='/saved'>
            <FavoriteIcon
              sx={{
                fontSize: {
                  lg: "1.8rem",
                  md: "1.8rem",
                  sm: "2.1rem",
                  xs: "2.1rem",
                },
              }}
            ></FavoriteIcon>
          </Link>
        </Badge>
      </nav>
    </Box>
  );
};

export default Navbar;
