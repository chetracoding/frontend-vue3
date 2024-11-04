// Reference from: https://stackoverflow.com/questions/66891025/how-to-retreive-json-web-token-with-axios-in-vue

import axios from "axios";
import { useCookieStore } from "@/stores/cookie";
import router from "@/router/index";

const BASE_URL = process.env.VUE_APP_API_URL;
const http = axios.create({
  baseURL: BASE_URL,
});

http.interceptors.request.use((config) => {
  const { getCookie } = useCookieStore();
  const token = getCookie("user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { removeCookie } = useCookieStore();
    if (error.request.status === 401) {
      removeCookie("user_token");
      removeCookie("user_role");
      removeCookie("user");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default http;
