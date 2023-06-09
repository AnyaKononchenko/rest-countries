import { PaletteMode } from "@mui/material";

const getCustomTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#4a5759",
            light: "#B0C4B1",
          },
          secondary: {
            light: "#F7E1D7",
            main: "#EDAFB8",
            contrastText: "black",
          },
          custom: {
            main: "#F8558F",
          },
          contrastThreshold: 3,
          tonalOffset: 0.2,
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#2E3532",
            light: "#7E9181",
          },
          secondary: {
            light: "#A0AAB2",
            main: "#C7CEDB",
            contrastText: "#2E3532",
          },
          custom: {
            main: "#A5385F",
          },
          contrastThreshold: 3,
          tonalOffset: 0.2,
        }),
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

export default getCustomTheme;