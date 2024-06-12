import { styled } from '@mui/material/styles';

const CONTAINER_HEIGHT = '100px';
const CONTAINER_WIDTH = '50%';
const CONTAINER_BORDER_RADIUS = '50px';
const CONTAINER_SHADOW = '0px 0px 10px rgba(0, 0, 0, 0.5)';
const CONTAINER_TRANSITION = 'height 0.3s ease-in-out';
const INPUT_HEIGHT = '40px';
const INPUT_BORDER_RADIUS = '20px';
const INPUT_PADDING = '0 20px';
const INPUT_MARGIN = '0 0 0 15px';

export const InputContainer = styled('div')({
  position: 'fixed',
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: CONTAINER_WIDTH,
  height: CONTAINER_HEIGHT,
  backgroundColor: 'white',
  borderRadius: CONTAINER_BORDER_RADIUS,
  boxShadow: CONTAINER_SHADOW,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  boxSizing: 'border-box',
  transition: CONTAINER_TRANSITION,
});

export const InputField = styled('input')({
  flex: 1,
  height: INPUT_HEIGHT,
  borderRadius: INPUT_BORDER_RADIUS,
  padding: INPUT_PADDING,
  margin: INPUT_MARGIN,
  border: '1px solid black',
  outline: 'none',
  '&::placeholder': {
    color: '#999',
  },
});
