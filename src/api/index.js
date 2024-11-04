import axios from "axios";
// import store from "../common/loading/store.js";
// import { setLoading } from "../common/loading/loading.js";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api", //process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // store.dispatch(setLoading(true));

    return config;
  },
  (error) => {
    // store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // store.dispatch(setLoading(false));

    return Promise.resolve(response.data);
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.isRetryRequest &&
      error.config.url !== "/auth/login"
    ) {
      error.config.isRetryRequest = true;
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    }

    // store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default http;
