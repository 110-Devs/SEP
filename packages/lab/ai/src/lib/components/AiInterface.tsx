import React, { useState } from 'react';
import { InterfaceContainer } from '../styles/AiInterface.styles';
import ChatToggleButton from './ChatToggleButton';
import ChatWindow from './ChatWindow';

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
      {chatInputBoxIsShown && <ChatWindow />}
    </InterfaceContainer>
  );
};

export default AiInterface;
