import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export default function useAxios(token) {
  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    if (!token) {
      token = localStorage.getItem("auth");
    }
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
