import React from "react";
import { Box, Typography } from "@mui/material";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
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
      <AiOutlineLoading3Quarters className='loading-icon' />
      <Typography variant='h6'>Loading..</Typography>
    </Box>
  );
};

export default Loading;
