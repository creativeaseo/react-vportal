import React, {useState} from 'react';

const FormInput = (props) => {
  const {
    label,
    onChange,
    id,
    subname,
    errorMessage,
    ...inputProps
  } = props;

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <dl className="request_form_dl">
        <dt>
          <label htmlFor={subname}>
            {label}
            <span className="essential_check">
              *
            </span>
          </label>
        </dt>
        <dd>
          <input
            className="form_input"
            {...inputProps}
            onChange={onChange}
            id={subname}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <p className="essential_text">
            {errorMessage}
          </p>
        </dd>
      </dl>
    </div>
  );
};

export default FormInput;
