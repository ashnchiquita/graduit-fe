import { Eye, EyeOff } from "lucide-react";
import "../../styles/Textfield.css"; // Assuming you have custom styles for Textfield
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
      <div className="textfield-input-container relative">
        {isPassword ? (
          <img src="/icon/lock.png" alt="Lock" className="input-icon" />
        ) : (
          <img src="/icon/mail.png" alt="mail" className="input-icon" />
        )}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className="textfield-input pr-12"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {isPassword && (
          <button
            className="absolute inset-y-0 right-3.5 flex items-center justify-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Textfield;
