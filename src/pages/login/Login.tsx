import "./styles/Login.css";
import "./styles/globals.css";

import LoginKiri from "./components/organism/LoginKiri";
import LoginKanan from "./components/organism/LoginKanan";
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
    </div>
  );
}
