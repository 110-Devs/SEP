import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BUTTON_SIZE = '60px';
const BUTTON_MARGIN = '0.7em';
const PRIMARY_COLOR = 'black';
const HOVER_COLOR = 'RGB(91, 91, 91)';

export const RoundButton = styled(Button)({
  position: 'absolute', // Add this line for absolute positioning
  bottom: '-5px', // Adjust bottom value as needed
  right: '10px', // Adjust right value as needed
  borderRadius: '50%',
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  boxShadow: 'none',
  backgroundColor: "PRIMARY_COLOR",
  margin: BUTTON_MARGIN,
  '&:hover': {
    backgroundColor: HOVER_COLOR,
    boxShadow: 'none',
  },
});

export const ICON_SIZE = '40px';

