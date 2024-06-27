import React from 'react';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as ExitIcon } from '../assets/exit.svg';

interface MyButtonComponentProps {
    handleClose: () => void; // Typdefinition für handleClose
  }
  
function MyButtonComponent({ handleClose }:MyButtonComponentProps) {
    return (
      
         // Ändern Sie den padding und minWidth
      
        <IconButton
          onClick={handleClose} // Fügen Sie das onClick-Ereignis hinzu
          sx={{ position: 'absolute', top: -1, right: 5, minWidth: 'auto' }} // Fügen Sie das margin-right hinzu
        >
          <ExitIcon width="35px" height="35px" />
        </IconButton>
      
    );
  }
  
  export default MyButtonComponent;
