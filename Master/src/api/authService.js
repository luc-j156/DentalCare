import axiosClient from "./axiosClient";

export const authService = {
  login: async (credentials) => {
    const response = await axiosClient.post("/user_login", credentials);
    return response.data;
  },

  register: async (formData) => {
    // If formData is an instance of FormData, Axios will handle Content-Type multipart/form-data
    const response = await axiosClient.post("/signup", formData, {
      headers:
        formData instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
    });
    return response.data;
  },

  logout: () => {
    localStorage.clear();
    window.location.assign("/");
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("userdetails");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("id");
  },

  getUserRole: () => {
    return localStorage.getItem("admin"); // "1" = Admin, "2" = Doctor, "0" = Patient
  },
};

export default authService;
