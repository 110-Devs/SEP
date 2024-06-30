import React, { useEffect, useState, useContext } from 'react';
import ToggleButton from './ToggleButton';
import Container from '@mui/material/Container';
import { Button, styled, Grow, Divider, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import ExitButton from '../ExitButton';
import { ColorModeContext } from '@frontend/app/providers/ToggleColorMode';

// Styled divs in the style of buttons
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}));
export { Div };

interface DragDropOptionsProps {
  onClose: () => void;
}

/**
 * Component for Drag & Drop Options modal.
 * @param {DragDropOptionsProps} { onClose } - Props containing onClose function to close the modal.
 * @returns {JSX.Element} Drag & Drop Options modal component.
 */
const DragDropOptions: React.FC<DragDropOptionsProps> = ({ onClose }) => {
  // State for slider value
  const [value, setValue] = useState<number>(30);
  // Accessing theme mode from context
  const { mode } = useContext(ColorModeContext);

  /**
   * Event handler for slider value change.
   * @param {Event} event - The event object.
   * @param {number | number[]} newValue - The new value of the slider.
   */
  const changeSize = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    localStorage.setItem('sliderValue', (newValue as number).toString());
    window.dispatchEvent(new Event('storage')); // Trigger storage event to notify other components
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const savedValue = localStorage.getItem('sliderValue');
      setValue(savedValue ? parseInt(savedValue, 10) : 30);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [open, setOpen] = useState(true);

  // const changeSize = (event: Event, newValue: number | number[]) => {
  //   setValue(newValue as number);
  // };
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete
  };

  return (
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
          left: { xs: '5vw', sm: '20vw', md: '60vw', lg: '70vw' }, // Responsive left positioning
          backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5',
        }}
      >
        <ExitButton handleClose={handleClose} />

        {/* Editing Mode title */}
        <Div sx={{ mr: 1, backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>{'Editing Mode'}</Div>
        {/* Placeholder for additional content */}
        <Div sx={{ mt: '9px', mr: 1, backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}></Div>
        
        {/* ToggleButton component */}
        <ToggleButton></ToggleButton>

        {/* Divider between sections */}
        <Divider sx={{ mt: '2px' }} />
        
        {/* Choose Grid Size section */}
        <Div sx={{ mt: '14px', mb: '10px', backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>{'Choose Grid Size'}</Div>

        {/* Grid container for slider */}
        <Grid container spacing={2} alignItems="center">
          {/* Label for 'Big' */}
          <Grid item>
            <Div sx={{ backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>Small</Div>
          </Grid>
          {/* Slider component */}
          <Grid item xs>
            <Slider
              aria-label="GridSize"
              value={value}
              onChange={changeSize}
              min={10}
              max={20}
              sx={{
                color: '#000000',
              }}
            />
          </Grid>
          {/* Label for 'Small' */}
          <Grid item>
            <Div sx={{ backgroundColor: mode === 'dark' ? '#f5f5f5' : '#f5f5f5', color: '#000000' }}>Big</Div>
          </Grid>
        </Grid>

        {/* Confirm button */}
        <Button sx={{ mt: 9, ml: 20, borderRadius: '10px' }} variant="contained" onClick={handleClose}>Confirm</Button>
      </Container>
    </Grow>
  );
};

export default DragDropOptions;
