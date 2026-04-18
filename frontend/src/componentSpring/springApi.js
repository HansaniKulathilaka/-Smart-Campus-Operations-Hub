import axios from "axios";

const springApi = axios.create({
  baseURL: "http://localhost:8080",
});

// Automatically attach JWT token if available
springApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default springApi;