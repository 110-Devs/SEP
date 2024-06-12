/* eslint-disable prefer-const */
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import environment from '../environments/environment';
import { request } from '../environments/modelConfig';
import { InputContainer, InputField } from '../styles/ChatInputField.styles';
import { domJSON } from '../truncate/filter';
import { updateClassNames, ClassNameGenerator } from '../truncate/createMaps';

//TODO: Konvertierung aus ChatInputField zu CHatWindow übertragen 

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
    //Umwandlung der Cody-DOM; toJSON(Node, FilterList)
    console.log('Converting DOM to JSON...');

    let codyJSON = domJSON.toJSON(document.querySelector('main'), {
      attributes: {
        values: ['name', 'class', 'id', 'data-selector'],
      },
      domProperties: {
        values: [],
      },
    });
    console.log('Converting successful!');

    //Assigning a key to every class and selector in two different Maps
    const classNameGenerator = new ClassNameGenerator();
    const newNode: any = updateClassNames(codyJSON, classNameGenerator);
    const classArr = newNode.classMap;
    const selectorArr = newNode.selectorMap;

    //Testing
    console.log(codyJSON);
    console.log(classArr);
    console.log(selectorArr);

    //Converting everything to String for the prompt
    const jsonString = JSON.stringify(codyJSON);
    let classString = '';
    let selectorString = '';

    //WIP Berke
    for (const i in classArr) {
      classString = i + '=>' + classArr[i] + '\n';
    }

    for (const j in selectorArr) {
      selectorString = j + '=>' + selectorArr[j] + '\n';
    }

    //Testing
    //console.log(classString);
    //console.log(selectorString);
        
    console.log('Processing prompt:', prompt);

    //HIER WICHTIGE STRING KONKATENIERUNG
    const req = request({ prompt });
    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;

    try {
      const response = await axios.post(API_URL, {
        prompt: `
        ${jsonString}
      ${req}`,
      });
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
        <SendIcon />
      </Button>
    </InputContainer>
  );
};

export default ChatInputField;
