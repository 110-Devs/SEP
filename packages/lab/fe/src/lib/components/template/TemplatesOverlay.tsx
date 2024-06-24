import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import { Button, FormControl, Grid, Grow, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CardTemplate from './CardTemplate';
import ExitButton from '../ExitButton';
import { ColorModeContext, FontType } from '@frontend/app/providers/ToggleColorMode';


interface TemplateProps {
  onClose: () => void;
}

const Templates: React.FC<TemplateProps> = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const { setTheme, resetTheme, setFont, font, mode } = useContext(ColorModeContext);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete
  };

  const handleApplyTheme = (theme: 'light' | 'dark' | 'pink' | 'green' | 'purple' | 'black' | 'white') => {
    setTheme(theme); // Change the theme
  };

  const handleFontChange = (event: SelectChangeEvent<FontType>) => {
    setFont(event.target.value as FontType);
    console.log(`Font changed to: ${event.target.value}`);
  };

  const handleResetTheme = () => {
    resetTheme(); // Reset to light theme
  };

  const handleResetFont = () => {
    setFont('Roboto'); // Reset font to Roboto
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grow in={open} timeout={500}>
        <Container
          sx={{
            position: 'fixed',
            bottom: '5vh',
            left: '22vw',
            right: '17vw',
            boxShadow: 5,
            width: '70vw',
            height: '85vh',
            backgroundColor: mode === 'dark' ? '#90caf9' : '#cfe8fc',
            padding: '50px',
            pl: '100px',
            pr: '100px',
            borderRadius: '5px',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '0px',
            },
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            zIndex: 1000,
          }}
        >
          <ExitButton handleClose={handleClose} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Font Style</InputLabel>
            <Select value={font} onChange={handleFontChange} label="Font Style">
              <MenuItem value="Roboto">Roboto</MenuItem>
              <MenuItem value="Montserrat">Montserrat</MenuItem>
              <MenuItem value="Dancing Script">Dancing Script</MenuItem>
              <MenuItem value="Kalam">Kalam</MenuItem>
              <MenuItem value="Source Code Pro">Source Code Pro</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="110Devs Style"
                image='../../assets/Test.jpg'
                action={handleApplyTheme}
                theme="pink"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Green Style"
                image="test.jpg"
                action={handleApplyTheme}
                theme="green"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Purple Style"
                image="test.jpg"
                action={handleApplyTheme}
                theme="purple"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Black & White"
                image="test.jpg"
                action={handleApplyTheme}
                theme="black"
              />
            </Grid>
            {/* Add more CardTemplate components as needed */}
          </Grid>
          <Button
            onClick={handleResetTheme}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'rgba(0, 170, 200)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(113, 249, 115, 1)',
                color: 'black',
              },
            }}
          >
            Reset to Standard Theme
          </Button>
          <Button
            onClick={handleResetFont}
            variant="contained"
            sx={{
              mt: 2,
              ml: 2,
              backgroundColor: 'rgba(0, 170, 200)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(113, 249, 115, 1)',
                color: 'black',
              },
            }}
          >
            Reset to Standard Font
          </Button>
        </Container>
      </Grow>
    </React.Fragment>
  );
};

export default Templates;
