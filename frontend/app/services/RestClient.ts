// src/services/api/RestClient.ts
import { VERSION } from "../config/api-version";
import { BASE_URL } from "../config/url-manager";
import axiosInstance from "./axiosInstance";

class RestClient {
  async get(endpoint: string, params?: any) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/api/${VERSION}/${endpoint}`,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(endpoint: string, data: any) {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/api/${VERSION}/${endpoint}`,
        data
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(endpoint: string, id: string, data: any) {
    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/api/${VERSION}/${endpoint}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(endpoint: string, id: string) {
    try {
      const response = await axiosInstance.delete(
        `${BASE_URL}/api/${VERSION}/${endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default new RestClient();
