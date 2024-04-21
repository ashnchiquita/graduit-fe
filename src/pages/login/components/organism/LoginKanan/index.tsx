import { Button } from "@/components/ui/button";
import "../../../styles/Login.css";
import { FaMicrosoft } from "react-icons/fa6";
import { VscEye, VscEyeClosed, VscLock, VscMail } from "react-icons/vsc";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleCredentials();
  };

  return (
    <div className="kanan">
      <form
        className="flex size-full flex-col items-center justify-center gap-6 bg-white p-12"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-4xl">Sign In</h2>
          <p className="text-lg font-normal text-slate-500">
            Jika anda belum memiliki account yang terdaftar, mohon informasikan
            kepada pihak administrasi.
          </p>
        </div>
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between border-b border-gray-300 py-2">
              <div className="flex w-full items-center gap-3">
                <VscMail className="text-2xl text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Email"
                  className="flex w-full grow focus:outline-none"
                />
              </div>
            </div>
            <div className="flex w-full justify-between border-b border-gray-300 py-2">
              <div className="flex w-full items-center gap-3">
                <VscLock className="text-2xl text-gray-400" />
                {showPassword ? (
                  <>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Password"
                      className="flex w-full grow focus:outline-none"
                    />
                    <VscEyeClosed
                      className="cursor-pointer text-2xl text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Password"
                      className="flex w-full grow focus:outline-none"
                    />
                    <VscEye
                      className="cursor-pointer text-2xl text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              type="submit"
              className="h-fit rounded-lg bg-blue-500 py-2 text-lg text-white hover:bg-blue-600"
            >
              Sign in
            </Button>
            <div className="flex w-full items-center gap-3">
              {/* Horizontal line */}
              <div className="h-[1px] grow rounded bg-gray-300" />
              <p className="text-base font-normal">atau</p>
              <div className="h-[1px] grow rounded bg-gray-300" />
            </div>
            <Button
              type="button"
              onClick={handleMicrosoft}
              className="flex h-fit gap-3 rounded-lg border border-gray-300 bg-white py-2 text-lg text-slate-600 hover:bg-gray-100"
            >
              <FaMicrosoft className="text-xl" />
              Sign in SSO
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginKanan;
