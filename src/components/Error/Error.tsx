import React from "react";
import { Box, Typography } from "@mui/material";

const Error = (props: {message: string}) => {
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
