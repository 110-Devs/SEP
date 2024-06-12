import React from 'react';
import { MessageContainer, MessageText } from '../styles/ChatMessage.styles';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
  return (
    <MessageContainer sender={sender}>
      <MessageText>{message}</MessageText>
    </MessageContainer>
  );
};

export default ChatMessage;
