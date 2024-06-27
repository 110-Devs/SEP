import React, { useState } from 'react';
import '../../styles/ToggleButton.css';

/**
 * ToggleButton component renders a simple toggle switch.
 * @returns {JSX.Element} Toggle switch UI component.
 */
const ToggleButton = () => {
  const [isOn, setIsOn] = useState(() => {
    const savedState = localStorage.getItem('toggleState');
    return savedState === 'true';
  });

  /**
   * Toggles the state of the switch between on and off.
   */
  const toggle = () => {
    setIsOn(prevState => {
      const newState = !prevState;
      localStorage.setItem('toggleState', newState.toString());
      window.dispatchEvent(new Event('storage')); // Trigger storage event to notify other components
      return newState;
    });
  };

  return (
    <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={toggle}>
      <div className="toggle-knob" />
    </div>
  );
};

export default ToggleButton;
