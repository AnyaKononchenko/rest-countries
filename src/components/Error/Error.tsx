import React from "react";
import { Typography, useTheme } from "@mui/material";
import { Handler } from "../../styles/styles";
import ErrorIcon from "@mui/icons-material/Error";

const Error = (props: { message: string }) => {
  const theme = useTheme();
  return (
    <Handler>
      <ErrorIcon sx={{ fontSize: "3rem" }} />
      <Typography variant='h6'>An error occured -_-</Typography>
      <Typography
        variant='h6'
        color={theme.palette.mode === 'light' ? 'primary.main' : 'secondary.main'}
      >{`<${props.message}>`}</Typography>
    </Handler>
  );
};

export default Error;
