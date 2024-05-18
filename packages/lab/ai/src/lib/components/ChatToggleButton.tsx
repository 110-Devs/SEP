import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import { ICON_SIZE, RoundButton } from '../styles/ChatToggleButton.styles';

/**
 * Props for the ChatToggleButton component.
 */
type ChatToggleButtonProps = {
  toggleChatInputBox: () => void;
  chatInputBoxIsShown: boolean;
};

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({
  toggleChatInputBox,
  chatInputBoxIsShown,
}) => {
  return (
    <RoundButton variant="contained" onClick={toggleChatInputBox}>
      {chatInputBoxIsShown ? (
        <CloseOutlinedIcon />
      ) : (
        <img
          src="assets/ai.svg"
          alt="AI icon"
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
        />
      )}
    </RoundButton>
  );
};

export default ChatToggleButton;
