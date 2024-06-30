import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import environment from '@ai/src/lib/environments/environment';
import { modifiedRequest } from '@ai/src/lib/environments/modelConfig';
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
  HeaderTitle,
} from '../styles/ChatWindow.styles'; // Import styled components
import { domJSON } from '@ai/src/lib/truncate/domJSON';
import {
  updateClassNames,
  ClassNameGenerator,
} from '@ai/src/lib/truncate/stripJSON';
import { adjustTask } from '@ai/src/lib/evaluate/adjustTask';
import ChatIcon from '@mui/icons-material/Chat';
import TypingIndicator from './TypingIndicator';
import MyButtonComponent from './ExitButton'; // Import MyButtonComponent

// Define the props for the ChatWindow component
interface ChatWindowProps {
  handleClose: () => void; // Function to close the chat window
}

const ChatWindow: React.FC<ChatWindowProps> = ({ handleClose }) => {
  // Initialize messages state from local storage or set to empty array
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputField = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const hasTypedInitialMessage = useRef(false); // Add ref to track initial message
  const lastMessageWasGreeting = useRef(false);
  const messageHistoryIndex = useRef<number>(-1);

  // Types of responses the chat can handle
  type ResponseType = 'greeting' | 'processing' | 'completed';

  // Response pools categorized by type
  const responses = {
    greeting: [
      "Hello! How can I assist you today?",
      "Hi there! What can I do for you today?",
      "Greetings! How may I help you?",
      "Good day! Looking for assistance?",
      "Welcome! How can I make your day easier?"
    ],
    processing: [
      "Alright, give me a few seconds to process your given task.",
      "Processing your request, please hold on...",
      "Just a moment while I handle that for you.",
      "I'm on it; one moment please...",
      "Let me take care of that right away."
    ],
    completed: [
      "Your order has been processed. If something is not to your satisfaction, please do not hesitate to ask me again for advice.",
      "I've finished processing your request. Let me know if there's anything else you need!",
      "All done! If you need further adjustments, just tell me.",
      "That’s sorted now! Anything else you'd like to adjust?",
      "Your task is completed. Feel free to ask if you need more changes!",
      "I've completed your task. If you need more help, just let me know."

    ]
  };
  
   // Retrieve a random response based on the type
  function getRandomResponse(type: ResponseType): string {
    const possibleResponses = responses[type];
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  }

   // List of prompts as an assumption of what the user might ask
  const promptExamples = [
    "Change the Color of the Add Car to Fleet Button to red",
    "Change the Font-styles to Helvetica for the entire page",
    "Move the Add Car to Fleet Button to the right side of the page",
    "Change the background color of the page to blue",
    "Reorder the elements in the page to have the Add Car to Fleet Button at the bottom of the page"
  ];

  // Get a random prompt from available examples
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * promptExamples.length);
    return promptExamples[randomIndex];
  };

  useEffect(() => {
    setPlaceholder(getRandomPrompt());

    // Load stored messages from localStorage
    const storedMessages: { content: string; isUser: boolean }[] = JSON.parse(localStorage.getItem('chatMessages') || '[]');

    // Check if the last stored message was from the AI and was a greeting
    if (storedMessages.length > 0 && !storedMessages[storedMessages.length - 1].isUser) {
      const lastAIMessage = storedMessages[storedMessages.length - 1].content;
      if (responses.greeting.includes(lastAIMessage)) {
        lastMessageWasGreeting.current = true;
      } else {
        lastMessageWasGreeting.current = false;
      }
    }

    // Simulate greeting message if no stored messages or last message was not a greeting
    if (!hasTypedInitialMessage.current && !lastMessageWasGreeting.current) {
      hasTypedInitialMessage.current = true;
      simulateTyping(getRandomResponse('greeting'));
    }
  }, []);

  // Update local storage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Effect to scroll to the last message whenever message list updates
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  // Focus on the input field when the chat window is opened
  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === '') {
      messageHistoryIndex.current = -1; // Reset the message history index when input is cleared to reset cycling
    }
  };

  // Handle key down events for sending messages with Enter key and cycling through previous messages with Up arrow key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey && inputValue.trim() !== '') {
      event.preventDefault();
      handleSendMessage();
    } else if (event.key === 'ArrowUp') {
      handleCycleMessages('up');
    } else if (event.key === 'ArrowDown') {
      handleCycleMessages('down');
    }
  };

  // Handle cycling through previous messages with Up and Down arrow keys
  const handleCycleMessages = (direction: 'up' | 'down') => {
    const userMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]')
      .filter((message: { content: string; isUser: boolean }) => message.isUser);

    if (userMessages.length > 0) {
      let newIndex = messageHistoryIndex.current;
      if (direction === 'up') {
        newIndex = newIndex < userMessages.length - 1 ? newIndex + 1 : newIndex;
      } else {
        newIndex = newIndex > 0 ? newIndex - 1 : -1;
      }
      const messageToDisplay = newIndex !== -1 ? userMessages[userMessages.length - 1 - newIndex].content : '';
      setInputValue(messageToDisplay);
      messageHistoryIndex.current = newIndex;
    }
  };

  // Simulate typing animation for AI responses
  const simulateTyping = (message: string): void => {
    setIsTyping(true); 
    setCurrentResponse('');
    let index = 0;
    let displayMessage = '';
  
    // Function to update the displayed message and scroll to the last message in the list
    const updateDisplay = () => {
      setCurrentResponse(displayMessage);
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Recursive function to type out each character one by one
    const typeNextChar = () => {
      // Check if there are more characters to type
      if (index < message.length) {
        // Append the next character to the displayMessage
        displayMessage += message[index];
        // Increment the index to move to the next character 
        index++;
        setTimeout(() => {
          updateDisplay();
          typeNextChar();
        }, 30);
      } else {
        // Typing is complete, set typing state to false
        setIsTyping(false);
        // Add the final message to the messages list
        setMessages(prevMessages => [...prevMessages, { content: message, isUser: false }]);
        // Update the current response to the full message
        setCurrentResponse(displayMessage);
        // Ensure the last message is scrolled into view
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
  
    typeNextChar();
  };
  


  /**
   * Converting the current cody-DOM to JSON and sending the prompt with context via axios
   */

  //#root > div.MuiBox-root.css-1fa9wkz > main
  //.css-5u1jm3
  const sendPrompt = async (): Promise<void> => {
    //Converting Cody-DOM; toJSON(Node, FilterList)
    const mainTag = document.querySelector('.css-5u1jm3');
    const selectorJSON = domJSON.toJSON(mainTag);
    const codyJSON = domJSON.toJSON(mainTag, {
      attributes: ['name', 'class'],
      domProperties: [],
    });

    //Assigning a key to every class and selector in two different associative Arrays
    const classNameGenerator = new ClassNameGenerator();
    const newJSON = updateClassNames(selectorJSON, classNameGenerator);
    const anotherGenerator = new ClassNameGenerator();
    const withoutSelectorJSON = updateClassNames(codyJSON, anotherGenerator); // JSON without data-selector attribute
    //Converting everything to String for the prompt
    const jsonString = JSON.stringify(withoutSelectorJSON.newNode);

    console.log(newJSON)
    console.log(newJSON.selectorMap);

    const API_URL = `${environment.HOST}:${environment.PORT}${environment.ROUTES.SEND_PROMPT}`;
    console.log('Processing prompt:', inputValue);
    const req = modifiedRequest({ prompt: inputValue });

    try {
      const response = await axios.post(API_URL, {
        prompt: `
        JSON representation:
        ${jsonString} \n
        ${req}`,
      });
      console.log(response.data);

      //Automatic execution of the method.
      const newTask: string = adjustTask(newJSON.selectorMap, response.data);
      console.log(newTask);
      eval('(' + newTask + ')()');

    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  };

  // Handle message sending logic
  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { content: inputValue, isUser: true }]);
      const userPrompt = inputValue;
      setInputValue('');

      setTimeout(() => {
        simulateTyping(getRandomResponse('processing'));
        setIsProcessing(true); // Show the typing indicator for processing

        setTimeout(async () => {
          await sendPrompt();
          setIsProcessing(false); // Hide the typing indicator after processing

          simulateTyping(getRandomResponse('completed'));
        }, 4000);
      }, 1000);

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
        <HeaderTitle>Cody 110D</HeaderTitle>
        <MyButtonComponent handleClose={handleClose} /> 
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
        {isProcessing && <TypingIndicator />}
      </MessageList>
      <TextInputContainer>
        <TextField
          ref={inputField}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      <ButtonContainer>
        <Button
          onClick={handleSendMessage}
          sx={{
            color: '#1976d2',
          }}
          >
          <SendIcon />
        </Button>
      </ButtonContainer>
      </TextInputContainer>
    </RootContainer>
  );
};

export default ChatWindow;