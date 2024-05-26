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
          <div className="rounded-lg bg-white px-6 py-6 flex flex-col gap-7 h-[90vh]">
            <div className="stei">
              <img src="/image/stei-kiri.png" alt="" className="h-[5vh]" />

              <div className="text-black text-[1.8vh]">
                <span>Sekolah Teknik Elektro dan Informatika </span>
                <br />
                <span className="font-bold">Institut Teknologi Bandung </span>
              </div>
            </div>
            <div className="text-black">
              <h1>GraduIT</h1>
              <span>Thesis & TA Monitoring</span>
            </div>

            <div className="text-black font-bold mt-4">
              <span>Sign In</span>
            </div>

            <div className="bawah w-auto">
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
              <div className="flex flex-col gap-3">
                <Button
                  className="mt-6"
                  text="Sign in"
                  onClick={handleCredentials}
                />
                <div className="tulisan-or">
                  <p className="line"></p>
                  <p className="text-black">or</p>
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
      </div>
    </div>
  );
};

export default LoginMobile;
