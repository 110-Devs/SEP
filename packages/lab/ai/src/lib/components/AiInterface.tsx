import React, { useState } from 'react';
import { InterfaceContainer } from '../styles/AiInterface.styles';
import ChatInputField from './ChatInputField';
import ChatToggleButton from './ChatToggleButton';

/**
 * Renders the AI interface component.
 * @returns The AI interface component.
 */
const AiInterface: React.FC = () => {
  const [chatInputBoxIsShown, setChatInputBoxVisibility] = useState(false);

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
