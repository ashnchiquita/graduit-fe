import axios from "@/config/login-axios-config";
import { useState } from "react";
interface ReturnType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleCredentials: () => Promise<void>;
  handleMicrosoft: () => void;
}

export default function useLogin(): ReturnType {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentials = async () => {
    try {
      await axios.post(
        `/auth/login/credentials`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMicrosoft = () => {
    window.open(
      `${import.meta.env.VITE_LOGIN_API_URL}/auth/login/microsoft`,
      "_self",
    );
  };

  return {
    handleCredentials,
    handleMicrosoft,
    email,
    setEmail,
    password,
    setPassword,
  };
}
