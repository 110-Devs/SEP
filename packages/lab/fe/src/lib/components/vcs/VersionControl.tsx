import * as React from 'react';
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
import { menuItems } from './save-files';
import { Divider } from '@mui/material';
import ExitButton from '../ExitButton';

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
        {menuItems.slice().reverse().map((MenuItems) => (
          <ListItem key={MenuItems.text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(MenuItems.text)}>
              <ListItemIcon>
                <PreviewIcon sx={{ fontSize: 60 }} />
              </ListItemIcon>
              <ListItemText primary={MenuItems.text} sx={listItemTextStyle} />
              <ListItemText secondary={`Save Date: ${MenuItems.date.toLocaleString()}`} sx={listItemTextStyle}/>
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
