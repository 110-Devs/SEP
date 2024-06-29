import React, { createContext, useState, useEffect, ReactNode, useMemo} from 'react';
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
  blueOceanTheme,
  darkBlueOceanTheme,
  coralReefTheme,
  darkCoralReefTheme,
} from '../../../../lab/fe/src/lib/components/template/CustomThemes';
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
  | 'darkCustom'
  | 'blueOcean'
  | 'darkBlueOcean'
  | 'coralReef'
  | 'darkCoralReef';

  // Define the structure of the ColorModeContext
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

// Create the ColorModeContext with default values
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

// Helper function to merge typography with selected font family
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

// Main component to toggle color modes and fonts
const ToggleColorMode = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage or set to default values
  const [mode, setMode] = useState<ThemeType>(() => {
    // Get theme from local storage or default to 'light'
    return localStorage.getItem('appTheme') as ThemeType || 'light';
  });
  const [font, setFont] = useState<FontType>(() => {
    // Get font from local storage or default to 'Roboto'
    return localStorage.getItem('appFont') as FontType || 'Roboto';
  });
  const [customColor, setCustomColor] = useState<string>(() => {
    // Get custom color from local storage or default to '#ffffff'
    return localStorage.getItem('appCustomColor') || '#ffffff';
  });

  useEffect(() => {
    // Persist theme settings in localStorage
    localStorage.setItem('appTheme', mode);
    localStorage.setItem('appFont', font);
    localStorage.setItem('appCustomColor', customColor);
  }, [mode, font, customColor]); // Update localStorage when these values change

  const contextValue = useMemo(() => ({
    mode,
    font,
    customColor,
    toggleColorMode: () => {
      // Toggle between light and dark mode
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    setTheme: (theme: ThemeType) => {
      setMode(theme); // Set the selected theme
    },
    setCustomColor,
    resetTheme: () => {
      setMode('light'); // Reset to light theme
    },
    setFont,
  }), [mode, font, customColor]);

  const selectedTheme = useMemo(() => {
    let themeOptions: ThemeOptions;

    // Choose the theme options based on the current mode
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
      case 'blueOcean':
        themeOptions = blueOceanTheme;
        break;
      case 'darkBlueOcean':
        themeOptions = darkBlueOceanTheme;
        break;
      case 'coralReef':
        themeOptions = coralReefTheme;
        break;
      case 'darkCoralReef':
        themeOptions = darkCoralReefTheme;
        break;
      case 'light':
      default:
        themeOptions = lightTheme;
    }
    // Create the theme with merged typography and selected font
    const theme = createTheme({
      ...themeOptions,
      typography: mergeTypographyWithFontFamily(themeOptions.typography || {}, font),
    });

    return theme;
  }, [mode, font, customColor]);

  return (
    // Provide the color mode context to child components
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={selectedTheme}>
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default ToggleColorMode;