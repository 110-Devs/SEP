import React, { useState } from 'react';
import { InterfaceContainer } from '../styles/AiInterface.styles';
import ChatInputField from './ChatInputField';
import ChatToggleButton from './ChatToggleButton';
import useScript from '../hooks/useScript';

/**
 * Renders the AI interface component.
 * @returns The AI interface component.
 */
const AiInterface: React.FC = () => {
  const [chatInputBoxIsShown, setChatInputBoxVisibility] = useState(false);
  // scripts for filtering
  useScript('../truncate/domJSON.js');
  // useScript('../truncate/filter.ts');
  
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
