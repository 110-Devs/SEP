import { styled } from '@mui/material/styles';

const CONTAINER_WIDTH = '50%';
const CONTAINER_BORDER_RADIUS = '25px';
const CONTAINER_SHADOW = '0px 0px 20px rgba(0, 0, 0, 0.5)';
const CONTAINER_TRANSITION = 'height 0.3s ease-in-out';
const INPUT_HEIGHT = '40px';
const INPUT_BORDER_RADIUS = '20px';
const INPUT_PADDING = '0 20px';
const INPUT_MARGIN = '0 0 0 15px';

export const RootContainer = styled('div')({
    position: 'fixed',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: CONTAINER_WIDTH,
    height: 'auto',
    backgroundColor: '#f5f5f5',
    borderRadius: CONTAINER_BORDER_RADIUS,
    boxShadow: CONTAINER_SHADOW,
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    transition: CONTAINER_TRANSITION,
});

export const HeaderContainer = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#E3F2FD',
    borderTopLeftRadius: CONTAINER_BORDER_RADIUS,
    borderTopRightRadius: CONTAINER_BORDER_RADIUS,
    position: 'relative', // Add position relative to position the exit button absolutely
});

export const HeaderIcon = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
});

export const HeaderTitle = styled('div')({
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
});

export const MessageList = styled('div')({
    width: '100%',
    flex: '1', 
    maxHeight: '200px', 
    overflowY: 'auto',
    padding: '20px', 
    boxSizing: 'border-box', 
});

/* export const MessageItem = styled('div')({
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '16px',
    backgroundColor: '#e3f2fd',
}); */

export const UserMessage = styled('div')({
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '16px',
    backgroundColor: '#DCF8C6', 
    alignSelf: 'flex-end', 
    marginRight: '55%', 
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  });
  
export const AIMessage = styled('div')({
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '16px',
    backgroundColor: '#E3F2FD', 
    alignSelf: 'flex-start', 
    marginLeft: '55%',  
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
});
  

export const TextInputContainer = styled('div')({
    width: '100%',
    display: 'flex', 
    alignItems: 'center',
    padding: '10px 0', 
    borderTop: '1px solid #ccc',
});

export const TextField = styled('input')({
    flex: '1',
    height: INPUT_HEIGHT,
    borderRadius: INPUT_BORDER_RADIUS,
    padding: INPUT_PADDING,
    margin: INPUT_MARGIN,
    border: '1px solid black',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '14px',
    '&::placeholder': {
        color: '#999',
        fontStyle: 'italic',
      },
});

export const ButtonContainer = styled('div')({
    marginLeft: '10px', 
});
