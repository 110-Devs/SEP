import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import { request } from '../environments/modelConfig';
import environment from '../environments/environment';
import {
  RootContainer,
  MessageList,
  TextInputContainer,
  TextField,
  ButtonContainer,
  UserMessage,
  AIMessage,
  HeaderContainer,
  HeaderIcon,
  HeaderTitle
} from '../styles/ChatWindow.styles'; // Import styled components
import { domJSON } from '../truncate/domJSON';
import { updateClassNames, ClassNameGenerator } from '../truncate/stripJSON';
import ChatIcon from '@mui/icons-material/Chat';
import TypingIndicator from './TypingIndicator';

const ChatWindow = () => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const inputField = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const hasTypedInitialMessage = useRef(false); // Add ref to track initial message

  const promptExamples = [
    "Change the Color of the Add Car to Fleet Button to red",
    "Change the Font-styles to Helvetica for the entire page",
    "Move the Add Car to Fleet Button to the right side of the page",
    "Change the background color of the page to blue",
    "Reorder the elements in the page to have the Add Car to Fleet Button at the bottom of the page"
  ];

  // Function to get a random example prompt
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * promptExamples.length);
    return promptExamples[randomIndex];
  };

  useEffect(() => {
    setPlaceholder(getRandomPrompt());
    if (!hasTypedInitialMessage.current) {
      // Check if the initial message has already been typed
      hasTypedInitialMessage.current = true; // Mark that we've typed the initial message
      simulateTyping("Hello! How can I assist you today?");
    }
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const simulateTyping = (message: string) => {
    setIsTyping(true);
    setCurrentResponse('');
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setCurrentResponse(prev => prev + message[index]);
        index++;
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, { content: message, isUser: false }]);
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 30);
  };

  const sendPrompt = async (userPrompt: string): Promise<void> => {
    // Converting Cody-DOM; toJSON(Node, FilterList)
    const codyJSON = domJSON.toJSON(document.body);
    console.log('Converting successful!');

    // Assigning a key to every class and selector in two different Maps
    let classMap = new Map<string, string>();
    let selectorMap = new Map<string, string>();
    const classNameGenerator = new ClassNameGenerator();
    updateClassNames(codyJSON, classMap, selectorMap, classNameGenerator);

    // Converting everything to String for the prompt
    const jsonString = JSON.stringify(codyJSON);
    const classString: string = JSON.stringify(classMap);
    const selectorString: string = JSON.stringify(selectorMap);
    console.log(jsonString);
    console.log(classString);
    console.log(selectorString);

    // User-Prompt
    console.log('Processing prompt:', userPrompt);

    const req = request({ prompt: userPrompt });
    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;

    try {
      const response = await axios.post(API_URL, {
        prompt: `
        ${jsonString}
        ${req}`,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { content: inputValue, isUser: true }]);
      const userPrompt = inputValue;
      setInputValue('');

      setTimeout(() => {
        simulateTyping("Alright, give me a few seconds to process your given task");
        setTimeout(() => {
          simulateTyping("Your order has been processed. If something is not to your satisfaction, please do not hesitate to ask me again for advice");
        }, 4000);
      }, 1000);

      await sendPrompt(userPrompt);

      inputField.current?.focus();
      setPlaceholder(getRandomPrompt());
    }
  };

  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderIcon>
          <ChatIcon />
        </HeaderIcon>
        <HeaderTitle>Goat AI</HeaderTitle>
      </HeaderContainer>
      <MessageList>
        {messages.map((message, index) => (
          <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
            {message.isUser ? (
              <UserMessage>{message.content}</UserMessage>
            ) : (
              <AIMessage>{message.content}</AIMessage>
            )}
          </div>
        ))}
        {isTyping && <AIMessage>{currentResponse}</AIMessage>}
      </MessageList>
      <TextInputContainer>
        <TextField
          ref={inputField}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <ButtonContainer>
          <Button onClick={handleSendMessage}>
            <SendIcon />
          </Button>
        </ButtonContainer>
      </TextInputContainer>
    </RootContainer>
  );
};

export default ChatWindow;
