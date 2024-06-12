import React from 'react';
import Grid from '@mui/material/Grid';
import VersionControl from './vcs/VersionControl';
import SpeedDialMenu from './SpeedDialMenu';

function MenuContainer() {
  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="flex-end"
      style={{ height: '100vh' }}
    >
      <Grid item>
        <SpeedDialMenu />
      </Grid>
      <Grid item>
        <VersionControl />
      </Grid>
    </Grid>
  );
}

export default MenuContainer;
