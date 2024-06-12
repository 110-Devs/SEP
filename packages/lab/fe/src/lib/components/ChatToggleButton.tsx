import React from 'react';
import { ICON_SIZE, RoundButton } from '../styles/ChatToggleButton.styles';

/**
 * Props for the ChatToggleButton component.
 */
type ChatToggleButtonProps = {
  toggleButtonBar: () => void;
};

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  toggleButtonBar,
}) => {
  return (
    <RoundButton variant="contained" onClick={toggleButtonBar}>
      <img
        src="assets/ai.svg"
        alt="AI icon"
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      />
    </RoundButton>
  );
};

export default ChatToggleButton;
