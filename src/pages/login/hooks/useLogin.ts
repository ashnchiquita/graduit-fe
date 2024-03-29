import axios from "@/config/login-axios-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const navigate = useNavigate();

  const handleCredentials = async () => {
    const toastId = toast.loading("Mohon menunggu...");
    try {
      await axios.post(
        `/auth/login/credentials`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      setTimeout(() => navigate("/dashboard"), 1000);
      toast.update(toastId, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Data yang Anda masukkan salah",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
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
