import "../../../styles/Login.css";
import React from "react";
import Button from "../../atoms/Button";
import Button2 from "../../atoms/Button2";
import Textfield from "../../atoms/Textfield";

interface LoginKananProps {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleCredentials: () => Promise<void>;
  handleMicrosoft: () => void;
}

const LoginKanan: React.FC<LoginKananProps> = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleCredentials,
  handleMicrosoft,
}) => {
  return (
    <div className="kanan">
      <div className="kanan-wrapper">
        <div className="atas">
          <h2> Sign In</h2>
          <p>
            Jika anda belum memiliki account yang terdaftar, <br />
            mohon informasikan kepada pihak administrasi.
          </p>
        </div>
        <div className="bawah">
          <div className="isian">
            <Textfield
              placeholder="alisha@timtesis.itb.ac.id"
              value={email}
              onChange={handleEmailChange}
            />
            <Textfield
              placeholder="******"
              value={password}
              onChange={handlePasswordChange}
              isPassword={true}
            />
          </div>

          <Button text="Sign in" onClick={handleCredentials} />
          <div className="tulisan-or">
            <p className="line"></p>
            <p>or</p>
            <p className="line"></p>
          </div>
          <div className="sso">
            <Button2
              text="Sign in with SSO"
              onClick={handleMicrosoft}
              className="red-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginKanan;
