import { styled } from '@mui/material/styles';

export const MessageContainer = styled('div')<{ sender: 'user' | 'ai' }>(({ sender }) => ({
  display: 'flex',
  justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
  margin: '10px 0',
}));

export const MessageText = styled('div')({
  maxWidth: '60%',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: 'lightgrey',
  color: 'black',
  wordWrap: 'break-word',
});
