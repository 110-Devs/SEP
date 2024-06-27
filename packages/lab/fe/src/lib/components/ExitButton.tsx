import React from 'react';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as ExitIcon } from '../assets/exit.svg';

interface MyButtonComponentProps {
  handleClose: () => void; // Type definition for handleClose function prop
}

const MyButtonComponent: React.FC<MyButtonComponentProps> = ({ handleClose }) => {
  return (
    // IconButton component with onClick event handler and custom styles
    <IconButton
      onClick={handleClose} // Add onClick event handler to close the component
      sx={{ 
        position: 'absolute', // Absolute positioning
        top: 5, // Distance from top
        right: 5, // Distance from right
        padding: '5px', // Padding around the icon
        minWidth: 'auto', // Minimum width for the button
        zIndex: 200000, // Z-index to control stacking order
      }}
    >
      <ExitIcon width="35px" height="35px" /> {/* ExitIcon component with specified width and height */}
    </IconButton>
  );
};

export default MyButtonComponent;
