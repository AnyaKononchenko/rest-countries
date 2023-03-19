import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MapDialog = (props: {URL: string, open: boolean, setOpen: any }) => {
  const {URL, open, setOpen} = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollowPin = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {"Leave this page?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          You are about to leave this page and follow the link to Google Maps. Do you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Stay here</Button>
        <Link to={URL} target='_blank'>
          <Button onClick={handleFollowPin} autoFocus>
            Go to Google Maps
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
