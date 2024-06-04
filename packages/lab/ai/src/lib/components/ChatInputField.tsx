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

  /**
   * Converting the current cody-DOM to JSON and sending the prompt with context
   */
  const sendPrompt = async (): Promise<void> => {
    
    //Umwandlung der Cody-DOM; toJSON(Node, FilterList)
    console.log('Converting DOM to JSON...')
    
    let codyJSON = domJSON.toJSON(document.body, {
      attributes: {
        values: ['name', 'class', 'id', 'data-selector'],
      },
      domProperties: {
        values: [],
      },
    });
    console.log('Converting successful!');

    //Assigning a key to every class and selector in two different Maps
    let classMap = new Map<string, string>();
    let selectorMap = new Map<string, string>();
    const classNameGenerator = new ClassNameGenerator();
    updateClassNames(codyJSON, classMap, selectorMap, classNameGenerator);

    //Testing
    console.log(codyJSON);
    //console.log(classMap);
    console.log(selectorMap);

    //Converting everything to String for the prompt
    const jsonString = JSON.stringify(codyJSON);
    let classString = '';
    let selectorString = '';

   /* //WIP Berke
    for (const i in classMap) {
      classString = i + '=>' + classMap[i] + '\n'
    }

    for (const j in selectorMap) {
      selectorString = j + '=>' + selectorMap[j] + '\n'
    }
    */

    console.log('Processing prompt:', prompt);

    let req = jsonString + '\n\n' + request({ prompt });
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
      <Button
        onClick={ sendPrompt }
      >
        <SendIcon />
      </Button>
    </InputContainer>
  );
};

export default ChatInputField;
