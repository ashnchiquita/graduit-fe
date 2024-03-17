import axios from "axios";

const loginInstance = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API_URL,
  // timeout: 10000,
});

export default loginInstance;
