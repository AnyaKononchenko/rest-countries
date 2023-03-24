import React from "react";
import { Typography } from "@mui/material";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Handler } from "../../styles/styles";

const Loading = () => {
  return (
    <Handler>
      <AiOutlineLoading3Quarters className='loading-icon' />
      <Typography variant='h6'>Loading..</Typography>
    </Handler>
  );
};

export default Loading;
