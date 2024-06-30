import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import { Button, FormControl, Grow, InputLabel, MenuItem, Select, SelectChangeEvent, IconButton, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MuiColorInput } from 'mui-color-input';
import ExitButton from '../ExitButton';
import { ColorModeContext, FontType } from '@frontend/app/providers/ToggleColorMode';
import { Div } from '../drag-drop/DragDropOptions';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { debounce } from 'lodash';

interface CostumizeOverlayProps {
  onClose: () => void; // Function to close the overlay
}

/**
 * Customize overlay component for modifying colors and fonts.
 * @param onClose Function to close the overlay.
 * @returns React component for customizing appearance.
 */
const CostumizeOverlay: React.FC<CostumizeOverlayProps> = ({ onClose }) => {
  const [open, setOpen] = useState(true); // State to manage the visibility of the customization overlay
  const { setTheme, setFont, setCustomColor, font, mode } = useContext(ColorModeContext); // Accessing theme and customization functions from context

  /**
   * Function to handle font changes.
   * @param event The select change event containing the new font value.
   */
  const handleFontChange = (event: SelectChangeEvent<FontType>) => {
    setFont(event.target.value as FontType); // Update selected font in context state
  };

  /**
   * Function to close the customization overlay.
   */
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete before closing
  };

  const [value, setValue] = useState('#ffffff'); // State for storing the selected color value
  

  // Debounced function for handling color changes
  const debouncedHandleColorChange = debounce((newValue: string) => {
    setValue(newValue);
    setCustomColor(newValue);
    setTheme('darkCustom');
    }, 200); // Adjust debounce delay as needed

  /**
   * Function to handle color changes.
   * @param newValue The new color value in hexadecimal format.
   */
   // Use debounced function in onChange
  const handleColorChange = (newValue: string) => {
  debouncedHandleColorChange(newValue);
  };

  /**
   * Function to toggle between light and dark custom modes.
   */
  const toggleMode = () => {
    if (mode === 'custom') {
      setTheme('darkCustom'); // Switch to dark custom mode if currently in light custom mode
    } else if (mode === 'darkCustom') {
      setTheme('custom'); // Switch to light custom mode if currently in dark custom mode
    } else {
      setTheme('custom'); // Default to light custom mode if in any other mode
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grow in={open} timeout={500}>
        <Container
          sx={{
            position: 'fixed',
            bottom: 0, // Container appears at the bottom of the webpage
            width: { xs: '90vw', sm: 400, md: 300 }, // Responsive width
            height: { xs: '85vw', sm: 450, md: 350 }, // Responsive height
            padding: '20px', // Padding inside the modal container
            borderRadius: '18px', // Rounded corners of the modal container
            boxShadow: 5, // Shadow of the container
            left: { xs: '5vw', sm: '20vw', md: '43vw', lg: '53vw' }, // Responsive left positioning
            backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', // Background color based on theme mode
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          
          <div>
            {/* Section for color customization */}
            <Div sx={{ backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>Color</Div>
            <MuiColorInput
              sx={{
                marginTop: '6px',
                '& input': {
                  color: '#000000', // Text color based on theme mode
                },
                '& .MuiInputBase-root': {
                  backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', // White background for the input field
                },
              }}
              value={value}
              onChange={(e) => handleColorChange(e)}
              format="hex"
            />
            {/* Section for font customization */}
            <Div sx={{ marginTop: '5px', backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>Font</Div>
            <FormControl fullWidth>
              <InputLabel id="font-selector" sx={{ color: '#000000' }}>Font</InputLabel>
              <Select
                labelId="font-selector"
                id="font-select"
                value={font}
                label="Font"
                onChange={handleFontChange}
                sx={{ color: '#000000' }}
              >
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Montserrat">Montserrat</MenuItem>
                <MenuItem value="Dancing Script">Dancing Script</MenuItem>
                <MenuItem value="Kalam">Kalam</MenuItem>
                <MenuItem value="Source Code Pro">Source Code Pro</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          {/* Section for mode toggle */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Div sx={{color:"black"}}>Change Mode [Alpha]</Div>
            <IconButton onClick={toggleMode}>
              {mode === 'darkCustom' ? <LightModeIcon sx={{ color: "Black" }} /> : <DarkModeIcon sx={{ color:"Black" }} />}
            </IconButton>
          </Box>
          
          {/* Section for save and close buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <Button sx={{ borderRadius: '10px', ml: 24 }} variant="contained" onClick={handleClose}>Save</Button>
            <ExitButton handleClose={handleClose} />
          </div>
        </Container>
      </Grow>
    </React.Fragment>
  );
};

export default CostumizeOverlay;
