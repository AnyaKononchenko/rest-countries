import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import CssBaseline from '@mui/material/CssBaseline';

import Index from './routes';

import './App.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <FormGroup className='switch'>
          <Switch
            checked={mode === 'light' ? false : true}
            onChange={colorMode.toggleColorMode}
            color={'secondary'}
            aria-label="theme switch"
          />
        </FormGroup>
        <CssBaseline />
        <Index></Index>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
