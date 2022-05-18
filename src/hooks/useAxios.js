import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export default function useAxios(test) {
  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    let token;
    if (test) {
      token = test;
    } else {
      token = localStorage.getItem("auth");
    }

    console.log(token);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
