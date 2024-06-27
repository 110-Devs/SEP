import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import Breadcrumbs from "@frontend/app/layout/Breadcrumbs";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ColorModeContext } from "@frontend/app/providers/ToggleColorMode";
import { environment } from "@frontend/environments/environment";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

interface OwnProps {
  sidebarOpen: boolean;
  onOpenSidebar: (openSidebar: boolean) => void;
}

type TopBarProps = OwnProps;

const TopBar = (props: TopBarProps) => {
  const theme = useTheme();
  const { mode, setTheme } = useContext(ColorModeContext);
  const sideBarPersistent = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const handleToggle = () => {
    // Toggle between paired themes
    switch (mode) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
      case 'pink':
        setTheme('darkPink');
        break;
      case 'darkPink':
        setTheme('pink');
        break;
      case 'green':
        setTheme('darkGreen');
        break;
      case 'darkGreen':
        setTheme('green');
        break;
      case 'purple':
        setTheme('darkPurple');
        break;
      case 'darkPurple':
        setTheme('purple');
        break;
      case 'black':
        setTheme('white');
        break;
      case 'white':
        setTheme('black');
        break;
      case 'blueOcean':
        setTheme('darkBlueOcean');
        break;
      case 'darkBlueOcean': 
        setTheme('blueOcean');
        break;
      case 'coralReef':
        setTheme('darkCoralReef');
        break;
      case 'darkCoralReef':
        setTheme('coralReef');
        break;
      default:
        setTheme('light');
    }
  };

  return (
    <AppBar position="fixed" color="default" sx={{
      boxShadow: "none",
      backgroundColor: (theme) => theme.palette.primary.main,
      height: "64px"
    }}>
      <Toolbar>
        <Box component={"div"} sx={{ minWidth: { lg: "300px" } }}>
          <Typography variant={"h3"} sx={{ color: (theme) => theme.palette.primary.contrastText }}>{environment.appName}</Typography>
        </Box>
        <Breadcrumbs />
        <Box component={"div"} sx={{ flexGrow: 1 }} />
        <IconButton aria-label="Toggle light/dark mode" onClick={handleToggle}>
          {(mode === 'light' || mode === 'pink' || mode === 'green' || mode === 'purple' || mode === 'black' || mode === 'blueOcean' || mode === 'coralReef') && <LightModeIcon sx={{ color: 'white' }} />}
          {(mode === 'dark' || mode === 'darkPink' || mode === 'darkGreen' || mode === 'darkPurple' || mode === 'white' || mode === "darkBlueOcean" || mode === "darkCoralReef") && <DarkModeIcon sx={{ color: 'black' }} />}
        </IconButton>
        {!sideBarPersistent && (
          <IconButton onClick={() => props.onOpenSidebar(!props.sidebarOpen)} sx={{ color: mode === 'dark' ? 'black' : 'white' }}>
            {props.sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
