import { styled } from '@mui/material/styles';

export const InterfaceContainer = styled('div')({
  position: 'sticky',
  bottom: '0',
  right: '0',
});

export const ButtonBar = styled('div')({
  position: 'absolute',
  bottom: '70px', // Adjust as needed
  right: '10px', // Adjust as needed
  borderRadius: '20px',
  border: '1px ridge',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  padding: '1px',
  transition: 'right 0.3s ease-in-out', // Add transition for right property
});

export const BarButton = styled('button')({
  borderRadius: '15px',
  padding: '10px',
  margin: '5px',
  backgroundColor: '#1976d2',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
});
