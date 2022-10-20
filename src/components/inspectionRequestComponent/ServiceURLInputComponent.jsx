import React, { useState } from 'react'

const ServiceURLInputComponent = (props) => {
  const [focused, setFocused] = useState(false);
  const {
    label,
    errorMessage,
    onChange,
    id,
    ...inputProps
  } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span class="error_message">
        {errorMessage}
      </span>
    </div>
  );
}

export default ServiceURLInputComponent