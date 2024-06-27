import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Psychology from '@mui/icons-material/Psychology';
import Build from '@mui/icons-material/build';
import Tab from '@mui/icons-material/tab';
import DragDropOptions from './drag-drop/DragDropOptions';
import ChatWindow from './ChatWindow';
import EditIcon from '@mui/icons-material/memory';
import TemplatesOverlay from './template/TemplatesOverlay';
import Brush from '@mui/icons-material/Brush';
import CostumizeOverlay from './costumize/CostumizeOverlay';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default function PlaygroundSpeedDial() {
  // State variables to manage the visibility of different components
  const [chatInputBoxIsShown, setChatInputBoxVisibility] = useState(false);
  const [rangeSliderIsOpen, setRangeSliderVisibility] = useState(false);
  const [templatesIsOpen, setTemplatesVisibility] = useState(false);
  const [costumizeIsOpen, setCostumizeOverlayVisibility] = useState(false);

  // Toggle functions to change the visibility states
  const toggleChatInputBox = (): void => {
    setChatInputBoxVisibility(!chatInputBoxIsShown);
  };

  const toggleTemplatesOverlay = (): void => {
    setTemplatesVisibility(!templatesIsOpen);
  };

  const toggleRangeSliderWindow = (): void => {
    setRangeSliderVisibility(!rangeSliderIsOpen);
  };

  const toggleCostumizeOverlay = (): void => {
    setCostumizeOverlayVisibility(!costumizeIsOpen);
  };

  // Array of actions for the SpeedDial
  const actions = [
    { icon: <Build />, name: 'Drag & Drop', function: toggleRangeSliderWindow },
    { icon: <Brush />, name: 'Costumize', function: toggleCostumizeOverlay },
    { icon: <Tab />, name: 'Templates', function: toggleTemplatesOverlay },
    { icon: <Psychology />, name: 'AI Chat', function: toggleChatInputBox },
  ];

  return (
    <React.Fragment>
      {/* SpeedDial component positioned at bottom right */}
      <Box sx={{ position: 'fixed', bottom: 0, right: 10 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          direction="up"
        >
          {/* Mapping through actions to render SpeedDialAction components */}
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.function}
              sx={{
                whiteSpace: 'nowrap',
              }}
            />
          ))}
        </StyledSpeedDial>
      </Box>
      
      {/* Conditional rendering of components based on state variables */}
      {rangeSliderIsOpen && <DragDropOptions onClose={toggleRangeSliderWindow} />}
      {chatInputBoxIsShown && <ChatWindow handleClose={toggleChatInputBox} />}
      {templatesIsOpen && <TemplatesOverlay onClose={toggleTemplatesOverlay} />}
      {costumizeIsOpen && <CostumizeOverlay onClose={toggleCostumizeOverlay} />}
    </React.Fragment>
  );
}
