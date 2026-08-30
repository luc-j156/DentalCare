import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global 401 & error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized. Clearing authentication data...");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("admin");
      localStorage.removeItem("userdetails");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
