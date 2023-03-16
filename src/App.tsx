import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import CssBaseline from "@mui/material/CssBaseline";

import Index from "./routes";

import "./App.css";
import { PaletteMode } from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode: PaletteMode) => ({
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
              main: "#EDAFB8",
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
              main: "#94849B",
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
          }),
    },
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
    },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <FormGroup className="switch">
          <Switch
            checked={mode === "light" ? false : true}
            onChange={colorMode.toggleColorMode}
            color={"secondary"}
            aria-label="theme switch"
          />
        </FormGroup>
        <CssBaseline />
        <Index></Index>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
