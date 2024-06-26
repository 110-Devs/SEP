import { createTheme as createMuiTheme, SxProps, ThemeOptions } from '@mui/material/styles';
import { merge } from 'lodash';
import overwriteTheme from '@frontend/extensions/app/layout/theme';

declare module '@mui/material/styles' {
  interface Theme {
    stateView: {
      styleOverrides: SxProps;
    }
  }

  interface ThemeOptions {
    stateView?: {
      styleOverrides: SxProps;
    }
  }
}

const createCustomTheme = (options: ThemeOptions): ReturnType<typeof createMuiTheme> => {
  const defaultTheme = createMuiTheme(options);

  options = merge(
    {
      stateView: {
        styleOverrides: {
          'form.stateview .Mui-disabled': {
            color: 'inherit',
            WebkitTextFillColor: 'inherit',
          },
          'form.stateview .MuiButton-root.Mui-disabled': {
            display: 'none',
          },
          'form.stateview .MuiSelect-icon.Mui-disabled': {
            display: 'none',
          },
          'form.stateview .MuiInput-underline.Mui-disabled:before': {
            borderBottom: '1px solid #eee',
          },
        },
      },
      typography: {
        h3: {
          fontSize: '2rem',
        },
        h4: {
          fontSize: '1.5rem',
        },
        h5: {
          fontSize: '1.3rem',
        },
      },
      components: {
        MuiFormControl: {
          defaultProps: {
            variant: 'standard',
          },
        },
        MuiTextField: {
          defaultProps: {
            variant: 'standard',
          },
        },
        MuiSelect: {
          defaultProps: {
            variant: 'standard',
          },
        },
        // Fix: No Rows Overlay not visible in empty table
        MuiGrid2: {
          styleOverrides: {
            root: {
              '& .MuiDataGrid-overlayWrapper': {
                minHeight: '250px',
              },
              '& .MuiDataGrid-cell a': {
                color: defaultTheme.palette.primary.main,
                fontWeight: 500,
                textDecoration: 'none',
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
            },
          },
        },
        MuiAvatar: {
          styleOverrides: {
            root: {
              '& .MuiAvatar-img': {
                objectFit: 'contain',
              },
            },
          },
        },
      },
    },
    options
  );

  const codyEngineTheme = createMuiTheme(defaultTheme, options);

  options = merge(options, overwriteTheme(codyEngineTheme));

  return createMuiTheme(options);
};

export const lightTheme = createCustomTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const darkTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export const pinkTheme = createCustomTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFB6C1',
    },
    secondary: {
      main: '#FFB6C1',
    },
  },
});

export const darkPinkTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFB6C1',
    },
    secondary: {
      main: '#FFB6C1',
    },
  },
});

export const greenTheme = createCustomTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E8B57',
    },
    secondary: {
      main: '#2E8B57',
    },
  },
});

export const darkGreenTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90EE90',
    },
    secondary: {
      main: '#90EE90',
    },
  },
});

export const purpleTheme = createCustomTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#702963',
    },
    secondary: {
      main: '#702963',
    },
  },
});

export const darkPurpleTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#CF9FFF',
    },
    secondary: {
      main: '#CF9FFF',
    },
  },
});

export const blackTheme = createCustomTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#36454F',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

export const whiteTheme = createCustomTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FAF9F6',
    },
    secondary: {
      main: '#36454F',
    },
  },
});
