import axios from "axios";

const s1Instance = axios.create({
  baseURL: import.meta.env.VITE_S1_API_URL,
  timeout: 10000,
 
});

export default s1Instance;
