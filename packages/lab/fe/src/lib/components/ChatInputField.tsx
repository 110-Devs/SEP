import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import environment from '../environments/environment';
import { request } from '../environments/modelConfig';
import { InputContainer, InputField } from '../styles/ChatInputField.styles';
import CheckIcon from '@mui/icons-material/AutorenewOutlined';
/**
 * Represents a chat input field component.
 */
const ChatInputField = () => {
  const [prompt, setPrompt] = useState('');
  const inputField = useRef<HTMLInputElement>(null);
  const [isSent, setIsSent] = useState(false);

  const handleClick = async () => {
    await sendPrompt();
    setIsSent(true);
  };
  /**
   * Clears the input field.
   */
  const clearInput = (): void => {
    if (inputField.current) inputField.current.value = '';
  };

  /**
   * Sends the prompt to the server.
   */
  const sendPrompt = async (): Promise<void> => {
    console.log('Processing prompt:', prompt);
    const req = request({ prompt });
    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;

    try {
      const response = await axios.post(API_URL, req);
      console.log(response.data);
      setPrompt('');
      clearInput();
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  };

  return (
    <InputContainer>
      <InputField
        ref={inputField}
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={sendPrompt}>
        <div>{isSent ? <CheckIcon /> : <SendIcon onClick={handleClick} />}</div>
      </Button>
    </InputContainer>
  );
};

export default ChatInputField;
