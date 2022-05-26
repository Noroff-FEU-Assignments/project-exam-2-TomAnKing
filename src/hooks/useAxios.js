import axios from "axios";
import { BASE_URL } from "../constants/api";

const url = BASE_URL;

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
