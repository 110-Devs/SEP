import React, { createContext, useState, ReactNode, useMemo} from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';

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
import tinycolor from 'tinycolor2';

export type FontType = 'Roboto' | 'Montserrat' | 'Source Code Pro' | 'Ubuntu' | 'Dancing Script' | 'Kalam';
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
  | 'white'
  | 'custom'
  | 'darkCustom';

interface ColorModeContextProps {
  mode: ThemeType;
  font: FontType;
  customColor: string;
  toggleColorMode: () => void;
  setTheme: (theme: ThemeType) => void;
  setCustomColor: (color: string) => void;
  resetTheme: () => void;
  setFont: (font: FontType) => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  font: 'Roboto',
  customColor: '#ffffff',
  toggleColorMode: () => {},
  setTheme: () => {},
  setCustomColor: () => {},
  resetTheme: () => {},
  setFont: () => {},
});

const mergeTypographyWithFontFamily = (baseTypography: any, fontFamily: string) => {
  const defaultTypography = {
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  };

  return {
    ...defaultTypography,
    ...baseTypography,
    fontFamily,
    h1: { ...defaultTypography.h1, ...baseTypography?.h1, fontFamily },
    h2: { ...defaultTypography.h2, ...baseTypography?.h2, fontFamily },
    h3: { ...defaultTypography.h3, ...baseTypography?.h3, fontFamily },
    h4: { ...defaultTypography.h4, ...baseTypography?.h4, fontFamily },
    h5: { ...defaultTypography.h5, ...baseTypography?.h5, fontFamily },
    h6: { ...defaultTypography.h6, ...baseTypography?.h6, fontFamily },
    subtitle1: { ...defaultTypography.subtitle1, ...baseTypography?.subtitle1, fontFamily },
    subtitle2: { ...defaultTypography.subtitle2, ...baseTypography?.subtitle2, fontFamily },
    body1: { ...defaultTypography.body1, ...baseTypography?.body1, fontFamily },
    body2: { ...defaultTypography.body2, ...baseTypography?.body2, fontFamily },
    button: { ...defaultTypography.button, ...baseTypography?.button, fontFamily },
    caption: { ...defaultTypography.caption, ...baseTypography?.caption, fontFamily },
    overline: { ...defaultTypography.overline, ...baseTypography?.overline, fontFamily },
  };
};

const ToggleColorMode = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeType>('light');
  const [font, setFont] = useState<FontType>('Roboto');
  const [customColor, setCustomColor] = useState<string>('#ffffff');

  const contextValue = useMemo(() => ({
    mode,
    font,
    customColor,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    setTheme: (theme: ThemeType) => {
      setMode(theme);
    },
    setCustomColor,
    resetTheme: () => {
      setMode('light');
    },
    setFont,
  }), [mode, font, customColor]);

  const selectedTheme = useMemo(() => {
    let themeOptions: ThemeOptions;

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
      case 'custom':
      case 'darkCustom':
        const color = tinycolor(customColor);
        const primaryColor = mode === 'darkCustom' ? color.lighten(20).toHexString() : customColor;
        themeOptions = {
          palette: {
            mode: mode === 'darkCustom' ? 'dark' : 'light',
            primary: {
              main: primaryColor,
            },
            secondary: {
              main: mode === 'darkCustom' ? '#000000' : '#FFFFFF',
            },
          },
        };
        break;
      case 'light':
      default:
        themeOptions = lightTheme;
    }

    const theme = createTheme({
      ...themeOptions,
      typography: mergeTypographyWithFontFamily(themeOptions.typography || {}, font),
    });

    return theme;
  }, [mode, font, customColor]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={selectedTheme}>
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default ToggleColorMode;