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

  // const theme = React.useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode],
  // );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4a5759',
            light: '#B0C4B1',
          },
          secondary: {
            light: '#F7E1D7',
            main: '#EDAFB8',
            contrastText: 'black',
          },
          contrastThreshold: 3,
          tonalOffset: 0.2,
        },
      }),
    [mode],
  );

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ff4400',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

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
