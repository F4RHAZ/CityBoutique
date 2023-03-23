import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { label, pattern, id,  errorMessage: customErrorMessage, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  
  const handleBlur = (e) => {
    const inputValue = e.target.value;
    const error = validateInput(inputValue, pattern, customErrorMessage);
    setErrorMessage(error);
    setFocused(false);
  };

  const validateInput = (inputValue, pattern, customErrorMessage) => {
    if (!inputValue.match(pattern)) {
      return customErrorMessage;
    }
    return "";
  };


  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>
      <input className="Input"
        id={id}
        {...inputProps}
        onBlur={handleBlur}
        onFocus={handleFocus}
        focused={focused.toString()}
      />
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
