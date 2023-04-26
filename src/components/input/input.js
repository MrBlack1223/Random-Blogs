import {Link} from 'react-router-dom'
import { useState } from "react";
import './input.css'
function CustomInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props
    

    const handleFocus = (e) => {
      setFocused(true);
    };
    return (
    <div className='customInput'>
        <label>{label}</label>
        <input
            className='registerInput'
            {...props}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            focused={focused.toString()}
        ></input>
        <span>{errorMessage}</span>
    </div>
    );
  }
  
  export default CustomInput;