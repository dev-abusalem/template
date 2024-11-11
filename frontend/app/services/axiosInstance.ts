// src/services/api/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/url-manager";
import { VERSION } from "../config/api-version";
import { getToken } from "../config/token";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for attaching the access token to the request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return Promise.reject(error);
        }

        // Call refresh token API
        const { data } = await axios.post(
          `${BASE_URL}/api/${VERSION}/auth/refresh-token`,
          { refreshToken }
        );

        Cookies.set("accessToken", data.accessToken);
        // Retry original request with new token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
