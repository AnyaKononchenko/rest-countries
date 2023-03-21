import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getCustomTheme from './styles/theme';

import Index from "./routes";

import "./App.css";


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

  const theme = React.useMemo(() => createTheme(getCustomTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Index colorMode={colorMode}></Index>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
