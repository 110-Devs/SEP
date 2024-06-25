import React, { createContext, useState, ReactNode, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  lightTheme,
  darkTheme,
  pinkTheme,
  darkPinkTheme,
  greenTheme,
  darkGreenTheme,
  purpleTheme,
  darkPurpleTheme,
  blackTheme,
  whiteTheme,
} from '../../../../lab/fe/src/lib/components/template/CustomThemes'; // Adjust the import path as necessary

export type FontType = 'Roboto' | 'Montserrat' | 'Source Code Pro' | 'Ubuntu' | ' Dancing Script' | 'Kalam';
type ThemeType =
  | 'light'
  | 'dark'
  | 'pink'
  | 'darkPink'
  | 'green'
  | 'darkGreen'
  | 'purple'
  | 'darkPurple'
  | 'black'
  | 'white';

interface ColorModeContextProps {
  mode: ThemeType;
  font: FontType;
  toggleColorMode: () => void;
  setTheme: (theme: ThemeType) => void;
  resetTheme: () => void;
  setFont: (font: FontType) => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  font: 'Roboto',
  toggleColorMode: () => {},
  setTheme: () => {},
  resetTheme: () => {},
  setFont: () => {},
});

const mergeTypographyWithFontFamily = (baseTypography: any, fontFamily: string) => {
  return {
    ...baseTypography,
    fontFamily,
    h1: { ...baseTypography.h1, fontFamily },
    h2: { ...baseTypography.h2, fontFamily },
    h3: { ...baseTypography.h3, fontFamily },
    h4: { ...baseTypography.h4, fontFamily },
    h5: { ...baseTypography.h5, fontFamily },
    h6: { ...baseTypography.h6, fontFamily },
    subtitle1: { ...baseTypography.subtitle1, fontFamily },
    subtitle2: { ...baseTypography.subtitle2, fontFamily },
    body1: { ...baseTypography.body1, fontFamily },
    body2: { ...baseTypography.body2, fontFamily },
    button: { ...baseTypography.button, fontFamily },
    caption: { ...baseTypography.caption, fontFamily },
    overline: { ...baseTypography.overline, fontFamily },
  };
};

const ToggleColorMode = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeType>('light');
  const [font, setFont] = useState<FontType>('Roboto');

  const contextValue = useMemo(() => ({
    mode,
    font,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    setTheme: (theme: ThemeType) => {
      setMode(theme);
    },
    resetTheme: () => {
      setMode('light');
    },
    setFont,
  }), [mode, font]);

  const selectedTheme = useMemo(() => {
    let themeOptions;

    switch (mode) {
      case 'dark':
        themeOptions = darkTheme;
        break;
      case 'pink':
        themeOptions = pinkTheme;
        break;
      case 'darkPink':
        themeOptions = darkPinkTheme;
        break;
      case 'green':
        themeOptions = greenTheme;
        break;
      case 'darkGreen':
        themeOptions = darkGreenTheme;
        break;
      case 'purple':
        themeOptions = purpleTheme;
        break;
      case 'darkPurple':
        themeOptions = darkPurpleTheme;
        break;
      case 'black':
        themeOptions = blackTheme;
        break;
      case 'white':
        themeOptions = whiteTheme;
        break;
      case 'light':
      default:
        themeOptions = lightTheme;
    }

    const theme = createTheme({
      ...themeOptions,
      typography: mergeTypographyWithFontFamily(themeOptions.typography, font),
    });

    console.log(`Applying theme: ${JSON.stringify(theme.typography)}`); // Debugging line
    return theme;
  }, [mode, font]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={selectedTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
