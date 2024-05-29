import axios from "axios";

const loginInstance = axios.create({
  baseURL: import.meta.env.VITE_LOGIN_API_URL,
  timeout: 10000,
  withCredentials: true,
});

loginInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response.status === 401 &&
        window.location.pathname !== "/login") ||
      error.response.status === 403
    ) {
      window.location.href = `/login`;
    }

    return Promise.reject(error);
  },
);

export default loginInstance;
