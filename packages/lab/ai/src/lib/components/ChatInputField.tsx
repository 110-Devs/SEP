/* eslint-disable prefer-const */
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import environment from '../environments/environment';
import { request } from '../environments/modelConfig';
import { InputContainer, InputField } from '../styles/ChatInputField.styles';
import { domJSON } from '../truncate/domJSON';
import { updateClassNames, ClassNameGenerator } from '../truncate/stripJSON';

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
    const codyJSON = domJSON.toJSON(document.body);
    console.log('Converting successful!');

    //Assigning a key to every class and selector in two different Maps //Jetzige Implementierung mit Seiteneffekten; WIP Berke
    let classMap = new Map<string, string>();
    let selectorMap = new Map<string, string>();
    const classNameGenerator = new ClassNameGenerator();
    updateClassNames(codyJSON, classMap, selectorMap, classNameGenerator);

    //Testing
    console.log(codyJSON);
    //console.log(classMap);
    console.log(selectorMap);
    
    //Converting everything to String for the prompt
    const jsonString = JSON.stringify(codyJSON); //WIP

    //User-Prompt
    console.log('Processing prompt:', prompt);

    //HIER WICHTIGE STRING KONKATENIERUNG
    const req = request({ prompt });
    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;

    try {
      const response = await axios.post(API_URL, {
        prompt: `
        JSON representation:
        ${jsonString} \n
        ${req}`,
        //map: `${selectorMap}`,
      });
      console.log(response.data);
      //Beispielhafte Funktion. Man muss den Selektor kopieren.
      //eval("(function doTask() { const addStatusButton = document.querySelector('#root > div > main > div.MuiGrid2-root.MuiGrid2-container.MuiGrid2-direction-xs-row.MuiGrid2-spacing-xs-3.css-1ynoxbp-MuiGrid2-root > div:nth-child(1) > div:nth-child(1) > div.MuiGrid2-root.MuiGrid2-direction-xs-row.MuiGrid2-grid-xs-12.css-1wztgj9-MuiGrid2-root > div > div.MuiCardActions-root.MuiCardActions-spacing.css-i0umbk-MuiCardActions-root > div.Wrapper_Wrapper__xLg29 > div > div > div:nth-child(2) > button'); addStatusButton.style.backgroundColor = 'green'; })()");
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
