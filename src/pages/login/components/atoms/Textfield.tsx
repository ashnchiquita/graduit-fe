import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

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
        {isPassword && (
          <>
            {showPassword ? (
              <button onClick={() => setShowPassword(!showPassword)}>
                <Eye size={12} />
              </button>
            ) : (
              <button onClick={() => setShowPassword(!showPassword)}>
                <EyeOff size={12} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Textfield;
