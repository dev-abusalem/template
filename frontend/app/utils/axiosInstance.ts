import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/url-manager";
import { VERSION } from "../config/api-version";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;

    if (
      error?.response?.status === 401 ||
      (error?.response?.status === 405 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.post(
        `${BASE_URL}/api/${VERSION}/auth/refresh-token`,
        { refreshToken: refreshToken }
      );
      Cookies.set("accessToken", response.data.newAccessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
