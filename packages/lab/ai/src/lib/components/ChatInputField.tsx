/* eslint-disable prefer-const */
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import environment from '../environments/environment';
import { modifiedRequest } from '../environments/modelConfig';
import { InputContainer, InputField } from '../styles/ChatInputField.styles';
import { domJSON } from '../truncate/domJSON';
import { updateClassNames, ClassNameGenerator } from '../truncate/stripJSON';
import { adjustTask } from '../evaluate/adjustTask';

/**
 * Represents a chat input field component.
 */
const ChatInputField = () => {
  const [prompt, setPrompt] = useState('');
  const inputField = useRef<HTMLInputElement>(null);

  /**
   * Clears the input field.
   */
  const clearInput = (): void => {
    if (inputField.current) inputField.current.value = '';
  };

  /**
   * Converting the current cody-DOM to JSON and sending the prompt with context via axios
   */
  const sendPrompt = async (): Promise<void> => {
    //Converting Cody-DOM; toJSON(Node, FilterList)
    const selectorJSON = domJSON.toJSON(document.body);
    const codyJSON = domJSON.toJSON(document.body, {
      attributes: ['name', 'class'],
      domProperties: [],
    });

    //Assigning a key to every class and selector in two different associative Arrays
    const classNameGenerator = new ClassNameGenerator();
    const newJSON = updateClassNames(selectorJSON, classNameGenerator);
    const anotherGenerator = new ClassNameGenerator();
    const withoutSelectorJSON = updateClassNames(codyJSON, anotherGenerator); // JSON without data-selector attribute
    //Converting everything to String for the prompt
    const jsonString = JSON.stringify(withoutSelectorJSON.newNode);

    console.log(newJSON.selectorMap);

    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;
    console.log('Processing prompt:', prompt);
    const req = modifiedRequest({ prompt });
    
    try {
      const response = await axios.post(API_URL, {
        prompt: `
        JSON representation:
        ${jsonString} \n
        ${req}`,
      });
      console.log(response.data);

      //Automatic execution of the method.
      const newTask: string = adjustTask(newJSON.selectorMap, response.data);
      console.log(newTask);
      eval("(" + newTask + ")()");

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
        <SendIcon />
      </Button>
    </InputContainer>
  );
};

export default ChatInputField;
