import "./styles/Login.css";
import "./styles/globals.css";

import LoginKiri from "./components/organism/LoginKiri";
import LoginKanan from "./components/organism/LoginKanan";
import LoginMobile from "./components/organism/LoginMobile";
import useLogin from "./hooks/useLogin";

export default function Login(): JSX.Element {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleCredentials,
    handleMicrosoft,
  } = useLogin();

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-desktop">
          <LoginKiri />
            <LoginKanan
              email={email}
              password={password}
              handleEmailChange={setEmail}
              handlePasswordChange={setPassword}
              handleCredentials={handleCredentials}
              handleMicrosoft={handleMicrosoft}
            />
        </div>
        <div className="login-mobile">
          <LoginMobile
            email={email}
            password={password}
            handleEmailChange={setEmail}
            handlePasswordChange={setPassword}
            handleCredentials={handleCredentials}
            handleMicrosoft={handleMicrosoft}
          />
      </div>
      </div>
      
    </div>
  );
}