import axios from "axios";

const s2Instance = axios.create({
  baseURL: import.meta.env.VITE_S2_API_URL,
  timeout: 10000,
});

export default s2Instance;
