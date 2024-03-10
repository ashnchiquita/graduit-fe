import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //localhost:3000",
  timeout: 10000,
});

export default instance;
