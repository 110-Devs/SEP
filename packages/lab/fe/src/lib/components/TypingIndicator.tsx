import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const TypingDots = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 24px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #888;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const TypingIndicator = () => (
  <TypingDots>
    <Dot />
    <Dot />
    <Dot />
  </TypingDots>
);

export default TypingIndicator;
