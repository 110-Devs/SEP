import React, { useEffect, useContext } from 'react';
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
import { initializeMenuItems, menuItems } from './save-files';
import { Divider } from '@mui/material';
import ExitButton from '../ExitButton';
import { usePageData } from '@frontend/hooks/use-page-data';
import { useCoordinateStore, useComponentOrder } from '@cody-engine/lab/dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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
  const [open, setOpen] = React.useState(false);
  const [pageData,] = usePageData();
  const pageRoute = Object.keys(pageData)[0];
  const addCoordinates = useCoordinateStore((state) => state.addCoordinates);
  const setOrder = useComponentOrder((state) => state.setOrder);
  const coordinates = useCoordinateStore((state) => state.coordinates);
  const order = useComponentOrder((state) => state.order);

  useEffect(() => {
    const fetchMenuItems = async () => {
      await initializeMenuItems(pageRoute, addCoordinates, setOrder);
    };

    fetchMenuItems();
  }, [pageRoute, coordinates, order]);
  
  const { mode } = useContext(ColorModeContext); // Accessing color mode from context

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
      <ExitButton handleClose={toggleDrawer}/>
      <List sx={{mt: "35px"}}>
        {menuItems.slice().reverse().map((MenuItems, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => MenuItems.function()}>
              <ListItemIcon>
                {MenuItems.icon}
              </ListItemIcon>
              <ListItemText primary={MenuItems.text} sx={listItemTextStyle} />
              <ListItemText secondary={`Modified: ${MenuItems.date.toLocaleString()}`} sx={listItemTextStyle}/>
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
