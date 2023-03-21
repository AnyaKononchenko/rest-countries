import React from "react";

import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CottageIcon from "@mui/icons-material/Cottage";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAppSelector } from "../../app/hooks";
import { selectSaved } from "../../features/countries/countriesSlice";
import { NavbarIcon, Navbar as CustomNavbar } from "../../styles/styles";

const Navbar = () => {
  const saved = useAppSelector(selectSaved);
  const navigate = useNavigate();
  return (
    <CustomNavbar aria-label='navigation' role='navbar'>
      <NavbarIcon
        aria-label='go home'
        onClick={() => navigate("/")}
      >
        <CottageIcon
          sx={{
            fontSize: "1.8rem",
            color: "primary.light",
          }}
        ></CottageIcon>
      </NavbarIcon>

      <NavbarIcon
        aria-label='go to countries list'
        onClick={() => navigate("/countries")}
      >
        <PublicIcon
          sx={{
            fontSize: "1.8rem",
            color: "primary.light",
          }}
        ></PublicIcon>
      </NavbarIcon>

      <NavbarIcon
        aria-label='go to saved'
        onClick={() => navigate("/saved")}
      >
        <Badge badgeContent={saved.length} color='secondary'>
          <FavoriteIcon
            sx={{
              fontSize: "1.8rem",
              color: "primary.light",
              display: {
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          ></FavoriteIcon>
        </Badge>
      </NavbarIcon>
    </CustomNavbar>
  );
};

export default Navbar;
