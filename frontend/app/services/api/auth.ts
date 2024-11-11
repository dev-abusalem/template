import RestClient from "../RestClient";
import {
  LoginResponse,
  LoginCredentials,
  UserAuth,
  GetMeCredentials,
} from "@/app/types/auth.types";

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const data = await RestClient.post("auth/loginUser", credentials);
  return data.data;
};

export const register = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const data = await RestClient.post("auth/createUser", credentials);
  return data;
};
export const getMe = async (
  credentials: GetMeCredentials
): Promise<UserAuth> => {
  const data = await RestClient.get("auth/getMe", credentials);
  return data;
};
// get dashbaord data
export const getDashboard = async (): Promise<any[]> => {
  const response = await RestClient.get("auth/getDashboard");
  return response;
};
