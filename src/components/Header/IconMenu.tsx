import React from "react";

import {
  Paper,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import CottageIcon from "@mui/icons-material/Cottage";
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

export default function IconMenu(props: {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: any;
}) {
  const { open, anchorEl, handleClose } = props;
  const navigate = useNavigate();

  const onMenuClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <Paper sx={{ width: "30vw", maxWidth: "100%", position: "absolute" }}>
      <Menu
        id='icon-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => onMenuClick('/')}
        >
          <ListItemIcon>
            <CottageIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onMenuClick("/countries")}>
          <ListItemIcon>
            <PublicIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Countries</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onMenuClick("/saved")}>
          <ListItemIcon>
            <FavoriteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Saved</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
}
