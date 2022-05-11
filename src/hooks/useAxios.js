import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const url = "https://holidaze.tomanking.one/wp-json/";

export default function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
