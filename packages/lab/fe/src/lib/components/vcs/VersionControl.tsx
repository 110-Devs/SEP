import React, { useEffect } from 'react';
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

const listItemTextStyle = {
  fontWeight: 'bold', // Fett
  fontSize: '25', // Größere Schriftgröße
  // Weitere Stile hier hinzufügen
};

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
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 460, backgroundColor: '#cfe8fc', }}
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
        onClick={toggleDrawer}>
          <HistoryIcon 
          sx={{
            width: '70px', // Beispielbreite
            height: '70px',
            }} />
        </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >
        {list()}
      </Drawer>
    </div>
  );
}
