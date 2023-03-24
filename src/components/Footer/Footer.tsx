import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Links, Footer as CustomFooter } from "../../styles/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <CustomFooter role='footer'>
      <Typography variant='subtitle1'>
        &copy; Created by Anna Kononchenko
      </Typography>

      <Links>
        <Link to='https://github.com/AnyaKononchenko' target='_blank'>
          <GitHubIcon color='primary'/>
        </Link>

        <Link to='http://www.linkedin.com/in/anna-kononchenko' target='_blank'>
          <LinkedInIcon color='primary'/>
        </Link>
      </Links>
    </CustomFooter>
  );
};

export default Footer;
