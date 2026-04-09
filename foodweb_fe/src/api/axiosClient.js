import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8080/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.error("Authentication error or session expired:", status);

      // Only clean up and redirect if we're not already on the login page
      if (!window.location.pathname.includes("/login")) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;