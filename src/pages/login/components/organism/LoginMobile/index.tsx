import "../../../styles/Login.css";

import "../../../styles/Login.css";
import React from "react";
import Button from "../../atoms/Button";
import Button2 from "../../atoms/Button2";
import Textfield from "../../atoms/Textfield";

interface LoginMobileProps {
  email: string;
  password: string;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleCredentials: () => Promise<void>;
  handleMicrosoft: () => void;
}

const LoginMobile: React.FC<LoginMobileProps> = ({
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleCredentials,
    handleMicrosoft,
  }) => {
  return (
    <div className="mobile">
      <div className="mobile-wrapper-dark">
        <div className="mobile-wrapper">
          <div className="stei">
            <img src="/image/stei-kiri.png" alt="" width={46} height={46} />

            <div className="tulisan-stei">
              <p>Sekolah Teknik Elektro dan Informatika </p>
              <p>Institut Teknologi Bandung </p>
            </div>
          </div>
          <div className="title">
            <h1>GraduIT</h1>
            <h2>Thesis & TA Monitoring</h2>
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
    </div>
  );
}


export default LoginMobile;