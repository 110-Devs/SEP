import React, { useState } from 'react';
import '../../styles/ToggleButton.css';
const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

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
