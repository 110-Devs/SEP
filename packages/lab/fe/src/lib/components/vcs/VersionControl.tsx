import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HistoryIcon from '@mui/icons-material/History';
import PreviewIcon from '@mui/icons-material/Preview';
import ListItemText from '@mui/material/ListItemText';
import { menuItems } from './save-files'; // Assuming menuItems is an array of saved files data
import ExitButton from '../ExitButton';
import { ColorModeContext } from '@frontend/app/providers/ToggleColorMode';
import { Div } from '../drag-drop/DragDropOptions';

// Styles for list item text
const listItemTextStyle = {
  fontWeight: 'bold',
  fontSize: '25px',
  color: '#000000',
};

// Function to handle list item click
const handleListItemClick = (text: string) => {
  console.log(`Clicked on: ${text}`);
};

export default function VersionControl() {
  const { mode } = useContext(ColorModeContext); // Accessing color mode from context
  const [open, setOpen] = React.useState(false); // State to manage drawer open/close

  // Toggle drawer state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Render the list of saved items in the drawer
  const list = () => (
    <Box
      sx={{ width: 460, backgroundColor: mode === 'dark' ? '#90caf9' : '#f5f5f5' }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <ExitButton handleClose={toggleDrawer} /> {/* Exit button to close the drawer */}
      <List sx={{ mt: "35px" }}>
        {menuItems.slice().reverse().map((menuItem) => ( // Reversing the order of items
          <ListItem key={menuItem.text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(menuItem.text)}>
              <ListItemIcon>
                <PreviewIcon sx={{ fontSize: 60, color: '#000000' }} /> {/* Icon for preview */}
              </ListItemIcon>
              <Div><ListItemText primary={menuItem.text} sx={listItemTextStyle} /></Div> {/* Primary text */}
              <Div><ListItemText secondary={`Save Date: ${menuItem.date.toLocaleString()}`} /></Div> {/* Secondary text */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 100,
        }}
        onClick={toggleDrawer}
      >
        <HistoryIcon
          sx={{
            width: '70px',
            height: '70px',
          }}
        />
      </Button>
      {/* Drawer component */}
      <Drawer
        anchor="right" // Drawer anchored to the right
        open={open} // State to control drawer open/close
        onClose={toggleDrawer} // Function to close drawer
      >
        {list()} {/* Render the list inside the drawer */}
      </Drawer>
    </div>
  );
}
