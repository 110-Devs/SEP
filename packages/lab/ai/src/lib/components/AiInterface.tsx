import React, { useState } from 'react';
import { InterfaceContainer } from '../styles/AiInterface.styles';
import ChatInputField from './ChatInputField';
import ChatToggleButton from './ChatToggleButton';
import useScript from '../hooks/useScript';
import { domJSON } from '../truncate/filter';

/**
 * Renders the AI interface component.
 * @returns The AI interface component.
 */
const AiInterface: React.FC = () => {
  const [chatInputBoxIsShown, setChatInputBoxVisibility] = useState(false);

  //Was Ruben gemacht hat :))
  useScript('../truncate/bundle.js');
  useScript('../truncate/filter.ts');

  const myDiv = domJSON.toJSON(document.body, {
    attributes: {
      values: ['name', 'class', 'id', 'data-selector'],
    },
    domProperties: {
      values: [],
    },
  });

  console.log(myDiv);

  /**
   * Toggles the visibility of the chat input box.
   */
  const toggleChatInputBox = (): void => {
    setChatInputBoxVisibility(!chatInputBoxIsShown);
  };

  return (
    <InterfaceContainer>
      <ChatToggleButton
        toggleChatInputBox={toggleChatInputBox}
        chatInputBoxIsShown={chatInputBoxIsShown}
      />
      {chatInputBoxIsShown && <ChatInputField />}
    </InterfaceContainer>
  );
};

export default AiInterface;
