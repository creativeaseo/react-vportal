import React, { useState } from 'react';
import './App.css';

const Light = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  }
  return (
    <div className="formInput">
      <labe>{label}</labe>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused = {focused.toString()} />
      <span class="error_message">{errorMessage}</span>
    </div>
  )
};

export default Light;
