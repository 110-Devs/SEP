import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import { Button, FormControl, Grid, Grow, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CardTemplate from './CardTemplate';
import ExitButton from '../ExitButton';
import { ColorModeContext, FontType } from '@frontend/app/providers/ToggleColorMode';
import GreenStyle from '../../assets/Green_Style.svg';
import DevsStyle from '../../assets/Devs_Style.svg';
import PurpleStyle from '../../assets/Purple_Style.svg';
import BlackWhite from '../../assets/Black_White_Style.svg';
import BlueOcean from '../../assets/BlueOcean_Style.svg';
import CoralReef from '../../assets/CoralReef_Style.svg';

// Define the props for the Templates component
interface TemplateProps {
  onClose: () => void;
}

// The main Templates component
const Templates: React.FC<TemplateProps> = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  // Retrieve theme context values
  const { setTheme, resetTheme, setFont, font, mode } = useContext(ColorModeContext);

  // Handle closing the modal with an animation delay
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete
  };

  // Apply a selected theme
  const handleApplyTheme = (theme: 'light' | 'dark' | 'pink' | 'green' | 'purple' | 'black' | 'white' | 'blueOcean' | 'coralReef') => {
    setTheme(theme);
  };

  // Handle changing the font style
  const handleFontChange = (event: SelectChangeEvent<FontType>) => {
    setFont(event.target.value as FontType);
    console.log(`Font changed to: ${event.target.value}`);
  };

  // Reset to the default theme
  const handleResetTheme = () => {
    resetTheme();
  };

  // Reset font to default font
  const handleResetFont = () => {
    setFont('Roboto'); 
  };

  return (
    <React.Fragment>
      {/* CssBaseline to ensure consistent styling across browsers */}
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
          {/* Exit button to close the modal */}
          <ExitButton handleClose={handleClose} />
          {/* Font style selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: 'black' }}>Font Style</InputLabel>
            <Select
              value={font}
              onChange={handleFontChange}
              label="Font Style"
              sx={{
                color: 'black', 
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black', 
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black', 
                }
              }}
              MenuProps={{
                sx: {
                  '& .MuiPaper-root': {
                    backgroundColor: 'white', 
                  '& .MuiMenuItem-root': {
                    color: 'black', 
                  }
                }
              }
            }}
          >
            {/* Different font options */}
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Montserrat">Montserrat</MenuItem>
            <MenuItem value="Dancing Script">Dancing Script</MenuItem>
            <MenuItem value="Kalam">Kalam</MenuItem>
            <MenuItem value="Source Code Pro">Source Code Pro</MenuItem>
          </Select>
        </FormControl>
          {/* Grid to display theme cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="110Devs Style"
                image= {DevsStyle}
                action={handleApplyTheme}
                theme="pink"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Green Style"
                image= {GreenStyle}
                action={handleApplyTheme}
                theme="green"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Purple Style"
                image= {PurpleStyle}
                action={handleApplyTheme}
                theme="purple"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Black & White"
                image= {BlackWhite}
                action={handleApplyTheme}
                theme="black"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Blue Ocean"
                image= {BlueOcean}
                action={handleApplyTheme}
                theme="blueOcean"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CardTemplate
                title="Coral Reef"
                image= {CoralReef}
                action={handleApplyTheme}
                theme="coralReef"
              />
            </Grid>
            {/* Add new Templates here if needed */}
          </Grid>
          {/* Button to reset to the default theme */}
          <Button
            onClick={handleResetTheme}
            variant="contained"
            sx={{
              mt: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
                color: 'black',
              },
            }}
          >
            Reset to Standard Theme
          </Button>
          {/* Button to reset to the default font */}
          <Button
            onClick={handleResetFont}
            variant="contained"
            sx={{
              mt: 2,
              ml: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: 'lightblue',
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
