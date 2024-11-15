import axios from "axios";

const api = axios.create({
  baseURL: "https://api.giphy.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.EXPO_PUBLIC_GIPHY_API_KEY,
  };
  return config;
});

export default api;
