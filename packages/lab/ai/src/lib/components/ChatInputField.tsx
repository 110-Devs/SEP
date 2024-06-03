/* eslint-disable prefer-const */
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import environment from '../environments/environment';
import { request } from '../environments/modelConfig';
import { InputContainer, InputField } from '../styles/ChatInputField.styles';
import { domJSON } from '../truncate/filter';
import { updateClassNames, ClassNameGenerator } from '../truncate/createMaps';

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

  //WIP
  const modifyPrompt = async (): Promise<void> => {
    console.log('Converting DOM to JSON...');

    useEffect(() => {
      const sendPrefix = async () => {
        //Umwandlung der Cody-DOM; toJSON(Node, FilterList)
        const codyJSON = domJSON.toJSON(document.body, {
          attributes: {
            values: ['name', 'class', 'id', 'data-selector'],
          },
          domProperties: {
            values: [],
          },
        });

        //Assigning a key to every class and selector in two different Maps
        let classMap = new Map<string, string>();
        let selectorMap = new Map<string, string>();
        const classNameGenerator = new ClassNameGenerator();
        updateClassNames(codyJSON, classMap, selectorMap, classNameGenerator);

        //Testing
        console.log(codyJSON);
        //console.log(classMap);
        console.log(selectorMap);

        //Sending the axios request
        const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`; //Zur gleichen Adresse
        try {
          const response = await axios.post(API_URL, { prefix: codyJSON });
          console.log(response.data);
        } catch (error) {
          console.error('Converting to JSON failed:', error);
        }
      };

      // Execute the function
      sendPrefix();
    }, []);
  };

  /**
   * Sending the prompt
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
      <Button onClick={function(event){ modifyPrompt(); sendPrompt()}}>
        <SendIcon />
      </Button>
    </InputContainer>
  );
};

export default ChatInputField;
