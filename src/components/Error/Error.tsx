import React from "react";
import { Box, Typography } from "@mui/material";

type ErrorType = {
  message: string;
};

const Error = (props: ErrorType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Typography variant='h6'>An error occured -_-</Typography>
      <Typography
        variant='h6'
        color='primary.main'
      >{`<${props.message}>`}</Typography>
    </Box>
  );
};

export default Error;
