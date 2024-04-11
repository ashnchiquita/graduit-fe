import axios from "axios";

const s2Instance = axios.create({
  baseURL: import.meta.env.VITE_S2_API_URL,
  timeout: 10000,
  withCredentials: true,
});

s2Instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
    }

    return Promise.reject(error);
  },
);

export default s2Instance;
