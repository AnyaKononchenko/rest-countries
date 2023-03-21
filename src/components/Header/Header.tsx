import React from "react";
import Navbar from "./Navbar";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import IconMenu from "./IconMenu";
import {MenuButton} from '../../styles/styles';
import { useNavigate } from "react-router-dom";

const Header = (props: { colorMode: any }) => {
  const { colorMode } = props;
  const navigate = useNavigate();

  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = () => {
    setMode(mode === "light" ? "dark" : "light");
    colorMode.toggleColorMode();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar
        position='static'
        sx={{
          minHeight: "6vh",
        }}
      >
        <Toolbar>
          <MenuButton
            aria-label='menu'
            aria-controls={open ? "icon-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuOpenRoundedIcon sx={{ fontSize: "1.8rem" }} />
          </MenuButton>

          <IconMenu
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          ></IconMenu>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            COUNTRIES
          </Typography>

          <Navbar />

          <FormGroup className='switch'>
            <Switch
              checked={mode === "light" ? false : true}
              onChange={handleChange}
              color={"secondary"}
              aria-label='theme switch'
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
