import { styled } from "@mui/material/styles";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";

// header styles
export const Navbar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  marginRight: '1rem',
})

export const Links = styled(Box)({
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'center',
  gap: '1rem',
  marginLeft: '1rem'
})

export const NavbarIcon = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}))

export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  display: 'none',

  [theme.breakpoints.down('md')]: {
    display: 'block',
  }
}))

// table styles
export const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.primary.light
      : theme.palette.primary.main,
  color:
    theme.palette.mode === "light"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  fontWeight: "600",
  fontSize: 16,
}));

export const SortedHeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'stretch',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


// chart styles

export const ChartWrapper = styled(Box)(({ theme }) => ({
  width: '30vw',
  height: '30vw',
  margin: '0 auto',

  [theme.breakpoints.down('lg')]: {
    width: '35vw',
    height: '35vw',
  },
  [theme.breakpoints.down('md')]: {
    width: '50vw',
    height: '50vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80vw',
    height: '80vw',
  },
}))

// home styles

export const HomeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '85vh',
  position: 'relative',
}))

export const HomeContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '65vh',
  marginTop: '1rem',
  gap: '3rem',

  [theme.breakpoints.down('md')]: {
    gap: '2rem',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '1rem',
    flexDirection: 'column',
  },
}))

export const ControlsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}))

// footer styles
export const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  height: '6vh',
  padding: '2rem 0',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  }
}))


//loading, error styles
export const Handler = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "85vh",
}))




