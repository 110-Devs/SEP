import React, { useState } from 'react';
import '../../styles/ToggleButton.css';

/**
 * ToggleButton component renders a simple toggle switch.
 * @returns {JSX.Element} Toggle switch UI component.
 */
const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  /**
   * Toggles the state of the switch between on and off.
   */
  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={toggle}>
      <div className="toggle-knob" />
    </div>
  );
};

export default ToggleButton;
