import React from "react";
import { Typography } from "@mui/material";
import { Handler } from "../../styles/styles";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NotFound = () => {
  return (
    <Handler>
      <Typography variant='h6' align="center">Sorry, this page was not found</Typography>
      <SentimentDissatisfiedIcon sx={{ fontSize: "3rem" }} />
    </Handler>
  );
};

export default NotFound;
