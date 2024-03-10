import "../../styles/Textfield.css";
import React, { useState } from "react";

interface TextfieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
}

const Textfield: React.FC<TextfieldProps> = ({
  placeholder,
  value,
  onChange,
  isPassword = false,
}) => {
  const [showPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="textfield-container">
      <div className="textfield-input-container">
        {isPassword ? (
          <img src="/icon/lock.png" alt="Lock" className="input-icon" />
        ) : (
          <img src="/icon/mail.png" alt="mail" className="input-icon" />
        )}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className="textfield-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {/* {isPassword && (
          <img
            src="/icon/eye.png"
            alt={showPassword ? 'Hide' : 'Show'}
            className="toggle-password-button"
            onClick={togglePasswordVisibility}
          />
        )} */}
      </div>
    </div>
  );
};

export default Textfield;
