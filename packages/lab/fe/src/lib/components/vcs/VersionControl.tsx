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
import { Grid, IconButton, Typography } from '@mui/material';
import ExitButton from '../ExitButton';
import { usePageData } from '@frontend/hooks/use-page-data';
import { useCoordinateStore, useComponentOrder, useRouteStore } from '@cody-engine/lab/dnd';
import { ColorModeContext } from '@frontend/app/providers/ToggleColorMode';
import axios from 'axios';

// Styles for list item text

const listItemTextStyle = {
  fontSize: '16px',
  color: '#000000',
  overflowWrap: 'break-word',
};

const listItemDateStyle = {
  fontSize: '14px',
  color: '#000000',
  textAlign: 'right',
  marginTop: '8px',
};

export default function VersionControl() {
  const [open, setOpen] = React.useState(false);
  const route = useRouteStore((state) => state.currentRoute);
  const addCoordinates = useCoordinateStore((state) => state.addCoordinates);
  const setOrder = useComponentOrder((state) => state.setOrder);
  const coordinates = useCoordinateStore((state) => state.coordinates);
  const order = useComponentOrder((state) => state.order);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (route === null) {
        return
      }
      await initializeMenuItems(route, addCoordinates, setOrder);
    };

    fetchMenuItems();
  }, [route, coordinates, order, menuItems]);
  
  const { mode } = useContext(ColorModeContext); // Accessing color mode from context

  // Toggle drawer state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Render the list of saved items in the drawer
  const list = () => (
    <Box
      sx={{
        width: 460,
        backgroundColor: mode === 'dark' ? '#90caf9' : '#f5f5f5',
        overflowX: 'hidden',
        overflowY: 'auto', // Enable vertical scrolling
        height: '100vh', // Adjust height as needed
      }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <ExitButton handleClose={toggleDrawer} />
      <List sx={{ mt: '35px' }}>
        {menuItems.slice().reverse().map((MenuItems, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => MenuItems.function()}>
              <ListItemIcon>
                {MenuItems.icon}
              </ListItemIcon>
              <Grid container direction="column" sx={{ flexGrow: 1 }}>
                <Grid item xs>
                  <Typography sx={listItemTextStyle}>{MenuItems.text}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography sx={listItemDateStyle}>{`Modified: ${MenuItems.date.toLocaleString()}`}</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: 'absolute', // Changed from 'relative' to 'fixed'
          bottom: 0,
          width: '100%',
          padding: '10px',
          display: 'flex',
          backgroundColor: '#f5f5f5',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            axios.post('http://localhost:3000/api/reset-modification', {
              collection: route,
            })
            window.location.reload();
          }}
        >
          Reset Version Control
        </Button>
      </Box>
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
