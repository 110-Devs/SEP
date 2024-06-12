import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import Container from '@mui/material/Container';
import { Box, Button, styled, Grow, Divider } from '@mui/material';
import Slider from '@mui/material/Slider';
import ExitButton from '../ExitButton';

//styled Schriften im Stil von den Buttons
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
export { Div };

interface DragDropOptionsProps {
  onClose: () => void;
}


const DragDropOptions: React.FC<DragDropOptionsProps> = ({ onClose }) => {
  //Event handler für Slider
  const [value, setValue] = useState<number>(30);

  const [open, setOpen] = useState(true);

  const changeSize = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 500); // Wait for the animation to complete
  };
  return (
    <Grow in={open} timeout={500} >
    
    <Container
      sx={{
        position: 'fixed',
        bottom: 0, //Container erscheint ganz unten auf der Webseite
        left: { xs: '5vw', sm: '20vw', md: '60vw', lg: '70vw' }, // Responsive left positioning
        width: { xs: '90vw', sm: 400, md: 300 }, // Responsive width
        height: { xs: '80vh', sm: 400 }, // Responsive height
        padding: '20px', // Innenabstand des Modal-Containers
        borderRadius: '8px', // Abrundung der Ecken des Modal-Containers
        boxShadow: 5, //Schatten vom Container
        backgroundColor: '#cfe8fc',
      }}
    >
       
      
       
      
      <ExitButton handleClose={handleClose} />
    
      
    
    
      <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
        <Div sx={{mt:1, mr: 1,  backgroundColor: '#cfe8fc'}}>{'Editing Mode'}</Div>
        <ToggleButton></ToggleButton>
      </Box>
      <Divider/>
      <Div sx={{ backgroundColor: '#cfe8fc'}}>{'Choose Grid Value'}</Div>

      <Slider
        aria-label="GridSize"
        value={value}
        onChange={changeSize}
        min={10}
        max={20}
      />
      <Div sx={{backgroundColor: '#cfe8fc'}}> Selected value: {value}</Div>
      <Button variant="contained" onClick={handleClose}>Confirm</Button>
    </Container>
    </Grow>
  );
};

export default DragDropOptions;
