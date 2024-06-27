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
  blueOceanTheme,
  darkBlueOceanTheme,
  coralReefTheme,
  darkCoralReefTheme,

} from '../../../../lab/fe/src/lib/components/template/CustomThemes';

// Define the possible font types
export type FontType = 'Roboto' | 'Montserrat' | 'Source Code Pro' | 'Ubuntu' | ' Dancing Script' | 'Kalam';

// Define the possible theme types
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
  | 'blueOcean'
  | 'darkBlueOcean'
  | 'coralReef'
  | 'darkCoralReef';

  // Define the structure of the ColorModeContext
interface ColorModeContextProps {
  mode: ThemeType;
  font: FontType;
  toggleColorMode: () => void;
  setTheme: (theme: ThemeType) => void;
  resetTheme: () => void;
  setFont: (font: FontType) => void;
}

// Create the ColorModeContext with default values
export const ColorModeContext = createContext<ColorModeContextProps>({
  mode: 'light',
  font: 'Roboto',
  toggleColorMode: () => {},
  setTheme: () => {},
  resetTheme: () => {},
  setFont: () => {},
});

// Helper function to merge typography with selected font family
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

// Main component to toggle color modes and fonts
const ToggleColorMode = ({ children }: { children: ReactNode }) => {
  // States to manage the current theme and font
  const [mode, setMode] = useState<ThemeType>('light');
  const [font, setFont] = useState<FontType>('Roboto');

  const contextValue = useMemo(() => ({
    mode,
    font,
    toggleColorMode: () => {
      // Toggle between light and dark mode
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    setTheme: (theme: ThemeType) => {
      setMode(theme); // Set the selected theme
    },
    resetTheme: () => {
      setMode('light'); // Reset to light theme
    },
    setFont,
  }), [mode, font]);

  const selectedTheme = useMemo(() => {
    let themeOptions;

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
      typography: mergeTypographyWithFontFamily(themeOptions.typography, font),
    });

    console.log(`Applying theme: ${JSON.stringify(theme.typography)}`); // Debugging line
    return theme;
  }, [mode, font]);

  return (
    // Provide the color mode context to child components
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={selectedTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
